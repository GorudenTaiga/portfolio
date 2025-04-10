'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

type ModalProps = {
    project: any
    onClose: () => void
}

export default function ProjectModal({ project, onClose }: ModalProps) {
    const [activeMedia, setActiveMedia] = useState<string>('');
    const [isMediaPlaying, setIsMediaPlaying] = useState(false)


    useEffect(() => {
        if (project && project.image && project.image.length > 0) {
            setActiveMedia(project.image[0])
        }
    }, [project]);

    useEffect(() => {
        const backsound = document.querySelector('audio');
        const video = document.querySelector('video');

        if (!backsound || !video) return;

        const handlePlay = () => backsound.pause();
        const handlePause = () => backsound.play();

        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handlePause);

        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('ended', handlePause);
        }
    })

    if (!project) return null;

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
                        {/* <Image src={project.image} alt={project.title} width={426} height={240} className='w-full h-60 object-cover rounded-xl' /> */}
                        <div className='mb-4'>
                            {activeMedia && activeMedia.endsWith('.webm') ? (
                                <video key={activeMedia} controls autoPlay={true} loop={true} src={activeMedia} onPlay={() => setIsMediaPlaying(true)} onPause={() => setIsMediaPlaying(false)} onEnded={() => setIsMediaPlaying(false)} className='w-full h-60 rounded-lg transition ease-in-out duration-500' />
                            ) : (
                                <Image
                                    key={activeMedia}
                                    src={activeMedia ? activeMedia : '/images/portfolio_thumbnail.png'}
                                    alt={activeMedia}
                                    width={426}
                                    height={240}
                                    className='w-full h-60 object-cover rounded-xl transition ease-in-out duration-500'
                                />
                            )}
                        </div>
                        <div className='flex overflow-y-hidden overflow-x-auto w-full max-w-full scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-transparent'>
                            {project && project.image.map((item: string, index: number) => (
                                <div
                                    key={index}
                                    onClick={() => setActiveMedia(item)}
                                    className={`cursor-pointer border rounded-lg p-1 transition duration-300 ${activeMedia === item ? 'border-indigo-400 scale-105' : 'border-transparent'}`} 
                                >
                                    <section className="flex-shrink-0 flex-row gap-2 min-w-20 max-w-20 rounded-full">
                                        {item && item.endsWith('.webm') ? (
                                            <video src={item} preload='metadata' key={index} onClick={() => setActiveMedia(item)}  autoPlay={false} className='h-14 object-cover rounded transition ease-in-out duration-500' />
                                        ) : (
                                            <Image
                                                key={index}
                                                src={item}
                                                alt={item}
                                                width={426}
                                                height={240}
                                                className='h-14 object-cover rounded transition ease-in-out duration-500'
                                            />
                                        )}
                                    </section>
                                </div>
                            ))}
                        </div>
                        <h2 className='text-xl font-bold mt-4'>{project.title}</h2>
                        <p className='text-sm text-zinc-300 mt-2'>{project.description}</p>
                        <div className='flex flex-wrap gap-2 mt-4'>
                            {project && project.tags.map((tag: string, index: number) => (
                                <span key={index} className='bg-indigo-600 px-2 py-1 rounded-full text-xs'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className='flex gap-4 mt-6'>
                            {project && project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target='_blank'
                                    rel='nooopener noreferrer'
                                    className='bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-sm'
                                >
                                    Vew Demo
                                </a>
                            )}
                            {project && project.repoUrl && (
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