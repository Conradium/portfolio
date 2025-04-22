"use client"

import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from "react"

type AudioContextType = {
  isMuted: boolean
  toggleMute: () => void
  playSound: (soundName: "hover" | "click" | "activate" | "navigate") => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null)
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({})

  // Initialize audio on first user interaction
  useEffect(() => {
    if (isInitialized) return

    const initializeAudio = () => {
      if (isInitialized) return

      // Create background music
      backgroundMusicRef.current = new Audio("/sounds/background-music.mp3")
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.loop = true
        backgroundMusicRef.current.volume = 0.2
        backgroundMusicRef.current.play().catch((err) => console.log("Audio autoplay was prevented:", err))
      }

      // Create sound effects
      soundsRef.current = {
        hover: new Audio("/sounds/hover.mp3"),
        click: new Audio("/sounds/click.mp3"),
        activate: new Audio("/sounds/activate.mp3"),
        navigate: new Audio("/sounds/navigate.mp3"),
      }

      // Set volumes
      Object.values(soundsRef.current).forEach((sound) => {
        sound.volume = 0.15
      })

      setIsInitialized(true)
    }

    // Try to initialize immediately (may not work due to autoplay policies)
    initializeAudio()

    // Also initialize on first user interaction
    const handleUserInteraction = () => {
      initializeAudio()

      // Remove event listeners after initialization
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)
    document.addEventListener("keydown", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
    }
  }, [isInitialized])

  // Toggle mute function
  const toggleMute = () => {
    setIsMuted((prev) => !prev)

    if (backgroundMusicRef.current) {
      if (!isMuted) {
        backgroundMusicRef.current.pause()
      } else {
        backgroundMusicRef.current.play().catch((err) => console.log("Audio play was prevented:", err))
      }
    }
  }

  // Update background music volume when mute state changes
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = isMuted ? 0 : 0.2
    }
  }, [isMuted])

  // Play sound function
  const playSound = (soundName: "hover" | "click" | "activate" | "navigate") => {
    if (isMuted || !isInitialized) return

    const sound = soundsRef.current[soundName]
    if (sound) {
      // Clone the audio to allow overlapping sounds
      const soundClone = sound.cloneNode() as HTMLAudioElement
      soundClone.volume = sound.volume
      soundClone.play().catch((err) => console.log("Sound play was prevented:", err))
    }
  }

  return <AudioContext.Provider value={{ isMuted, toggleMute, playSound }}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
