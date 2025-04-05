'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import Typical from 'react-typical';
import TypewriterComponent from 'typewriter-effect';

export default function Hero() {
    return (
        <motion.section
            id='hero'
            className='min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-zinc-900 to-black text-white'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.h1
                className='text-4xl md:text-6xl font-extrabold mb-6'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                Hello World! I am <span className='text-indigo-500'>Reza Arfana Rafi</span>
            </motion.h1>

            <motion.h2
                className='text-xl md:text-3xl text-zinc-400 mb-8'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <TypewriterComponent
                    options={{ 
                        strings: ['Back-end Web Developer', 'Game Developer', 'Programmer', 'Tech Enthusiast'],
                        autoStart: true,
                        loop: true,
                        wrapperClassName: 'span',
                        delay: 30
                    }}
                />
            </motion.h2>

            <motion.p
                className="max-w-xl text-zinc-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
            >
                I build high-quality, performant websites and immersive game experiences.<br />
                Let’s explore my universe of code!
            </motion.p>
        </motion.section>
    )
}