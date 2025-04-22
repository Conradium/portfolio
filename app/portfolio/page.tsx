"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"
import AudioToggle from "@/components/audio-toggle"
import { useAudio } from "@/components/audio-provider"

const portfolioItems = [
  {
    id: "cognxto",
    title: "Cognxto",
    description: "AI-powered learning platform for students",
    image: "/images/portfolio-1.jpg",
    category: "Web Development",
  },
  {
    id: "musextreme",
    title: "MuseXTreme",
    description: "Interactive music experience application",
    image: "/images/portfolio-2.jpg",
    category: "Mobile App",
  },
  {
    id: "test",
    title: "Test Project",
    description: "Experimental design concept",
    image: "/images/portfolio-3.jpg",
    category: "UI/UX Design",
  },
]

export default function Portfolio() {
  const { playSound } = useAudio()

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <AudioToggle />

      <AnimatedBackground variant="dark" intensity="low">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-12 text-[#dba6ff]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Work
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="portfolio-item rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/portfolio/${item.id}`}
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => playSound("navigate")}
                >
                  <div className="relative group">
                    <div className="aspect-video bg-gradient-to-br from-purple-800 to-gray-900 relative overflow-hidden">
                      <Image
                        src={`/abstract-geometric-shapes.png?height=400&width=600&query=${item.title} project thumbnail`}
                        alt={item.title}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                    <div className="p-6 bg-gradient-to-r from-[#16171f] to-black">
                      <span className="text-sm text-[#dba6ff]">{item.category}</span>
                      <h3 className="text-2xl font-bold mt-2 mb-3">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                      <span className="px-4 py-2 border border-white text-white">View Project</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedBackground>
    </main>
  )
}
