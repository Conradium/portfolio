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

    // Create background music element right away
    backgroundMusicRef.current = new Audio("/sounds/background-music.mp3")
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.loop = true
      backgroundMusicRef.current.volume = 0.2
      // Don't try to play yet - will be handled on user interaction
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

    const handleUserInteraction = () => {
      if (!isInitialized && backgroundMusicRef.current) {
        // Try to play music on any user interaction
        backgroundMusicRef.current
          .play()
          .then(() => {
            setIsInitialized(true)
            console.log("Audio initialized and playing")
          })
          .catch((err) => {
            console.log("Audio autoplay was prevented:", err)
            // Still mark as initialized so we don't keep trying
            setIsInitialized(true)
          })
      }
    }

    // Listen for ANY user interaction
    document.addEventListener("click", handleUserInteraction, { once: false })
    document.addEventListener("touchstart", handleUserInteraction, { once: false })
    document.addEventListener("keydown", handleUserInteraction, { once: false })
    document.addEventListener("mousemove", handleUserInteraction, { once: false })
    document.addEventListener("scroll", handleUserInteraction, { once: false })

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      document.removeEventListener("keydown", handleUserInteraction)
      document.removeEventListener("mousemove", handleUserInteraction)
      document.removeEventListener("scroll", handleUserInteraction)
    }
  }, [isInitialized])

  // Toggle mute function
  const toggleMute = () => {
    if (!isInitialized && backgroundMusicRef.current) {
      // If not initialized yet, try to play on mute toggle
      backgroundMusicRef.current
        .play()
        .then(() => {
          setIsInitialized(true)
          console.log("Audio initialized and playing")
        })
        .catch((err) => {
          console.log("Audio autoplay was prevented:", err)
          setIsInitialized(true)
        })
    }

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
