'use client';
import { useEffect, useState, useCallback } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { Project } from '../types/project';

export default function ProjectSection({
  projects,
  portfolioThumbnail,
}: {
  projects: Project[];
  portfolioThumbnail?: string;
}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'next' | 'previous'>('next');
  const [filter, setFilter] = useState<'All'|'Web'|'Game'|'Bot'|'Desktop'>('All');

  const resolvedProjects = portfolioThumbnail
    ? projects.map((p) =>
        p.id === 0
          ? {
              ...p,
              thumbnail: portfolioThumbnail,
              image: [portfolioThumbnail, ...p.image.slice(1)],
            }
          : p
      )
    : projects;

  // Categorization
  const getCategory = (tags: string[]) => {
    if (tags.some(t => ['React.js','Laravel','Next.js','TypeScript','PHP','Node.js','Inertia.js','Tailwind CSS','shadcn/ui','Pest','Vite'].includes(t))) return 'Web';
    if (tags.some(t => ['Unreal Engine','Unreal Engine 5','Unreal Engine 5.2','Blender','Game Development','Blueprint','RPG','Metahuman'].includes(t))) return 'Game';
    if (tags.some(t => ['Discord.js','Node.js','Discord Bot','WhatsApp','WhatsApp Web.js','Puppeteer','Baileys'].includes(t))) return 'Bot';
    if (tags.some(t => ['C#','.NET','Windows API','Speech Recognition','Text-to-Speech'].includes(t))) return 'Desktop';
    return 'Other';
  };

  const filteredProjects = resolvedProjects.filter(p => filter === 'All' || getCategory(p.tags) === filter);

  const currentTotalPage = Math.ceil(filteredProjects.length / projectsPerPage);

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
    const newTotalPage = Math.ceil(filteredProjects.length / projectsPerPage);
    if (currentPage > newTotalPage - 1) {
      setCurrentPage(0);
    }
  }, [projectsPerPage, filteredProjects.length, currentPage]);

  const handleNext = useCallback(() => {
    setDirection('next');
    setCurrentPage((prev) => (prev >= currentTotalPage - 1 ? 0 : prev + 1));
  }, [currentTotalPage]);

  const handlePrev = useCallback(() => {
    setDirection('previous');
    setCurrentPage((prev) => (prev <= 0 ? currentTotalPage - 1 : prev - 1));
  }, [currentTotalPage]);

  const displayedProjects = filteredProjects.slice(
    currentPage * projectsPerPage,
    currentPage * projectsPerPage + projectsPerPage
  );

  return (
    <motion.section
      id="projects"
      className="min-h-[80vh] flex flex-col justify-center items-center px-4 max-w-6xl mx-auto font-inter py-16 md:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-3xl md:text-5xl font-bold text-center text-white mb-6 md:mb-10"
      >
        Projects
      </motion.h2>

      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {(['All','Web','Game','Bot','Desktop'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => { setFilter(cat); setCurrentPage(0); }}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              filter === cat
                ? 'bg-indigo-500 text-white'
                : 'bg-zinc-800/60 border border-white/10 hover:border-indigo-500/40 text-zinc-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

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
            {displayedProjects.map((project) => (
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
      {currentTotalPage > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col items-center gap-3 mt-5 md:mt-8"
        >
          <p className="text-xs md:text-sm text-zinc-400">
            Showing {displayedProjects.length} of {filteredProjects.length} projects
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Show previous project page"
              className="min-h-11 flex items-center gap-2 bg-zinc-800/60 border border-white/10 hover:border-indigo-500/40 text-white px-4 py-2 rounded-full text-sm transition-all hover:bg-zinc-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <FiChevronLeft size={16} />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: currentTotalPage }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentPage ? 'next' : 'previous');
                    setCurrentPage(i);
                  }}
                  aria-label={`Go to projects page ${i + 1}`}
                  className="w-11 h-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <span
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? 'bg-indigo-400 w-6'
                        : 'bg-zinc-600 hover:bg-zinc-500 w-2'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Show next project page"
              className="min-h-11 flex items-center gap-2 bg-zinc-800/60 border border-white/10 hover:border-indigo-500/40 text-white px-4 py-2 rounded-full text-sm transition-all hover:bg-zinc-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <span className="hidden sm:inline">Next</span>
              <FiChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mt-10 w-full max-w-3xl rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-5 md:p-6 text-center"
      >
        <h3 className="text-lg md:text-2xl font-semibold text-white">Like what you see?</h3>
        <p className="mt-2 text-sm md:text-base text-zinc-300">
          Let&apos;s discuss your project goals and how I can help you ship faster.
        </p>
        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#contact"
            className="min-h-11 inline-flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
          >
            Let&apos;s Work Together
          </a>
          <a
            href="https://github.com/GorudenTaiga"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center justify-center bg-zinc-800/60 border border-white/10 hover:border-indigo-500/40 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
          >
            Browse GitHub
          </a>
        </div>
      </motion.div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.section>
  );
}
