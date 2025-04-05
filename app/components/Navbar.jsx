'use client'

import { useState, useEffect } from 'react'
import {Link} from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import clsx from 'clsx'

const navLinks = [
  { name: 'Home', to: '#hero' },
  { name: 'About', to: '#about' },
  { name: 'Skills', to: '#skills' },
  { name: 'Projects', to: '#projects' },
  { name: 'Contact', to: '#contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])



  return (
    <motion.nav
      className={clsx(
        'fixed top-4 left-1/2 z-50 flex w-[90%] max-w-4xl -translate-x-1/2 items-center justify-between rounded-full px-6 py-3 text-white backdrop-blur-md',
        scrolled
          ? 'bg-white/10 border border-white/20 shadow-lg'
          : 'bg-transparent'
      )}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-xl font-bold tracking-widest text-cyan-400">
        PORTFOLIO
      </div>

      <div className="hidden md:flex gap-6">
        {navLinks.map((link, index) => (
          <a
            key={index}
            href={link.to}
            className="cursor-pointer text-sm uppercase tracking-wider hover:text-cyan-400 transition"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
            className="absolute right-4 top-16 flex flex-col gap-4 rounded-xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md"
          >
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.to}
                onClick={() => setMenuOpen(!menuOpen)}
                className="cursor-pointer text-sm uppercase tracking-wider hover:text-cyan-400 transition"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
