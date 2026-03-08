'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';

type ModalProps = {
  project: any;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ModalProps) {
  const [activeMedia, setActiveMedia] = useState<string>('');
  const [isMediaPlaying, setIsMediaPlaying] = useState(false);

  const fallbackThumbnail =
    typeof window !== 'undefined' &&
    window.location.hostname.includes('rezaar')
      ? 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_reza_thumbnail.webp'
      : 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_gorudentaiga_thumbnail.webp';

  useEffect(() => {
    if (project && project.image && project.image.length > 0) {
      setActiveMedia(project.image[0]);
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
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-zinc-900 border border-white/10 text-white rounded-xl shadow-2xl p-5 md:p-6 max-w-lg w-full relative max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
              onClick={onClose}
            >
              <FiX size={18} />
            </button>

            {/* Main Media */}
            <div className="mb-3 rounded-lg overflow-hidden">
              {activeMedia && activeMedia.endsWith('.webm') ? (
                <video
                  key={activeMedia}
                  controls
                  autoPlay
                  loop
                  src={activeMedia}
                  onPlay={() => setIsMediaPlaying(true)}
                  onPause={() => setIsMediaPlaying(false)}
                  onEnded={() => setIsMediaPlaying(false)}
                  className="w-full h-48 md:h-60 object-cover rounded-lg"
                />
              ) : (
                <Image
                  key={activeMedia}
                  src={activeMedia ? activeMedia : fallbackThumbnail}
                  alt={project.title}
                  width={426}
                  height={240}
                  className="w-full h-48 md:h-60 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Media Thumbnail Strip */}
            {project.image && project.image.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 mb-4 hide-scrollbar">
                {project.image.map((item: string, index: number) => (
                  <div
                    key={index}
                    onClick={() => setActiveMedia(item)}
                    className={`shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      activeMedia === item
                        ? 'border-indigo-400 scale-105'
                        : 'border-transparent hover:border-zinc-600'
                    }`}
                  >
                    {item.endsWith('.webm') ? (
                      <video
                        src={item}
                        preload="metadata"
                        className="w-16 h-11 md:w-20 md:h-14 object-cover"
                      />
                    ) : (
                      <Image
                        src={item}
                        alt={`${project.title} - ${index + 1}`}
                        width={80}
                        height={56}
                        className="w-16 h-11 md:w-20 md:h-14 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Project Info */}
            <h2 className="text-lg md:text-xl font-bold">{project.title}</h2>
            <p className="text-xs md:text-sm text-zinc-300 mt-2 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            {(project.liveUrl || project.repoUrl) && (
              <div className="flex gap-3 mt-5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FiExternalLink size={14} />
                    View Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-800 border border-white/10 hover:border-indigo-500/40 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    <FiGithub size={14} />
                    Repository
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}