'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from './ErrorBoundary';
import Hero from '../pages/Hero';
import Navbar from './Navbar';
import type { Project } from '../types/project';

const About = dynamic(() => import('../pages/About'), { ssr: false });
const Skills = dynamic(() => import('../pages/Skills'), { ssr: false });
const ProjectSection = dynamic(() => import('../pages/ProjectSection'), { ssr: false });
const ContactSection = dynamic(() => import('../pages/ContactSection'), { ssr: false });
const Footer = dynamic(() => import('../pages/Footer'), { ssr: false });

interface HomeClientProps {
  displayName: string | undefined;
  portfolioThumbnail: string;
  isPrivate?: boolean;
  projects: Project[];
}

export default function HomeClient({ displayName, portfolioThumbnail, isPrivate = false, projects }: HomeClientProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
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

