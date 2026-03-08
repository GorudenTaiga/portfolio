'use client';
import { motion } from 'framer-motion';
import { FaReact } from 'react-icons/fa';
import { SiUnrealengine } from 'react-icons/si';

export default function About() {
  return (
    <section
      id="about"
      className="h-full flex flex-col justify-center items-center text-center text-white font-inter px-4 py-8 md:py-12"
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
        className="max-w-3xl text-base md:text-xl leading-relaxed mb-8 md:mb-12"
      >
        <span className="text-cyan-400">&lt;Hello World /&gt;</span>
        <br />
        <br />
        I{'\u2019'}m a vocational high school (SMK) graduate who started coding back in
        2021 {'\u2014'} and never really stopped since. What began as school lessons in
        C++ and PHP quickly grew into a real passion for building things, both
        on the web and inside game engines.
      </motion.p>

      {/* Expertise Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-zinc-800/60 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 text-left hover:border-indigo-500/40 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl">
              <FaReact />
            </div>
            <h3 className="text-base md:text-lg font-semibold">Web Development</h3>
          </div>
          <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
            Building full-stack applications with{' '}
            <span className="text-indigo-400">Laravel</span>,{' '}
            <span className="text-indigo-400">React</span>,{' '}
            <span className="text-indigo-400">Next.js</span>, and{' '}
            <span className="text-indigo-400">TypeScript</span>
            {' '}{'\u2014'} from library management systems and e-commerce platforms to
            Discord bots and WhatsApp automation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="bg-zinc-800/60 backdrop-blur-sm border border-white/10 rounded-xl p-5 md:p-6 text-left hover:border-indigo-500/40 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl">
              <SiUnrealengine />
            </div>
            <h3 className="text-base md:text-lg font-semibold">Game Development</h3>
          </div>
          <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
            Years of experience with{' '}
            <span className="text-indigo-400">Unreal Engine 5</span> and{' '}
            <span className="text-indigo-400">Unity</span>
            {' '}{'\u2014'} creating cultural exploration games, RPG combat systems,
            cyber security simulations, and virtual architectural experiences.
          </p>
        </motion.div>
      </div>

      {/* Summary */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="max-w-3xl text-sm md:text-lg text-zinc-300 leading-relaxed"
      >
        With around <span className="text-white font-semibold">4+ years</span> of
        hands-on experience, I enjoy turning ideas into real, functional
        products {'\u2014'} whether it{'\u2019'}s a responsive website, an immersive 3D
        experience, or a bot that keeps a community running.
        Always learning, always building.
      </motion.p>
    </section>
  );
}