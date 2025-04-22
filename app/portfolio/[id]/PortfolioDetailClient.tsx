"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"
import AudioToggle from "@/components/audio-toggle"
import { useAudio } from "@/components/audio-provider"

const portfolioDetails = {
  cognxto: {
    title: "Cognxto",
    subtitle: "AI-powered learning platform",
    description:
      "Cognxto is an innovative learning platform that uses artificial intelligence to personalize educational content for students. The platform adapts to each student's learning style and pace, providing customized resources and feedback.",
    challenge:
      "The main challenge was creating an algorithm that could effectively analyze student performance and adapt content accordingly, while maintaining an intuitive and engaging user interface.",
    solution:
      "We implemented a machine learning model that tracks user interactions and performance metrics to continuously refine the learning experience. The UI was designed with simplicity in mind, using subtle animations to guide users through the platform.",
    technologies: ["React", "Node.js", "TensorFlow", "MongoDB", "AWS"],
    image: "/images/portfolio-1.jpg",
    gallery: ["/images/cognxto-1.jpg", "/images/cognxto-2.jpg", "/images/cognxto-3.jpg"],
  },
  musextreme: {
    title: "MuseXTreme",
    subtitle: "Interactive music experience",
    description:
      "MuseXTreme is a mobile application that transforms how users interact with music. It combines visualization, touch interaction, and social features to create an immersive music experience.",
    challenge:
      "Creating a responsive audio visualization system that works across different devices while maintaining performance was the primary challenge.",
    solution:
      "We developed a custom WebGL-based visualization engine that adapts to device capabilities, with fallbacks for less powerful devices. The UI was designed to be intuitive and responsive across all screen sizes.",
    technologies: ["React Native", "WebGL", "Web Audio API", "Firebase", "Redux"],
    image: "/images/portfolio-2.jpg",
    gallery: ["/images/musextreme-1.jpg", "/images/musextreme-2.jpg", "/images/musextreme-3.jpg"],
  },
  test: {
    title: "Test Project",
    subtitle: "Experimental design concept",
    description:
      "This experimental project explores new interaction paradigms for digital interfaces. It serves as a testing ground for innovative UI/UX concepts before implementing them in commercial projects.",
    challenge:
      "Balancing innovation with usability was the key challenge, as we wanted to push boundaries without sacrificing user experience.",
    solution:
      "We employed an iterative design process with frequent user testing to refine concepts. The final design incorporates motion design principles to create intuitive transitions between states.",
    technologies: ["Figma", "Framer", "HTML/CSS", "JavaScript", "GSAP"],
    image: "/images/portfolio-3.jpg",
    gallery: ["/images/test-1.jpg", "/images/test-2.jpg", "/images/test-3.jpg"],
  },
}

export default function PortfolioDetailClient({ params }: { params: { id: string } }) {
  const { id } = params
  const { playSound } = useAudio()
  const project = portfolioDetails[id as keyof typeof portfolioDetails]

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      <AudioToggle />

      <AnimatedBackground variant="dark" intensity="low">
        <div className="container mx-auto px-4 py-16">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-white hover:text-[#dba6ff] transition-colors mb-8"
            onMouseEnter={() => playSound("hover")}
            onClick={() => playSound("navigate")}
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Portfolio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="text-[#dba6ff]">{project.subtitle}</span>
              <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">{project.title}</h1>

              <div className="prose prose-invert max-w-none">
                <p className="text-xl">{project.description}</p>

                <h3 className="text-2xl font-bold mt-8 mb-4">The Challenge</h3>
                <p>{project.challenge}</p>

                <h3 className="text-2xl font-bold mt-8 mb-4">The Solution</h3>
                <p>{project.solution}</p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-[#16171f] to-black rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#16171f] to-black rounded-full hover:scale-105 transition-transform"
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => playSound("click")}
                >
                  <ExternalLink size={18} className="mr-2" />
                  Live Demo
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#16171f] to-black rounded-full hover:scale-105 transition-transform"
                  onMouseEnter={() => playSound("hover")}
                  onClick={() => playSound("click")}
                >
                  <Github size={18} className="mr-2" />
                  Source Code
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-video bg-gradient-to-br from-purple-800 to-gray-900 rounded-lg overflow-hidden"
            >
              <Image
                src={`/abstract-geometric-shapes.png?height=600&width=800&query=${project.title} project showcase`}
                alt={project.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-video bg-gradient-to-br from-purple-800 to-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
                  whileHover={{ scale: 1.05 }}
                  onMouseEnter={() => playSound("hover")}
                >
                  <Image
                    src={`/abstract-geometric-shapes.png?height=400&width=600&query=${project.title} project gallery image ${index + 1}`}
                    alt={`${project.title} gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedBackground>
    </main>
  )
}
