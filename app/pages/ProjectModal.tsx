'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

type ModalProps = {
    project: any
    onClose: () => void
}

export default function ProjectModal({ project, onClose }: ModalProps) {
    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    className='fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={ onClose }
                >
                    <motion.div
                        className='bg-zinc-900 text-white rounded-lg shadow-xl p-6 max-w-lg w-full relative'
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className='absolute top-4 right-4 text-zinc-500 hover:text-white'
                            onClick={onClose}
                        >
                            <FiX size={24} />
                        </button>
                        <Image src={project.image} alt={project.title} width={426} height={240} className='w-full h-60 object-cover rounded-xl' />
                        <h2 className='text-xl font-bold mt-4'>{project.title}</h2>
                        <p className='text-sm text-zinc-300 mt-2'>{project.description}</p>
                        <div className='flex flex-wrap gap-2 mt-4'>
                            {project.tags.map((tag: string, index: number) => (
                                <span key={index} className='bg-indigo-600 px-2 py-1 rounded-full text-xs'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className='flex gap-4 mt-6'>
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target='_blank'
                                    rel='nooopener noreferrer'
                                    className='bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm'
                                >
                                    Vew Demo
                                </a>
                            )}
                            {project.repoUrl && (
                                <a
                                    href={project.repoUrl}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='bg-ziinc-700 hover:bg-zinc-600 px-4 py-2 rounded-md text-sm'
                                >
                                    View Repository
                                </a>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}