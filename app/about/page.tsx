"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Navigation from "@/components/navigation"
import AnimatedBackground from "@/components/animated-background"

export default function About() {
  return (
    <main className="min-h-screen w-full bg-black overflow-hidden">
      <Navigation />

      <AnimatedBackground variant="dark" intensity="low">
        <motion.div
          className="c_6-frame p-8 md:p-16 lg:p-24 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="c_6-text max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="c_6-text1">
              Hello 👋 I'm Ben, a Digital Business &amp; Innovation student at Tokyo International University.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 space-y-6 text-white max-w-3xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-xl">
              I'm passionate about creating digital experiences that combine innovative technology with thoughtful
              design. My background in Digital Business gives me a unique perspective on how technology can solve
              real-world problems.
            </p>
            <p className="text-xl">
              When I'm not coding or designing, you can find me exploring Tokyo, taking photographs, or learning about
              new technologies.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 flex flex-wrap gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="skill-pill">UI/UX Design</div>
            <div className="skill-pill">Web Development</div>
            <div className="skill-pill">Digital Marketing</div>
            <div className="skill-pill">Business Strategy</div>
            <div className="skill-pill">Innovation Management</div>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/" className="c_6-instance">
              <div className="c_6-frame1 hover:scale-105 transition-transform border border-[#dba6ff]">
                <div className="c_6-text2">
                  <p className="c_6-text3">Back</p>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatedBackground>
    </main>
  )
}
