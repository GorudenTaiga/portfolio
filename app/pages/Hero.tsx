"use client";
import HeroPanel from "../components/HeroPanel";
import { ArrowRight } from "../components/icons";

interface HeroProps {
  displayName?: string;
}

/** Hero section — two-column grid (7:5), left=copy, right=animated code panel.
 *  Staggered .load animation via CSS --i custom property.
 *  displayName switches between "Reza Arfana Rafi" (private) and "GorudenTaiga" (public).
 */
export default function Hero({ displayName = "GorudenTaiga" }: HeroProps) {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        {/* Left — text copy */}
        <div className="hero-copy">
          <p className="eyebrow load" style={{ "--i": 0 } as React.CSSProperties}>
            Full-Stack Systems &amp; Game Programming
          </p>

          <h1
            id="hero-title"
            className="display load"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            I&apos;m <span className="accent">{displayName}</span>
          </h1>

          <p
            className="lede load"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            Software developer based in Yogyakarta. Specializing in high-throughput
            Laravel backends, reactive Next.js applications, and native C++ gameplay systems
            in Unreal Engine 5.
          </p>

          <div
            className="cta-row load"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <a href="#projects" className="btn btn-primary">
              View projects <ArrowRight width={18} height={18} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get in touch
            </a>
          </div>

          <p
            className="meta-row load"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <span className="status-dot" aria-hidden="true" />
            <span>Yogyakarta, ID</span>
            <span aria-hidden="true">·</span>
            <span>Available for projects & collaboration</span>
          </p>
        </div>

        {/* Right — animated code editor panel */}
        <div
          className="hero-visual load"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <HeroPanel />
        </div>
      </div>
    </section>
  );
}
