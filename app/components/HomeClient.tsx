'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from './ErrorBoundary';
import Hero from '../pages/Hero';
import Navbar from './Navbar';
import type { Project } from '../types/project';

// ponytail: ssr:true keeps HTML in initial response, no layout shift.
// Fallback divs match section min-height so CLS stays zero.
const sectionFallback = <div className="min-h-[80vh]" />;

const About = dynamic(() => import('../pages/About'), { loading: () => sectionFallback });
const Skills = dynamic(() => import('../pages/Skills'), { loading: () => sectionFallback });
const ProjectSection = dynamic(() => import('../pages/ProjectSection'), { loading: () => sectionFallback });
const ContactSection = dynamic(() => import('../pages/ContactSection'), { loading: () => sectionFallback });
const Footer = dynamic(() => import('../pages/Footer'), { loading: () => sectionFallback });

interface HomeClientProps {
  displayName: string | undefined;
  portfolioThumbnail: string;
  isPrivate?: boolean;
  projects: Project[];
}

export default function HomeClient({ displayName, portfolioThumbnail, isPrivate = false, projects }: HomeClientProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full overflow-hidden">
        <Navbar />
        <Hero displayName={displayName} />
        <About />
        <Skills />
        <ProjectSection projects={projects} portfolioThumbnail={portfolioThumbnail} />
        <ContactSection />
        <Footer displayName={displayName} isPrivate={isPrivate} />
      </div>
    </ErrorBoundary>
  );
}

