'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from './ErrorBoundary';
import Hero from '../pages/Hero';
import Navbar from './Navbar';
import RevealObserver from './RevealObserver';
import type { Project } from '../types/project';

// Dynamic imports — keeps initial bundle small; RevealObserver MutationObserver
// picks up [data-reveal] elements as each section hydrates.
const sectionFallback = <div style={{ minHeight: '80vh' }} />;

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
      <RevealObserver>
        <Navbar />
        <Hero displayName={displayName} />
        <About isPrivate={isPrivate} />
        <Skills />
        <ProjectSection projects={projects} portfolioThumbnail={portfolioThumbnail} />
        <ContactSection />
        <Footer displayName={displayName} isPrivate={isPrivate} />
      </RevealObserver>
    </ErrorBoundary>
  );
}


