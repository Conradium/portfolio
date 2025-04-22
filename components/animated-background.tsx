"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AnimatedBackgroundProps {
  variant?: "purple" | "dark" | "space"
  intensity?: "low" | "medium" | "high"
  children?: React.ReactNode
}

export default function AnimatedBackground({
  variant = "purple",
  intensity = "medium",
  children,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Color schemes based on variant
  const colors = {
    purple: {
      primary: ["255, 217, 209", "112, 66, 210", "0, 0, 0"], // [light, mid, dark]
      orbs: ["219, 166, 255", "255, 217, 209", "112, 66, 210"], // [accent, light, mid] - changed from yellow to lavender
    },
    dark: {
      primary: ["30, 30, 35", "20, 20, 25", "0, 0, 0"], // [light, mid, dark]
      orbs: ["219, 166, 255", "112, 66, 210", "30, 30, 35"], // [accent, mid, light] - changed from yellow to lavender
    },
    space: {
      primary: ["10, 10, 30", "5, 5, 20", "0, 0, 10"], // [light, mid, dark]
      orbs: ["138, 43, 226", "75, 0, 130", "25, 25, 112"], // [purple, indigo, dark blue]
    },
  }

  // Intensity settings
  const intensitySettings = {
    low: { orbCount: 3, speed: 0.2, size: 0.7, opacity: 0.3 },
    medium: { orbCount: 5, speed: 0.3, size: 1, opacity: 0.5 },
    high: { orbCount: 8, speed: 0.4, size: 1.3, opacity: 0.7 },
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create orbs
    const settings = intensitySettings[intensity]
    const selectedColors = colors[variant]

    class Orb {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      opacityStep: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = (Math.random() * 300 + 200) * settings.size

        // Select a random color from the orbs array
        const colorIndex = Math.floor(Math.random() * selectedColors.orbs.length)
        this.color = selectedColors.orbs[colorIndex]

        // Random speed between -0.2 and 0.2, adjusted by intensity
        this.speedX = (Math.random() * 0.4 - 0.2) * settings.speed
        this.speedY = (Math.random() * 0.4 - 0.2) * settings.speed

        // Random opacity between 0.1 and max opacity
        this.opacity = (Math.random() * 0.3 + 0.1) * settings.opacity

        // Random opacity change direction and speed
        this.opacityStep = (Math.random() * 0.01 - 0.005) * settings.speed
      }

      update() {
        // Move the orb
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x < -this.size / 2) this.x = canvas.width + this.size / 2
        if (this.x > canvas.width + this.size / 2) this.x = -this.size / 2
        if (this.y < -this.size / 2) this.y = canvas.height + this.size / 2
        if (this.y > canvas.height + this.size / 2) this.y = -this.size / 2

        // Change opacity
        this.opacity += this.opacityStep
        if (this.opacity > settings.opacity || this.opacity < 0.05) {
          this.opacityStep = -this.opacityStep
        }
      }

      draw() {
        if (!ctx) return

        // Create radial gradient
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size)

        gradient.addColorStop(0, `rgba(${this.color}, ${this.opacity})`)
        gradient.addColorStop(1, `rgba(${this.color}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create stars for space variant
    class Star {
      x: number
      y: number
      size: number
      opacity: number
      opacityStep: number
      twinkleSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.opacity = Math.random() * 0.5 + 0.3
        this.opacityStep = (Math.random() * 0.01 - 0.005) * 2
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
      }

      update() {
        // Twinkle effect
        this.opacity += this.opacityStep
        if (this.opacity > 0.9 || this.opacity < 0.3) {
          this.opacityStep = -this.opacityStep
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create orbs
    const orbs: Orb[] = []
    for (let i = 0; i < settings.orbCount; i++) {
      orbs.push(new Orb())
    }

    // Create stars for space variant
    const stars: Star[] = []
    if (variant === "space") {
      for (let i = 0; i < 200; i++) {
        stars.push(new Star())
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return

      // Clear canvas with a semi-transparent background to create trail effect
      ctx.fillStyle = `rgba(${selectedColors.primary[2]}, 0.05)`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars for space variant
      if (variant === "space") {
        stars.forEach((star) => {
          star.update()
          star.draw()
        })
      }

      // Update and draw orbs
      orbs.forEach((orb) => {
        orb.update()
        orb.draw()
      })

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [variant, intensity])

  return (
    <div className="relative w-screen min-h-screen overflow-hidden">
      {/* Base gradient background - changed to fixed positioning and full height */}
      <div
        className={`fixed inset-0 z-0 w-screen ${
          variant === "purple"
            ? "bg-gradient-to-br from-[#ffd9d1] via-[#7042d2] to-black"
            : variant === "space"
              ? "bg-gradient-to-b from-[#0a0a20] via-[#1a0b35] to-[#000510]"
              : "bg-gradient-to-br from-[#1e1e23] via-[#14141a] to-black"
        }`}
      />

      {/* Canvas for animated orbs - changed to fixed positioning */}
      <canvas ref={canvasRef} className="fixed inset-0 z-10 w-screen h-full" style={{ mixBlendMode: "screen" }} />

      {/* Overlay with subtle noise texture - changed to fixed positioning */}
      <div
        className="fixed inset-0 z-20 w-screen h-full opacity-10"
        style={{
          backgroundImage: "url('/noise-texture.png')",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* Content container - ensure it has a minimum height of screen */}
      <div className="relative z-30 w-screen min-h-screen overflow-hidden">{children}</div>
    </div>
  )
}
