'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaravel, FaReact, FaPhp, FaNodeJs, FaUnity } from 'react-icons/fa';
import {
  SiUnrealengine,
  SiJavascript,
  SiTailwindcss,
  SiNextdotjs,
  SiTypescript,
  SiCplusplus,
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { FiX } from 'react-icons/fi';
import { fetchSkills } from '../lib/supabase';

interface Skill {
  id: number;
  title: string;
  icon: string;
  date: string;
  description: string;
}

const ICON_MAP: { [key: string]: React.ReactNode } = {
  'SiJavascript': <SiJavascript />,
  'SiCplusplus': <SiCplusplus />,
  'FaPhp': <FaPhp />,
  'SiUnrealengine': <SiUnrealengine />,
  'TbBrandCSharp': <TbBrandCSharp />,
  'FaLaravel': <FaLaravel />,
  'FaUnity': <FaUnity />,
  'FaReact': <FaReact />,
  'SiNextdotjs': <SiNextdotjs />,
  'SiTypescript': <SiTypescript />,
  'FaNodeJs': <FaNodeJs />,
  'SiTailwindcss': <SiTailwindcss />,
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  if (loading) {
    return (
      <motion.section
        id="skills"
        className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-16 md:py-24 font-inter"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <p className="text-zinc-400">Loading skills...</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      id="skills"
      className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-16 md:py-24 font-inter"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 text-center"
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2.5 md:gap-4 max-w-4xl w-full">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            whileHover={{ scale: 1.08 }}
            className="group relative bg-zinc-800/60 backdrop-blur-sm border border-white/10 hover:border-indigo-500/40 rounded-xl p-3 md:p-4 cursor-pointer text-center transition-all hover:bg-zinc-700/60"
            onClick={() => setSelectedSkill(skill)}
          >
            <div className="text-2xl md:text-3xl text-indigo-400 mb-1.5 flex justify-center group-hover:text-indigo-300 transition-colors">
              {ICON_MAP[skill.icon] || <SiJavascript />}
            </div>
            <p className="text-[11px] md:text-sm text-white font-medium leading-tight">
              {skill.title}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xs md:text-sm text-zinc-500 mt-4 md:mt-6 text-center"
      >
        Click any skill to see the story behind it
      </motion.p>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-zinc-900 border border-white/10 text-white p-6 rounded-xl shadow-2xl max-w-md w-full relative"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
                onClick={() => setSelectedSkill(null)}
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl shrink-0">
                  {ICON_MAP[selectedSkill.icon] || <SiJavascript />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">
                    {selectedSkill.title}
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Since{' '}
                    {new Date(selectedSkill.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedSkill.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}