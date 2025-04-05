'use client';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center text-center text-white font-inter px-4 py-30"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-bold mb-6"
      >
        About Me
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="max-w-3xl text-lg md:text-xl leading-relaxed"
      >
        <span className="text-cyan-400">&lt;Hello World /&gt;</span>
        <br />
        <br />
        I’m not just writing code — I’m building digital experiences that live
        in the future.
        <br />
        <br />
        With over 2 years of crafting scalable Back-end Systems and 3 years of
        designing immersive Games, I’ve been obsessed with creating products
        that combine functionality with emotion.
        <br />
        <br />
        From powerful APIs to engaging gameplay — I love the challenge of
        transforming ideas into reality.
        <br />
        <br />
        Let’s build something extraordinary together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-10 text-sm uppercase tracking-widest text-gray-400"
      >
        Currently Exploring : Unreal Engine 5, Backend Optimization, Metaverse
        Integration
      </motion.div>
    </section>
  )
}