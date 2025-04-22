"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { Github, Mail, MessageCircle, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import AudioToggle from "@/components/audio-toggle"
import { useAudio } from "@/components/audio-provider"

// Contact information - replace with your actual details
const contactInfo = {
  discordServer: "https://discord.gg/example",
  discordProfile: "benedictus#0000",
  email: "contact@benedictus.com",
  github: "https://github.com/benedictus",
}

export default function Contact() {
  const router = useRouter()
  const { playSound } = useAudio()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cursorSize = useSpring(40, { stiffness: 100, damping: 15 })
  const cursorOpacity = useSpring(0, { stiffness: 100, damping: 15 })
  const [activeElement, setActiveElement] = useState<string | null>(null)
  const [cursorText, setCursorText] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  // Initialize canvas for fluid animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas && window) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Fluid simulation variables
    let lastX = 0
    let lastY = 0
    const particles: Particle[] = []
    const particleCount = 100
    const maxDistance = 100
    const lineWidth = 1
    const particleSize = 2
    const baseSpeed = 0.3 // Base speed for constant movement
    const fadeSpeed = 0.1 // Faster fade for trails (higher = faster fade)

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() * 2 - 1) * baseSpeed,
        vy: (Math.random() * 2 - 1) * baseSpeed,
        size: Math.random() * particleSize + 1,
        color: getRandomColor(),
        originalColor: getRandomColor(),
        // Add random movement patterns
        movementPattern: Math.floor(Math.random() * 3), // 0: linear, 1: circular, 2: sine wave
        angle: Math.random() * Math.PI * 2,
        radius: Math.random() * 50 + 20,
        frequency: Math.random() * 0.02 + 0.005,
        amplitude: Math.random() * 5 + 2,
        phase: Math.random() * Math.PI * 2,
      })
    }

    function getRandomColor() {
      const colors = [
        "rgba(219, 166, 255, 0.7)", // Purple
        "rgba(255, 105, 180, 0.7)", // Pink
        "rgba(64, 224, 208, 0.7)", // Turquoise
        "rgba(255, 215, 0, 0.7)", // Gold
        "rgba(50, 205, 50, 0.7)", // Lime
      ]
      return colors[Math.floor(Math.random() * colors.length)]
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return

      // Clear canvas with a more opaque background to make trails fade faster
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeSpeed})` // Increased opacity for faster fade
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Get mouse position
      const mouseXValue = mouseX.get()
      const mouseYValue = mouseY.get()

      // Calculate mouse velocity
      const dx = mouseXValue - lastX
      const dy = mouseYValue - lastY
      const mouseSpeed = Math.sqrt(dx * dx + dy * dy)
      lastX = mouseXValue
      lastY = mouseYValue

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Apply mouse influence
        const distX = mouseXValue - p.x
        const distY = mouseYValue - p.y
        const distance = Math.sqrt(distX * distX + distY * distY)

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          p.vx += (distX / distance) * force * 0.2
          p.vy += (distY / distance) * force * 0.2

          // Change color based on mouse speed
          if (mouseSpeed > 5) {
            p.color = `rgba(255, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`
          }
        } else {
          // Gradually return to original color
          p.color = p.originalColor

          // Apply movement patterns when not influenced by mouse
          switch (p.movementPattern) {
            case 0: // Linear movement - already handled by vx, vy
              break
            case 1: // Circular movement
              p.angle += 0.01
              p.vx = Math.cos(p.angle) * baseSpeed
              p.vy = Math.sin(p.angle) * baseSpeed
              break
            case 2: // Sine wave movement
              p.phase += p.frequency
              // Add sine wave influence to velocity
              p.vx += Math.cos(p.phase) * 0.01
              p.vy += Math.sin(p.phase) * 0.01
              break
          }
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Apply friction
        p.vx *= 0.98
        p.vy *= 0.98

        // Ensure minimum velocity for constant movement
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (currentSpeed < baseSpeed && distance >= maxDistance) {
          const factor = baseSpeed / Math.max(0.1, currentSpeed)
          p.vx *= factor
          p.vy *= factor
        }

        // Boundary check
        if (p.x < 0) {
          p.x = canvas.width
        } else if (p.x > canvas.width) {
          p.x = 0
        }
        if (p.y < 0) {
          p.y = canvas.height
        } else if (p.y > canvas.height) {
          p.y = 0
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Connect nearby particles with lines that have shorter lifespans
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 50) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            // Make lines more transparent for faster visual decay
            ctx.strokeStyle = `rgba(255, 255, 255, ${((50 - dist) / 50) * 0.1})` // Reduced opacity
            ctx.lineWidth = lineWidth
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [mouseX, mouseY])

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Contact methods with artistic representations
  const contactMethods = [
    {
      id: "discord-server",
      title: "Discord Server",
      value: contactInfo.discordServer,
      link: contactInfo.discordServer,
      icon: <MessageCircle size={32} />,
      color: "#7289DA",
      hoverText: "Join Server",
      shape: "hexagon",
      action: "link", // Open link in new tab
    },
    {
      id: "discord-profile",
      title: "Discord Profile",
      value: contactInfo.discordProfile,
      icon: <MessageCircle size={32} />,
      color: "#5865F2",
      hoverText: "Copy ID",
      shape: "circle",
      action: "copy", // Copy to clipboard
    },
    {
      id: "email",
      title: "Email",
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      icon: <Mail size={32} />,
      color: "#D44638",
      hoverText: "Send Email",
      shape: "triangle",
      action: "email", // Open mailto link
    },
    {
      id: "github",
      title: "GitHub",
      value: contactInfo.github,
      link: contactInfo.github,
      icon: <Github size={32} />,
      color: "#333",
      hoverText: "View Profile",
      shape: "square",
      action: "link", // Open link in new tab
    },
  ]

  // Handle hover states
  const handleMouseEnter = (id: string, text: string) => {
    setActiveElement(id)
    setCursorText(text)
    cursorSize.set(80)
    cursorOpacity.set(1)
    playSound("hover")
  }

  const handleMouseLeave = () => {
    setActiveElement(null)
    setCursorText("")
    cursorSize.set(40)
    cursorOpacity.set(0)
  }

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    playSound("click")
  }

  return (
    <main className="h-screen w-screen bg-black text-white overflow-hidden relative">
      <Navigation />
      <AudioToggle />

      {/* Interactive background canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Custom cursor */}
      <motion.div
        className="fixed pointer-events-none z-50 flex items-center justify-center rounded-full text-xs font-bold"
        style={{
          x: mouseX,
          y: mouseY,
          width: cursorSize,
          height: cursorSize,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          opacity: cursorOpacity,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {cursorText}
      </motion.div>

      {/* Main content */}
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 h-full w-full flex flex-col items-center justify-center"
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
            >
              Connect With Me
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full px-4">
              {contactMethods.map((method, index) => (
                <ContactElement
                  key={method.id}
                  method={method}
                  index={index}
                  isActive={activeElement === method.id}
                  onMouseEnter={() => handleMouseEnter(method.id, method.hoverText)}
                  onMouseLeave={handleMouseLeave}
                  onCopy={copyToClipboard}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="relative w-24 h-24"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-full h-full"
                  initial={{ rotate: i * 90 }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full absolute"
                    style={{
                      top: 0,
                      left: "calc(50% - 8px)",
                      backgroundColor: ["#FF3366", "#33CCFF", "#FFCC33", "#33FF99"][i],
                    }}
                  ></div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

// Contact Element Component
interface ContactElementProps {
  method: {
    id: string
    title: string
    value: string
    link?: string
    icon: React.ReactNode
    color: string
    shape: string
    hoverText: string
    action: "link" | "copy" | "email" // Added action type
  }
  index: number
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onCopy: (text: string) => void
}

function ContactElement({ method, index, isActive, onMouseEnter, onMouseLeave, onCopy }: ContactElementProps) {
  const { playSound } = useAudio()
  const elementRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; color: string; vx: number; vy: number }[]
  >([])
  const [showCopiedMessage, setShowCopiedMessage] = useState(false)

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current) return

    const rect = elementRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setPosition({ x, y })
  }

  // Generate particles on hover
  useEffect(() => {
    if (isActive && !isHovered) {
      setIsHovered(true)

      // Create particles
      const newParticles = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          color: method.color,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
        })
      }
      setParticles(newParticles)

      // Play sound
      playSound("activate")
    } else if (!isActive && isHovered) {
      setIsHovered(false)
      setParticles([])
    }
  }, [isActive, isHovered, method.color, playSound])

  // Get shape class based on method shape
  const getShapeClass = () => {
    switch (method.shape) {
      case "circle":
        return "rounded-full"
      case "square":
        return "rounded-lg"
      case "triangle":
        return "clip-triangle"
      case "hexagon":
        return "clip-hexagon"
      default:
        return "rounded-lg"
    }
  }

  // Handle card click based on action type
  const handleCardClick = () => {
    playSound("click")

    switch (method.action) {
      case "link":
        if (method.link) {
          window.open(method.link, "_blank")
        }
        break
      case "email":
        if (method.link) {
          window.location.href = method.link
        }
        break
      case "copy":
        navigator.clipboard.writeText(method.value)
        setShowCopiedMessage(true)
        setTimeout(() => setShowCopiedMessage(false), 2000)
        break
    }
  }

  return (
    <motion.div
      ref={elementRef}
      className={`relative overflow-hidden ${getShapeClass()} backdrop-blur-md cursor-pointer`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        background: `linear-gradient(135deg, ${method.color}22, ${method.color}44)`,
        border: `1px solid ${method.color}66`,
        boxShadow: isActive ? `0 0 30px ${method.color}66` : "none",
        transform: isActive
          ? `perspective(1000px) rotateX(${position.y / 10}deg) rotateY(${-position.x / 10}deg) scale(1.05)`
          : "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
        transition: "transform 0.2s ease-out, box-shadow 0.3s ease-out",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={handleMouseMove}
      onClick={handleCardClick}
    >
      {/* Particles */}
      {isActive &&
        particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            initial={{
              x: `50%`,
              y: `50%`,
              opacity: 1,
            }}
            animate={{
              x: `calc(${particle.x}% + ${particle.vx * 20}px)`,
              y: `calc(${particle.y}% + ${particle.vy * 20}px)`,
              opacity: 0,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
          />
        ))}

      {/* Background animation */}
      <motion.div
        className="absolute inset-0 opacity-50"
        animate={{
          background: isActive
            ? [
                `radial-gradient(circle at ${position.x + 50}% ${position.y + 50}%, ${method.color}55, ${method.color}00)`,
                `radial-gradient(circle at ${position.x + 60}% ${position.y + 40}%, ${method.color}55, ${method.color}00)`,
                `radial-gradient(circle at ${position.x + 40}% ${position.y + 60}%, ${method.color}55, ${method.color}00)`,
              ]
            : `radial-gradient(circle at 50% 50%, ${method.color}33, ${method.color}00)`,
        }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      <div className="relative p-6 z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="mb-4 p-3 rounded-full"
            style={{ color: method.color, background: `${method.color}22` }}
            animate={
              isActive
                ? {
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1],
                  }
                : { y: 0, scale: 1 }
            }
            transition={{ duration: 1, repeat: isActive ? Number.POSITIVE_INFINITY : 0, repeatType: "reverse" }}
          >
            {method.icon}
          </motion.div>

          <h3 className="text-xl font-bold mb-2">{method.title}</h3>

          <div className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-1">
            {method.value}
            {method.action === "link" && <ExternalLink size={12} />}
          </div>

          {/* Copied message */}
          <AnimatePresence>
            {showCopiedMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-2 left-0 right-0 text-xs text-white bg-green-500 rounded-full py-1 px-2 mx-auto w-max"
              >
                Copied!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

// Types
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  originalColor?: string
  movementPattern?: number
  angle?: number
  radius?: number
  frequency?: number
  amplitude?: number
  phase?: number
}
