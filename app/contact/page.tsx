"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <main className="h-screen bg-black text-white overflow-hidden">
      <Navigation />

      <AnimatedBackground variant="dark" intensity="low">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="w-full max-w-6xl mx-auto py-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 text-[#dba6ff]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Get in Touch
            </motion.h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col justify-between h-full"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-3">Let's Talk</h2>
                  <p className="text-base text-gray-300 mb-6">
                    Have a project in mind or just want to say hello? Fill out the form and I'll get back to you as soon
                    as possible.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-[#16171f] to-black p-2 rounded-full mr-2">
                      <Mail size={18} className="text-[#dba6ff]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Email</h3>
                      <p className="text-xs text-gray-300">contact@benedictus.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-[#16171f] to-black p-2 rounded-full mr-2">
                      <Phone size={18} className="text-[#dba6ff]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Phone</h3>
                      <p className="text-xs text-gray-300">+81 123 456 7890</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-[#16171f] to-black p-2 rounded-full mr-2">
                      <MapPin size={18} className="text-[#dba6ff]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold">Location</h3>
                      <p className="text-xs text-gray-300">Tokyo, Japan</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 text-sm bg-[#16171f] border border-gray-700 rounded-lg focus:outline-none focus:border-[#dba6ff] transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 text-sm bg-[#16171f] border border-gray-700 rounded-lg focus:outline-none focus:border-[#dba6ff] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full p-2 text-sm bg-[#16171f] border border-gray-700 rounded-lg focus:outline-none focus:border-[#dba6ff] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full p-2 text-sm bg-[#16171f] border border-gray-700 rounded-lg focus:outline-none focus:border-[#dba6ff] transition-colors"
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-2 px-4 bg-gradient-to-r from-[#dba6ff] to-[#b78aff] text-black font-bold rounded-lg hover:scale-105 transition-transform flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>

                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ml-4 p-2 bg-green-900 bg-opacity-30 border border-green-500 rounded-lg text-green-400 text-sm"
                      >
                        Message sent successfully!
                      </motion.div>
                    )}
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedBackground>
    </main>
  )
}
