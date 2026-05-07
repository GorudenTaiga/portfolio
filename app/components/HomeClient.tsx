'use client';

import ErrorBoundary from './ErrorBoundary';
import Hero from '../pages/Hero';
import About from '../pages/About';
import Skills from '../pages/Skills';
import Navbar from './Navbar';
import ProjectSection from '../pages/ProjectSection';
import ContactSection from '../pages/ContactSection';
import Footer from '../pages/Footer';
import type { Project } from '../types/project';

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

