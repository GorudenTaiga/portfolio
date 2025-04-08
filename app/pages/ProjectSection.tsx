'use client';
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLaravel, FaReact, FaHtml5, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiUnrealengine, SiTailwindcss } from 'react-icons/si';
import Skills from './Skills';

export default function ProjectSection({projects}: {projects: any[]}) {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projectsPerPage, setProjectsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setProjectsPerPage(1);
            } else if (window.innerWidth < 768) {
                setProjectsPerPage(2);
            } else if (window.innerWidth < 1024) {
                setProjectsPerPage(3);
            } else {
                setProjectsPerPage(5);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    
    const totalPage = Math.ceil(projects.length / projectsPerPage);
    
    
    const handleNext = () => {
        setCurrentPage((next) => Math.min(next + 1, totalPage - 1))
        if (currentPage == (projects.length - 1)) {
            setCurrentPage(0);
        }
    };
    
    const handlePrev = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0))
        if (currentPage == 0) {
            setCurrentPage(projects.length - 1)
        }
    };

    useEffect(() => {
        const newTotalPage = Math.ceil(projects.length / projectsPerPage);
        if (currentPage > newTotalPage - 1) {
            setCurrentPage(0);
            console.log(currentPage);
        }
    }, [projectsPerPage, projects.length, currentPage]);

    const displayedProjects = projects.slice(
        currentPage * projectsPerPage,
        currentPage * projectsPerPage + projectsPerPage
    );
    
    
    return (
        <motion.section
            id='projects'
            className='py-30 px-4 max-w-6xl h-4 mx-auto'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            <h2 className='text-3xl font-bold text-center text-white mb-12'>Projects</h2>
            <AnimatePresence mode='wait'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center'>
                    {/* {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} onClick={() => setSelectedProject(project)} />
                    ))} */}
                        {displayedProjects.map((project, index) => (
                            <ProjectCard key={index} project={project} onClick={() => setSelectedProject(project)} />
                        ))}
                </div>
            </AnimatePresence>
            {totalPage > 1 && (
                <div className='flex justify-center mt-6 gap-4'>
                    <button
                        onClick={handlePrev}
                        className='bg-zinc-800 text-white px-4 py-2 rounded-lg'
                    >
                        Previous Project
                    </button>
                    <button
                        onClick={handleNext}
                        className='bg-zinc-800 text-white px-4 py-2 rounded-lg'
                    >
                        Next Project
                    </button>
                </div>
            )}
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            <Skills />
        </motion.section>
    )
}