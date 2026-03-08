'use client';
import { useState } from 'react';
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

const skills = [
  {
    icon: <SiJavascript />,
    title: 'JavaScript',
    date: '2021-06',
    description:
      'One of the very first languages I met when starting web dev. This language is crazy \u2014 you can literally build anything with JS. Flexible, powerful, and super fun to play around with.',
  },
  {
    icon: <SiCplusplus />,
    title: 'C++',
    date: '2021-10',
    description:
      'While most people start with Python, I went the hard way \u2014 C++ was part of my school lessons. No regrets though. Learning C++ really taught me a lot about how programming works under the hood.',
  },
  {
    icon: <FaPhp />,
    title: 'PHP',
    date: '2021-12',
    description:
      'My journey with PHP started in 10th grade \u2014 literally my first step into web programming. At first I was clueless, but PHP felt comfortable to use. Simple, clean, and pretty beginner-friendly.',
  },
  {
    icon: <SiUnrealengine />,
    title: 'Unreal Engine',
    date: '2022-06',
    description:
      "Fun fact \u2014 I actually tried UE4 back in 8th grade, but wasn't serious about it yet. I only started taking Unreal Engine seriously in 11th grade, and went straight to UE5 because why not?",
  },
  {
    icon: <TbBrandCSharp />,
    title: 'C#',
    date: '2022-08',
    description:
      'Met C# during 11th grade. Compared to C++, this language felt like a breath of fresh air \u2014 clean syntax, easy to read, and very approachable, especially after surviving C++ first.',
  },
  {
    icon: <FaLaravel />,
    title: 'Laravel',
    date: '2022-10',
    description:
      'First touched Laravel in 11th grade while preparing for LSP certification. My first time playing around with a real web framework, and honestly... it was fun! Still my go-to for backend work.',
  },
  {
    icon: <FaUnity />,
    title: 'Unity',
    date: '2024-05',
    description:
      'Found Unity through an Indonesian Game Developer community. I was surprised how lightweight it was \u2014 even my old laptop could handle it! A great alternative to Unreal Engine for certain projects.',
  },
  {
    icon: <FaReact />,
    title: 'React.js',
    date: '2024-08',
    description:
      "Started React out of necessity \u2014 I needed a cool, responsive portfolio website and everyone said \"Just use React bro.\" Gave it a shot, and yeah, React did not disappoint at all.",
  },
  {
    icon: <SiNextdotjs />,
    title: 'Next.js',
    date: '2024-08',
    description:
      'Picked up Next.js alongside React for building this portfolio. Server-side rendering, file-based routing, and the overall developer experience made it a natural choice for production-ready apps.',
  },
  {
    icon: <SiTypescript />,
    title: 'TypeScript',
    date: '2024-08',
    description:
      "Started using TypeScript to bring type safety into my React and Next.js projects. It caught so many bugs before runtime that I honestly can't imagine going back to plain JS for larger projects.",
  },
  {
    icon: <FaNodeJs />,
    title: 'Node.js',
    date: '2025-02',
    description:
      'Jumped into Node.js when building Discord and WhatsApp bots. Running JavaScript on the server side opened up a whole new world \u2014 from real-time bots to API servers and automation tools.',
  },
  {
    icon: <SiTailwindcss />,
    title: 'Tailwind CSS',
    date: '2024-08',
    description:
      'Tailwind made styling actually enjoyable. Instead of writing custom CSS files, I just compose utility classes right in the markup. Fast prototyping, consistent design, and no more naming headaches.',
  },
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  return (
    <motion.section
      id="skills"
      className="h-full flex flex-col justify-center items-center px-4 py-8 md:py-12 font-inter"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
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
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04, duration: 0.4 }}
            whileHover={{ scale: 1.08 }}
            className="group relative bg-zinc-800/60 backdrop-blur-sm border border-white/10 hover:border-indigo-500/40 rounded-xl p-3 md:p-4 cursor-pointer text-center transition-all hover:bg-zinc-700/60"
            onClick={() => setSelectedSkill(skill)}
          >
            <div className="text-2xl md:text-3xl text-indigo-400 mb-1.5 flex justify-center group-hover:text-indigo-300 transition-colors">
              {skill.icon}
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
              >
                <FiX size={20} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl shrink-0">
                  {selectedSkill.icon}
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