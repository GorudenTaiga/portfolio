'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaravel, FaReact, FaPhp, FaHtml5, FaUnity } from 'react-icons/fa';
import { SiUnrealengine, SiJavascript, SiTailwindcss, SiCplusplus } from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { FiX } from 'react-icons/fi';

const skills = [
  { icon: <FaLaravel />, title: 'Laravel', level: 87, date: '2022-10', description: 'Saya mulai belajar Laravel pada saat kelas 2 SMK melalui pelajaran sekolah sembari belajar untuk menuju ke LSP (Lembaga Sertifikasi Profesi)' },
  { icon: <FaPhp />, title: 'PHP', level: 85, date: '2021-12', description: 'Saya mulai belajar PHP ketika saya memasuki SMK kelas 1, disitu saya benar-benar masih awal sekali untuk mempelajari pemrograman Website namun ternyata bahasa ini sangat nyaman digunakan' },
  { icon: <SiJavascript />, title: 'JavaScript', level: 80, date: '2021-06', description: 'Pada saat awal mula saya belajar pemrograman website, pastinya saya mempelajari bahasa basic seperti Javascript ini salah satunya, bahasa ini sangat nyaman digunakan dan bisa untuk segala hal. Salut lah sama JavaScript ini' },
  { icon: <FaReact />, title: 'React.js', level: 70, date: '2024-08', description: 'Saya sebenarnya mencoba teknologi React.js ini karena saat itu saya sedang didesak untuk membuat sebuah website Portofolio yang responsive dan interaktif, karena saya selalu mendengar kalau React.js cocok untuk hal ini, maka saya langsung mempelajarinya. Dan ternyata emang worth it banget tech ini buat dipake Front-end Web Development' },
  { icon: <SiUnrealengine />, title: 'Unreal Engine', level: 96, date: '2022-06', description: 'Sebenarnya sebelum saya mempelajari pemrograman dari sekolah, saya sudah mencoba mempelajari Unreal Engine 4 saat saya SMP Kelas 2, namun saat itu saya hanya mencoba saja tidak terlalu fokus dengan hal tersebut. Saya baru fokus mempelajari Unreal Engine ketika saya beranjak SMK kelas 2, dan pada saat itu saya langsung menggunakan Unreal Engine 5' },
  { icon: <FaUnity />, title: 'Unity', level: 78, date: '2024-05', description: 'Saya menemukan Unity ketika saya berkunjung ke komunitas Game Developer Indonesia dan saat itu saya juga ingin mencoba teknologi game development selain Unreal Engine, dan ternyata Unity ini sangat ringan bahkan laptop saya yang sudah lawas pun masih bisa memakainya, akhirnya saya mulai menekuni juga untuk Unity ini' },
  { icon: <SiCplusplus />, title: 'C++', level: 80, date: '2021-10', description: 'Disaat orang lain mempelajari bahasa pemrograman Python sebagai bahasa pemrograman pertama mereka, saya justru malah menggunakan C++ sebagai bahasa pemrograman pertama saya karena sebagai salah satu materi pelajaran dari sekolah saya juga saat itu. Dan ternyata memang worth-it untuk pakai bahasa ini, saya jadi lebih mengetahui seluk beluk dalam pemrograman dan mekanisme yang ada didalamnya' },
  { icon: <TbBrandCSharp />, title: 'C#', level: 85, date: '2022-08', description: 'Saya menemukan C# (CSharp) ketika saya mempelajarinya disekolah ketika SMK kelas 11. Dilihat dari syntaxnya, bahasa ini sangat mudah untuk dipelajari terutama bagi yang sudah dicekoki oleh C++ sebelumnya, syntaxnya sederhana, mudah dimengerti dan mudah dibaca ' }
];

export default function Skills() {
    const [selectedSkill, setSelectedSkill] = useState(null);

    return (
        <motion.section
            id="skills"
            className='py-30 px-4 max-w-6xl mx-auto mb-30'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className='text-3xl font-bold text-center text-white mb-12'>Skills</h2>
            <div className='grid grid-cols-4 lg:grid-cols-8 gap-6 pb-[45] justify-center align-center'>
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
                        <p className='text-xs text-zinc-400'>Click for more details</p>
                    </motion.div>
                ))}
            </div>

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

                            <div className='w-full bg-zinc-700 h-2 rounded-full mb-2'>
                                <div className='h-full bg-indigo-400 rounded-full' style={{ width: (selectedSkill.level/100 * 340) }} />
                            </div>
                            <p className='text-sm text-zinc-300'>Proficiency: {selectedSkill.level}%</p>

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