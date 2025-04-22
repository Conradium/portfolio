"use client"

import { motion } from "framer-motion"
import { Code, Palette, BarChart, Lightbulb, Smartphone } from "lucide-react"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"

const services = [
  {
    icon: <Palette size={40} />,
    title: "Print Design",
    description:
      "Professional print design services including brochures, business cards, posters, and marketing materials.",
    features: ["Brand consistency", "High-resolution outputs", "Print-ready files", "Multiple format options"],
  },
  {
    icon: <Code size={40} />,
    title: "Web Design",
    description:
      "Custom website design and development with a focus on user experience, performance, and modern aesthetics.",
    features: ["Responsive layouts", "SEO optimization", "Fast loading times", "Content management systems"],
  },
  {
    icon: <Smartphone size={40} />,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile application development for iOS and Android devices.",
    features: ["Intuitive interfaces", "Performance optimization", "Cross-platform compatibility", "Ongoing support"],
  },
  {
    icon: <BarChart size={40} />,
    title: "Digital Marketing",
    description: "Strategic digital marketing services to increase your online presence and drive conversions.",
    features: ["Social media management", "Email campaigns", "Content strategy", "Analytics and reporting"],
  },
  {
    icon: <Lightbulb size={40} />,
    title: "Innovation Consulting",
    description:
      "Strategic innovation consulting to help businesses identify opportunities and implement new technologies.",
    features: ["Technology assessment", "Digital transformation", "Process optimization", "Innovation workshops"],
  },
]

export default function Services() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />

      <AnimatedBackground variant="dark" intensity="low">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#dba6ff]">Services</h1>{" "}
            {/* Changed from #fcc188 to #dba6ff */}
            <p className="text-xl max-w-3xl mx-auto text-gray-300">
              Comprehensive digital solutions tailored to your specific needs. From concept to execution, I deliver
              high-quality results that drive success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="service-card p-8 rounded-lg bg-gradient-to-br from-[#16171f] to-black border border-gray-800 hover:border-[#dba6ff] transition-colors"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className="text-[#dba6ff] mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-[#dba6ff] rounded-full mr-3"></span>{" "}
                      {/* Changed from #fcc188 to #dba6ff */}
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-20 p-10 rounded-lg bg-gradient-to-r from-purple-900 to-gray-900 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to start a project?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help bring your ideas to life with tailored solutions that meet your specific
              needs.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-[#dba6ff] text-black font-bold rounded-full hover:scale-105 transition-transform"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </AnimatedBackground>
    </main>
  )
}
