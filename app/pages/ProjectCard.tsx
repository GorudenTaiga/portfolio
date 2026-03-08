'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type ProjectProps = {
  project: {
    id: number;
    image: string[];
    thumbnail: string;
    title: string;
    sinopsis: string;
    description: string;
    tags: string[];
    techIcons: React.ReactNode[];
    date: string;
  };
  onClick: () => void;
};

export default function ProjectCard({ project, onClick }: ProjectProps) {
  return (
    <motion.div
      className="bg-zinc-800/60 backdrop-blur-sm border border-white/10 hover:border-indigo-500/40 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all group"
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={426}
          height={240}
          className="w-full h-36 md:h-40 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base md:text-lg font-semibold text-white mb-1">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm text-zinc-400 line-clamp-1 mb-3">
          {project.sinopsis}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.techIcons.slice(0, 5).map((icon, index) => (
              <span
                key={index}
                className="text-indigo-400 text-lg group-hover:text-indigo-300 transition-colors"
              >
                {icon}
              </span>
            ))}
          </div>
          <p className="text-[10px] md:text-xs text-zinc-500 shrink-0 ml-2">
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}