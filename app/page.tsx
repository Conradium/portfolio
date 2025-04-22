"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  useEffect(() => {
    // Add any initialization code here
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <Navigation />

      <AnimatedBackground variant="purple" intensity="medium">
        <div className="page-container">
          <motion.div
            className="c_1-frame bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="c_1-text2"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="c_1-text3">Portfolio</p>
            </motion.div>

            <motion.div
              className="c_1-text"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="c_1-text1">Benedictus Sebastian Aria Pratama</p>
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Link
                href="/about"
                className="px-6 py-3 bg-gradient-to-r from-[#16171f] to-black rounded-full text-white border border-[#dba6ff] hover:scale-105 transition-transform" // Added border with new color
              >
                Explore
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedBackground>
    </main>
  )
}
