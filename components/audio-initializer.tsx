"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Volume2 } from "lucide-react"
import { useAudio } from "./audio-provider"

export default function AudioInitializer() {
  const [showPrompt, setShowPrompt] = useState(true)
  const { isMuted, toggleMute } = useAudio()

  // Hide the prompt after 5 seconds or if audio is playing
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  // Also hide if user clicks anywhere
  useEffect(() => {
    const handleInteraction = () => {
      setShowPrompt(false)
    }

    window.addEventListener("click", handleInteraction)
    window.addEventListener("touchstart", handleInteraction)

    return () => {
      window.removeEventListener("click", handleInteraction)
      window.removeEventListener("touchstart", handleInteraction)
    }
  }, [])

  const handleClick = () => {
    toggleMute()
    setShowPrompt(false)
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-[#dba6ff]/30 shadow-lg shadow-[#dba6ff]/20 text-center"
          style={{ maxWidth: "90vw", width: "400px" }}
        >
          <motion.div
            className="mx-auto mb-4 p-4 rounded-full bg-[#dba6ff]/20 w-16 h-16 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <Volume2 size={32} className="text-[#dba6ff]" />
          </motion.div>
          <h3 className="text-xl font-bold mb-2 text-white">Enable Audio Experience</h3>
          <p className="text-gray-300 mb-4">
            Click anywhere or interact with the page to enable the immersive audio experience.
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-2 bg-gradient-to-r from-[#dba6ff] to-[#9966cc] text-black font-bold rounded-full hover:scale-105 transition-transform"
          >
            Enable Audio
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
