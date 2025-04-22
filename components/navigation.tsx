"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuVariants = {
    closed: {
      left: "-100%",
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      left: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
        staggerDirection: 1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <>
      <input
        type="checkbox"
        id="main-navigation-toggle"
        className="btn btn--close"
        title="Toggle main navigation"
        className="btn btn--close"
        title="Toggle main navigation"
        checked={isOpen}
        onChange={toggleMenu}
      />
      <label htmlFor="main-navigation-toggle">
        <span></span>
      </label>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="main-navigation"
            className="nav-main"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* RGB Animated Bar */}
            <motion.div
              className="rgb-bar"
              variants={{
                closed: { opacity: 0, x: 20 },
                open: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.3 }}
            ></motion.div>

            <ul className="menu font-display compact-menu">
              <motion.li className="menu__item font-bold" variants={itemVariants}>
                <Link className="menu__link" href="/" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
              </motion.li>
              <motion.li className="menu__item font-bold" variants={itemVariants}>
                <Link className="menu__link" href="/about" onClick={() => setIsOpen(false)}>
                  About
                </Link>
              </motion.li>
              <motion.li className="menu__item font-bold" variants={itemVariants}>
                <Link className="menu__link" href="/portfolio" onClick={() => setIsOpen(false)}>
                  Portfolio
                </Link>
                <ul className="submenu font-mono compact-submenu">
                  <li className="menu__item font-bold">
                    <Link className="menu__link" href="/portfolio/cognxto" onClick={() => setIsOpen(false)}>
                      Cognxto
                    </Link>
                  </li>
                  <li className="menu__item font-bold">
                    <Link className="menu__link" href="/portfolio/musextreme" onClick={() => setIsOpen(false)}>
                      MuseXTreme
                    </Link>
                  </li>
                  <li className="menu__item font-bold">
                    <Link className="menu__link" href="/portfolio/test" onClick={() => setIsOpen(false)}>
                      Test
                    </Link>
                  </li>
                </ul>
              </motion.li>
              <motion.li className="menu__item font-bold" variants={itemVariants}>
                <Link className="menu__link" href="/services" onClick={() => setIsOpen(false)}>
                  Services
                </Link>
              </motion.li>
              <motion.li className="menu__item font-bold" variants={itemVariants}>
                <Link className="menu__link" href="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
