"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  color: string
  rotation: number
  type: "circle" | "square" | "triangle"
}

export default function MenuAnimation() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const controls = useAnimation()

  // Generate random shapes
  useEffect(() => {
    const shapeCount = 15
    const newShapes: Shape[] = []
    const colors = ["#dba6ff", "#b78aff", "#9966cc", "#7042d2", "#513097"]
    const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

    for (let i = 0; i < shapeCount; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        type: types[Math.floor(Math.random() * types.length)],
      })
    }

    setShapes(newShapes)
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      mousePosition.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      }
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    const animateShapes = () => {
      controls.start((i) => {
        const shape = shapes[i]
        if (!shape) return {}

        const distance = Math.sqrt(
          Math.pow(((mousePosition.current.x - shape.x) / 100) * 50, 2) +
            Math.pow(((mousePosition.current.y - shape.y) / 100) * 50, 2),
        )

        const scale = Math.max(0.5, Math.min(1.5, 1 + (10 - distance) / 20))

        return {
          x: (mousePosition.current.x - shape.x) / 10,
          y: (mousePosition.current.y - shape.y) / 10,
          rotate: shape.rotation + (mousePosition.current.x / 100) * 20,
          scale: scale,
          transition: { type: "spring", stiffness: 50, damping: 20 },
        }
      })

      requestAnimationFrame(animateShapes)
    }

    animateShapes()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [controls, shapes])

  return (
    <div
      ref={containerRef}
      className="absolute right-0 top-0 bottom-0 w-1/2 z-1 overflow-hidden pointer-events-none"
      style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "50%", zIndex: 1 }}
    >
      {shapes.map((shape, index) => {
        switch (shape.type) {
          case "circle":
            return (
              <motion.div
                key={shape.id}
                custom={index}
                animate={controls}
                className="absolute rounded-full"
                style={{
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: shape.size,
                  height: shape.size,
                  backgroundColor: shape.color,
                  opacity: 0.3,
                  position: "absolute",
                }}
              />
            )
          case "square":
            return (
              <motion.div
                key={shape.id}
                custom={index}
                animate={controls}
                className="absolute"
                style={{
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: shape.size,
                  height: shape.size,
                  backgroundColor: shape.color,
                  opacity: 0.3,
                  position: "absolute",
                }}
              />
            )
          case "triangle":
            return (
              <motion.div
                key={shape.id}
                custom={index}
                animate={controls}
                className="absolute"
                style={{
                  left: `${shape.x}%`,
                  top: `${shape.y}%`,
                  width: 0,
                  height: 0,
                  borderLeft: `${shape.size / 2}px solid transparent`,
                  borderRight: `${shape.size / 2}px solid transparent`,
                  borderBottom: `${shape.size}px solid ${shape.color}`,
                  opacity: 0.3,
                  position: "absolute",
                }}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
