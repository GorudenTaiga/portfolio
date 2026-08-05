'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '../types/project';
import { DynamicIcon } from '../lib/icon-resolver';

type ProjectProps = {
  project: Project;
  onClick: () => void;
};

export default function ProjectCard({ project, onClick }: ProjectProps) {
  const isPortfolio = project.tags?.some((tag) =>
    tag.toLowerCase().includes('portfolio')
  );

  const fallbackThumbnail =
    isPortfolio && typeof window !== 'undefined'
      ? window.location.hostname.includes(process.env.NEXT_PUBLIC_PRIVATEURL || 'rezaar')
        ? 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_reza_thumbnail.webp'
        : 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_gorudentaiga_thumbnail.webp'
      : isPortfolio
        ? 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_gorudentaiga_thumbnail.webp'
        : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

  return (
    <motion.button
      type="button"
      aria-label={`Open project details: ${project.title}`}
      className="w-full text-left bg-zinc-800/60 backdrop-blur-sm border border-white/10 hover:border-indigo-500/40 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <Image
          src={project.thumbnail || fallbackThumbnail}
          alt={project.title}
          width={426}
          height={240}
          sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
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
        <p className="text-[11px] md:text-xs text-zinc-300/90 line-clamp-2 mb-3">
          {project.impact ?? 'Project impact details available in the full case view.'}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {project.techIcons.slice(0, 5).map((icon, index) => (
              <span
                key={index}
                className="text-indigo-400 text-lg group-hover:text-indigo-300 transition-colors"
              >
                <DynamicIcon name={String(icon)} />
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
    </motion.button>
  );
}
