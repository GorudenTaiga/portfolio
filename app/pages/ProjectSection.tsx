'use client';
import { useEffect, useState, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ProjectSection({
  projects,
  portfolioThumbnail,
}: {
  projects: any[];
  portfolioThumbnail?: string;
}) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState('next');

  const resolvedProjects = portfolioThumbnail
    ? projects.map((p) =>
        p.id === 0
          ? {
              ...p,
              thumbnail: portfolioThumbnail,
              image: Array.isArray(p.image)
                ? [portfolioThumbnail, ...p.image.slice(1)]
                : portfolioThumbnail,
            }
          : p
      )
    : projects;

  const totalPage = Math.ceil(resolvedProjects.length / projectsPerPage);

  const slideVariants = {
    hiddenRight: { opacity: 0, x: 80 },
    hiddenLeft: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0 },
    exitRight: { opacity: 0, x: -80 },
    exitLeft: { opacity: 0, x: 80 },
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setProjectsPerPage(1);
      } else if (window.innerWidth < 1080) {
        setProjectsPerPage(2);
      } else {
        setProjectsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const newTotalPage = Math.ceil(resolvedProjects.length / projectsPerPage);
    if (currentPage > newTotalPage - 1) {
      setCurrentPage(0);
    }
  }, [projectsPerPage, resolvedProjects.length, currentPage]);

  const handleNext = useCallback(() => {
    setDirection('next');
    setCurrentPage((prev) => (prev >= totalPage - 1 ? 0 : prev + 1));
  }, [totalPage]);

  const handlePrev = useCallback(() => {
    setDirection('previous');
    setCurrentPage((prev) => (prev <= 0 ? totalPage - 1 : prev - 1));
  }, [totalPage]);

  const displayedProjects = resolvedProjects.slice(
    currentPage * projectsPerPage,
    currentPage * projectsPerPage + projectsPerPage
  );

  return (
    <motion.section
      id="projects"
      className="h-full flex flex-col justify-center items-center px-4 max-w-6xl mx-auto font-inter"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-bold text-center text-white mb-6 md:mb-10"
      >
        Projects
      </motion.h2>

      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={slideVariants}
            initial={direction === 'next' ? 'hiddenRight' : 'hiddenLeft'}
            animate="visible"
            exit={direction === 'next' ? 'exitLeft' : 'exitRight'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
          >
            {displayedProjects.map((project: any) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPage > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mt-5 md:mt-8"
        >
          <button
            onClick={handlePrev}
            className="flex items-center gap-2 bg-zinc-800/60 border border-white/10 hover:border-indigo-500/40 text-white px-4 py-2 rounded-full text-sm transition-all hover:bg-zinc-700/60"
          >
            <FiChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPage }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentPage ? 'next' : 'previous');
                  setCurrentPage(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? 'bg-indigo-400 w-6'
                    : 'bg-zinc-600 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-zinc-800/60 border border-white/10 hover:border-indigo-500/40 text-white px-4 py-2 rounded-full text-sm transition-all hover:bg-zinc-700/60"
          >
            <span className="hidden sm:inline">Next</span>
            <FiChevronRight size={16} />
          </button>
        </motion.div>
      )}

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}