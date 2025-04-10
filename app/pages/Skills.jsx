'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaravel, FaReact, FaPhp, FaHtml5, FaUnity } from 'react-icons/fa';
import { SiUnrealengine, SiJavascript, SiTailwindcss, SiCplusplus } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { FiX } from 'react-icons/fi';

const skills = [
  { icon: <FaLaravel />, title: 'Laravel', level: 87, date: '2022-10', description: 'I first touched Laravel when I was in 11th grade back in vocational high school (SMK). It was part of my school lessons — I learned it while preparing for LSP (kind of like a certification test). It was my first time playing around with a real web framework, and honestly… it was fun!' },
  { icon: <FaPhp />, title: 'PHP', level: 85, date: '2021-12', description: 'My journey with PHP started even earlier — when I was in 10th grade. That was literally my first step into the world of web programming. At first, I was super clueless, but PHP kinda felt comfortable to use. Simple, clean, and pretty beginner-friendly for me at that time.' },
  { icon: <SiJavascript />, title: 'JavaScript', level: 80, date: '2021-06', description: 'Of course, when I started learning web dev, one of the very first languages I met was JavaScript. And wow… This language is crazy. You can literally build anything with JS. It’s flexible, powerful, and super fun to play around with. Big respect for JavaScript!' },
  { icon: <FaReact />, title: 'React.js', level: 70, date: '2024-08', description: 'My adventure with React.js actually started out of necessity. I needed to build a portfolio website that looked cool, responsive, and interactive — and everyone kept saying “Just use React bro, it’s perfect for that.” So I gave it a shot... And yeah, React did not disappoint at all. Totally worth learning for front-end development.' },
  { icon: <SiUnrealengine />, title: 'Unreal Engine', level: 96, date: '2022-06', description: 'Fun fact, before I even learned programming seriously at school, I actually tried Unreal Engine 4 when I was in 8th grade. But I was just messing around back then — didn’t really focus on it. I only started taking Unreal Engine seriously when I was in 11th grade… and went straight to Unreal Engine 5 because why not?' },
  { icon: <FaUnity />, title: 'Unity', level: 78, date: '2024-05', description: 'I found Unity when I joined an Indonesian Game Developer community. At that time, I wanted to try other game engines besides Unreal Engine. And I was surprised how lightweight Unity was — even my old laptop could still handle it! That’s why I decided to also dive into Unity.' },
  { icon: <SiCplusplus />, title: 'C++', level: 80, date: '2021-10', description: 'While most people started their programming journey with Python (the safe choice), I went the hard way — I learned C++ first because it was part of my school lessons. And honestly? No regrets. Learning C++ really taught me a lot about how programming works under the hood.' },
  { icon: <TbBrandCSharp />, title: 'C#', level: 85, date: '2022-08', description: 'Then I met C# (C-Sharp) during my 11th grade at school. Compared to C++, this language felt like a breath of fresh air. The syntax is clean, easy to read, and very beginner-friendly — especially if you already survived C++ before' }
];

export default function Skills() {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [small, setSmall] = useState();
    useEffect(() => {
        const handleResize = () => {
            if (window.innerHeight > 720 || window.innerHeight > 1280) {
                setSmall(true)
            }
            else {
                setSmall(false)
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return (
        <motion.section
            id="skills"
            className='py-25 px-4 max-w-6xl mx-auto block mb-40 font-inter justify-center items-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl md:text-5xl font-bold mb-6 text-center"
            >
                Skills
            </motion.h2>
            <div className='grid grid-cols-2 lg:grid-cols-3 gap-6 pb-[45] justify-center align-center'>
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        className='relative bg-zinc-800 hover:bg-zinc-700 rounded-xl shadow-md p-4 cursor-pointer text-center transition-all hover:shadow-xl'
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedSkill(skill)}
                    >
                        <div className='text-4xl text-indigo-400 mb-2 flex justify-center'>
                            {skill.icon}
                        </div>
                        <p className='text-sm text-white'>{skill.title}</p>
                        <p className='text-xs text-zinc-400'>Click for details</p>
                    </motion.div>
                ))}
            </div>

            {small && (
                <motion.p
                    className='text-lg md:text-xl leading-relaxed text-center mt-15 text-white px-4'
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1 }}
                >
                    ~ "Every line of code writes my story to tomorrow." ~   
                    <br />
                    Let’s keep learning, keep building, and keep having fun with code.
                    <br />
                    Cheers! 🚀
                </motion.p>
            )}

            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSkill(null)}
                    >
                        <motion.div
                            className='bg-zinc-900 text-white p-6 rounded-lg shadow-lg max-w-sm w-full relative'
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className='absolute top-2 right-2 text-zinc-400 hover:text-white'
                                onClick={() => setSelectedSkill(null)}
                            >
                                <FiX />
                            </button>

                            <div className="text-5xl text-indigo-400 mb-4 flex justify-center">
                                {selectedSkill.icon}
                            </div>

                            <h3 className='text-xl font-semibold mb-2 text-center'>
                                {selectedSkill.title}
                            </h3>

                            <p className='text-md mb-6 mt-3 text-left'>
                                {selectedSkill.description}
                            </p>

                            {/* <div className='w-full bg-zinc-700 h-2 rounded-full mb-2'>
                                <div className='h-full bg-indigo-400 rounded-full transition-all duration-500 ease-in-out' style={{ width: `${selectedSkill.level}%` }} />
                            </div>
                            <p className='text-sm text-zinc-300'>Proficiency: {selectedSkill.level}%</p> */}

                            <p className='text-sm text-zinc-400 mb-1'>
                                Start from: {new Date(selectedSkill.date).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long'
                                })}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    )
}