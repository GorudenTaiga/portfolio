'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
type ProjectProps = {
    project: {
        id: number
        image: string[]
        thumbnail: string
        title: string
        sinopsis: string
        description: string
        tags: string[]
        techIcons: React.ReactNode[]
        date: string
    }
    onClick: () => void
}

export default function ProjectCard({ project, onClick }: ProjectProps) {
    return (
        <motion.div
            className='bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl overflow-hidden shadow-lg min-h-6xl max-h-6xl cursor-pointer'
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x:0 }}
            exit={{ opacity: 0, x:-100 }}
            transition={{ duration: 0.5 }}
            onClick={onClick}
        >
            <Image src={project.thumbnail} alt={project.title} width={426} height={240} className='w-full h-40 object-cover rounded' />
            <div className='p-4'>
                <h3 className='text-lg font-semibold text-white'>{project.title}</h3>
                <p className='text-sm text-zinc-400 line-clamp-1 h-full'>{project.sinopsis}</p>
                <div className='flex flex-wrap gap-2 mt-2'>
                    {project.techIcons.map((icon, index) => (
                        <span key={index} className='text-indigo-400 text-xl'>
                            {icon}
                        </span>
                    ))}
                </div>
                <p className='text-xs text-zinc-500 mt-2'>Created at: {project.date}</p>
                <p className='text-xs text-zinc-500 bottom-0 right-0'>Click for details...</p>
            </div>
        </motion.div>
    )
}