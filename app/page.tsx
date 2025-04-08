import Image from "next/image";
import Hero from './pages/Hero';
import About from './pages/About';
import Skills from './pages/Skills';
import Navbar from './components/Navbar';
import ProjectSection from './pages/ProjectSection';
import ContactSection from "./pages/ContactSection";
import Footer from './pages/Footer';
import projects from './components/ProjectLists';
import Head from "next/head";
import Backsound from "./components/Backsound";

export default function Home() {

  return (
    <div>
      <Head>
        <title>Portfolio | Reza Arfana Rafi</title>
        <meta name="description" content="IT Web Developer & Game Developer Portfolio" />
        <meta name="viewport" content="width=device=width, initial-scale=1" />
      </Head>

      {/* <audio autoPlay loop muted={false} className="hidden" id="backsound">
        <source src="/backsound.mp3" type="audio/mpeg"></source>
      </audio> */}
      <div className="h-screen snap-y overflow-y-scroll overflow-hidden hide-scrollbar scroll-smooth snap-mandatory">
        <Navbar />
        <section className="h-screen snap-center">
          <Hero />
        </section>
        <section className="h-screen snap-center">
          <About />
        </section>
        <section className="h-screen snap-center">
          <ProjectSection projects={projects} />
        </section>
        <section className="snap-center">
          <ContactSection />
          <Footer />
        </section>
      </div>
    </div>
  )
}
