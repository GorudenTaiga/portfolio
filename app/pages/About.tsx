"use client";
import { Download } from "../components/icons";

const STATS = [
  { label: "Production experience", value: "4+ years" },
  { label: "Core backend scale", value: "6M+ lines" },
  { label: "Primary game engine", value: "Unreal 5" },
];

function WebVisual() {
  return (
    <div className="viz viz-web" aria-hidden="true">
      <div className="viz-bar">
        <span className="viz-breadcrumb">
          <span>HTTP</span>
          <span className="muted">/</span>
          <span>api.service.local/v1/system</span>
        </span>
        <span className="viz-badge">200 OK</span>
      </div>
      <div className="viz-code">
        <div className="viz-code-line"><span className="kw">GET</span> <span className="val">/api/v1/health</span></div>
        <div className="viz-code-line"><span className="str">&quot;status&quot;:</span> <span className="val">&quot;healthy&quot;</span></div>
        <div className="viz-code-line"><span className="str">&quot;stack&quot;:</span> <span className="val">&quot;Laravel 11 · Next.js 16&quot;</span></div>
        <div className="viz-code-line"><span className="str">&quot;database&quot;:</span> <span className="val">&quot;PostgreSQL · Supabase&quot;</span></div>
        <div className="viz-code-line"><span className="str">&quot;runtime&quot;:</span> <span className="val">&quot;Docker Containerized&quot;</span></div>
      </div>
    </div>
  );
}

function GameVisual() {
  return (
    <div className="viz viz-game" aria-hidden="true">
      <div className="viz-bar">
        <span className="viz-breadcrumb">
          <span>Source</span>
          <span className="muted">&gt;</span>
          <span>Player</span>
          <span className="muted">&gt;</span>
          <span>TaigaCharacter.h</span>
        </span>
        <span className="viz-badge" style={{ color: "var(--accent)", background: "color-mix(in srgb, var(--accent) 14%, transparent)" }}>
          C++20
        </span>
      </div>
      <div className="viz-code">
        <div className="viz-code-line"><span className="kw">#pragma once</span></div>
        <div className="viz-code-line"><span className="kw">UCLASS</span>(config=Game)</div>
        <div className="viz-code-line"><span className="kw">class</span> <span className="val">ATaigaCharacter</span> : <span className="kw">public</span> ACharacter &#123;</div>
        <div className="viz-code-line">&nbsp;&nbsp;<span className="kw">GENERATED_BODY</span>()</div>
        <div className="viz-code-line">&nbsp;&nbsp;<span className="str">UPROPERTY</span>(BlueprintReadOnly)</div>
        <div className="viz-code-line">&nbsp;&nbsp;<span className="val">UCombatComponent*</span> CombatSys;</div>
        <div className="viz-code-line">&#125;;</div>
      </div>
    </div>
  );
}

interface AboutProps {
  isPrivate?: boolean;
}

export default function About({ isPrivate = false }: AboutProps) {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      {/* Top — eyebrow + lede + stats */}
      <div className="container about-grid">
        <p className="eyebrow sticky-label">About</p>
        <div>
          <h2 id="about-title" className="sr-only">About</h2>
          <p className="about-lede" data-reveal>
            Software engineer with 4+ years of production experience bridging two disciplines:
            large-scale backend architecture and native real-time game development.
            Focused on database query efficiency, clean domain boundaries, and high-performance gameplay systems.
          </p>

          <dl className="stats" data-reveal>
            {STATS.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          {/* Resume download — shown only on private (rezaar) domain */}
          {isPrivate && (
            <div style={{ marginTop: "2rem" }} data-reveal>
              <a
                href="https://rqbcrttxfhxmcaxiropg.supabase.co/storage/v1/object/public/storage/Reza%20Arfana%20Rafi%20-%20Backend%20Developer%20-%20Glints%20TapLoker.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Download width={16} height={16} />
                Download Resume
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Dual-Pillar Engineering Architecture */}
      <div className="container dual-pillars" data-reveal>
        {/* Pillar 01: Web & Distributed Systems */}
        <article className="pillar-card">
          <div className="pillar-header">
            <span className="pillar-badge mono">PILLAR 01 // ARCHITECTURE</span>
            <h3 className="pillar-title">Web &amp; Distributed Architecture</h3>
            <p className="pillar-desc">
              Designing normalized PostgreSQL schemas, high-throughput queue workers, and clean REST APIs with Laravel and Docker, coupled with reactive Next.js client applications.
            </p>
          </div>
          <div className="pillar-visual">
            <WebVisual />
          </div>
          <ul className="tags" aria-label="Web Architecture tools">
            <li>Laravel 11</li>
            <li>Next.js 16</li>
            <li>PostgreSQL</li>
            <li>Docker</li>
            <li>Supabase</li>
          </ul>
        </article>

        {/* Pillar 02: Game Systems & C++ */}
        <article className="pillar-card">
          <div className="pillar-header">
            <span className="pillar-badge mono">PILLAR 02 // ENGINE</span>
            <h3 className="pillar-title">Real-Time Gameplay &amp; C++ Systems</h3>
            <p className="pillar-desc">
              Architecting character state machines, custom actor components, and combat systems in Unreal Engine 5 using native C++, along with interactive simulation environments in Unity.
            </p>
          </div>
          <div className="pillar-visual">
            <GameVisual />
          </div>
          <ul className="tags" aria-label="Game Development tools">
            <li>Unreal Engine 5</li>
            <li>Native C++</li>
            <li>Blueprints</li>
            <li>GAS Framework</li>
            <li>Unity 3D</li>
          </ul>
        </article>
      </div>
    </section>
  );
}