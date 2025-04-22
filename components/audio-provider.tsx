"use client"

import { createContext, useContext, useEffect, useState, useRef, type ReactNode } from "react"

type AudioContextType = {
  isMuted: boolean
  toggleMute: () => void
  playSound: (soundName: "hover" | "click" | "activate" | "navigate") => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

// Create a global variable to track if audio has been initialized
// This ensures the state persists across page navigations
let globalAudioInitialized = false
let globalBackgroundMusic: HTMLAudioElement | null = null
let globalIsMuted = false

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(globalIsMuted)
  const [isInitialized, setIsInitialized] = useState(globalAudioInitialized)
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(globalBackgroundMusic)
  const soundsRef = useRef<Record<string, HTMLAudioElement>>({})

  // Initialize audio on first user interaction
  useEffect(() => {
    if (isInitialized && backgroundMusicRef.current) return

    // Create background music element if it doesn't exist
    if (!backgroundMusicRef.current) {
      backgroundMusicRef.current = new Audio("/sounds/background-music.mp3")
      globalBackgroundMusic = backgroundMusicRef.current

      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.loop = true
        backgroundMusicRef.current.volume = 0.1 // Lower volume to 0.1 (was 0.2)
      }
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

    // If already initialized globally, just update local state
    if (globalAudioInitialized) {
      setIsInitialized(true)
      return
    }

    const handleUserInteraction = () => {
      if (!globalAudioInitialized && backgroundMusicRef.current) {
        // Try to play music on any user interaction
        backgroundMusicRef.current
          .play()
          .then(() => {
            setIsInitialized(true)
            globalAudioInitialized = true
            console.log("Audio initialized and playing")
          })
          .catch((err) => {
            console.log("Audio autoplay was prevented:", err)
            // Still mark as initialized so we don't keep trying
            setIsInitialized(true)
            globalAudioInitialized = true
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
          globalAudioInitialized = true
          console.log("Audio initialized and playing")
        })
        .catch((err) => {
          console.log("Audio autoplay was prevented:", err)
          setIsInitialized(true)
          globalAudioInitialized = true
        })
    }

    const newMutedState = !isMuted
    setIsMuted(newMutedState)
    globalIsMuted = newMutedState

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
      backgroundMusicRef.current.volume = isMuted ? 0 : 0.1 // Lower volume to 0.1 (was 0.2)
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
