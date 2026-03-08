import { headers } from 'next/headers';
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Navbar from './components/Navbar';
import ProjectSection from './pages/ProjectSection';
import ContactSection from "./pages/ContactSection";
import Footer from './pages/Footer';
import projects from './components/ProjectLists';

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get('host') ?? '';
  const isReza = host.includes('rezaar');

  const displayName = isReza ? 'Reza Arfana Rafi' : 'GorudenTaiga';
  const portfolioThumbnail = isReza
    ? 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_reza_thumbnail.webp'
    : 'https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/images/portofolio/portfolio_gorudentaiga_thumbnail.webp';

  return (
    <div className="h-screen snap-y overflow-y-scroll overflow-hidden hide-scrollbar scroll-smooth snap-mandatory">
      <Navbar />
      <section className="h-screen snap-center">
        <Hero displayName={displayName} />
      </section>
      <section className="h-screen snap-center">
        <About />
      </section>
      <section className="h-screen snap-center">
        <Skills />
      </section>
      <section className="h-screen snap-center">
        <ProjectSection projects={projects} portfolioThumbnail={portfolioThumbnail} />
      </section>
      <section className="snap-center">
        <ContactSection />
        <Footer displayName={displayName} isReza={isReza} />
      </section>
    </div>
  )
}
