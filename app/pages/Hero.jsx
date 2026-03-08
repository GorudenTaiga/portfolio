'use client';

import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { FiChevronDown } from 'react-icons/fi';

export default function Hero({ displayName = 'Reza Arfana Rafi' }) {
  return (
    <motion.section
      id="hero"
      className="h-full flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-zinc-900 to-black text-white font-inter relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Code-style greeting */}
      <motion.p
        className="text-sm md:text-base text-cyan-400 font-mono tracking-wider mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        &lt;Hello World /&gt;
      </motion.p>

      {/* Name */}
      <motion.h1
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        I{'\u2019'}m <span className="text-indigo-500">{displayName}</span>
      </motion.h1>

      {/* Typewriter Roles */}
      <motion.h2
        className="text-lg md:text-2xl lg:text-3xl text-zinc-400 mb-6 h-9 md:h-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Typewriter
          words={[
            'Back-end Web Developer',
            'Game Developer',
            'Full-Stack Developer',
            'Tech Enthusiast',
          ]}
          loop={0}
          typeSpeed={70}
          cursor
          cursorColor="#667eea"
          cursorStyle="|"
          deleteSpeed={50}
          delaySpeed={3000}
        />
      </motion.h2>

      {/* Tagline */}
      <motion.p
        className="max-w-2xl text-sm md:text-base text-zinc-400 leading-relaxed mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Crafting performant web applications and immersive game experiences{'\u2014'}with 4+ years of turning ideas into real products.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <a
          href="#projects"
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          View My Projects
        </a>
        <a
          href="#contact"
          className="bg-zinc-800/60 border border-white/10 hover:border-indigo-500/40 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all"
        >
          Get in Touch
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { delay: 1.5, duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <FiChevronDown className="text-zinc-600 text-2xl" />
      </motion.div>
    </motion.section>
  );
}