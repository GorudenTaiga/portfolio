"use client";
import { useState, useEffect, useRef } from "react";
import { Close } from "../components/icons";
import { fetchSkills } from "../lib/supabase";

interface Skill {
  id: number;
  title: string;
  icon: string;
  date: string;
  description: string;
  category?: string;
}

const DEFAULT_CATEGORIES: Record<string, string[]> = {
  "Frontend Architecture": ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  "Backend & Systems":     ["Laravel", "PHP", "Node.js", "MySQL", "Supabase"],
  "Game Engines & C++":    ["Unreal Engine 5", "Unity", "C++", "C#", "Blueprints"],
  "DevOps & Workflow":     ["Docker", "Git", "GitHub", "Vercel"],
};

const SKILL_CONTEXTS: Record<string, string> = {
  "JavaScript": "Web & Browser Runtime",
  "React.js": "Component Architecture",
  "Next.js": "Full-Stack SSR & App Router",
  "TypeScript": "Strict Type Systems",
  "Tailwind CSS": "Design Tokens & Layout",
  "PHP": "Server-Side Core",
  "Laravel": "API Architecture & Queue Workers",
  "Node.js": "Automation & Backend Services",
  "MySQL": "Relational Data Modeling",
  "Supabase": "PostgreSQL & Auth Integration",
  "Unreal Engine 5": "Gameplay Ability Framework",
  "Unreal Engine": "Gameplay Ability Framework",
  "C++": "Low-Level Systems & Memory",
  "C#": "Gameplay Scripting & Tools",
  "Unity": "Real-Time Simulations",
  "Blueprints": "Rapid Mechanic Prototyping",
  "Docker": "Containerization & Parity",
  "Git": "Distributed Version Control",
  "GitHub": "Automated Workflows & CI",
  "Vercel": "Edge & Serverless Deployment",
};

function inferCategory(title: string): string {
  const t = title.toLowerCase();
  for (const [cat, names] of Object.entries(DEFAULT_CATEGORIES)) {
    if (names.some((n) => t.includes(n.toLowerCase()))) return cat;
  }
  return "Engineering Stack";
}

function getSkillContext(title: string): string {
  for (const [key, ctx] of Object.entries(SKILL_CONTEXTS)) {
    if (title.toLowerCase().includes(key.toLowerCase())) return ctx;
  }
  return "Core Engineering Competency";
}

function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const k = String(item[key] ?? "Engineering Stack");
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/** Redesigned Skill Modal: Engineering Field Note / Log Dossier */
function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const startDate = new Date(skill.date);
  const startYear = startDate.getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsActive = Math.max(1, currentYear - startYear);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="skill-modal-title"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-inner">
        <button className="modal-close" onClick={onClose} aria-label="Close note">
          <Close width={18} height={18} />
        </button>

        <div className="modal-log-top">
          <span className="modal-log-badge mono">
            FIELD LOG // #{String(skill.id).slice(0, 8).toUpperCase()}
          </span>
          <span className="mono muted" style={{ fontSize: "0.72rem" }}>
            {skill.category ?? inferCategory(skill.title)}
          </span>
        </div>

        <div className="modal-log-content">
          <div className="modal-log-head">
            <h3 id="skill-modal-title" className="h2">
              {skill.title}
            </h3>
            <div className="modal-log-meta-pills mono">
              <span className="modal-log-pill">
                Adopted {startDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
              <span className="modal-log-pill">
                ~{yearsActive} {yearsActive === 1 ? "year" : "years"} active
              </span>
              <span className="modal-log-pill" style={{ color: "var(--accent)", borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)" }}>
                {getSkillContext(skill.title)}
              </span>
            </div>
          </div>

          <div className="modal-log-quote">
            <p>{skill.description}</p>
          </div>

          <div className="modal-log-footer mono">
            <span>ARCHIVED DEVELOPER DISPATCH</span>
            <span>STATUS: ACTIVE TOOL</span>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function SkillsSkeleton() {
  return (
    <section id="skills" className="section" aria-label="Skills loading">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Stack</span>
          <div className="sk w60" />
        </div>
        <div className="journey-groups">
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="sk sk-label" style={{ marginBottom: "1rem" }} />
              <div className="journey-grid">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="sk" style={{ height: 100, borderRadius: "var(--r-sm)" }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Skill | null>(null);

  useEffect(() => {
    fetchSkills()
      .then((data) => setSkills(data as Skill[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <SkillsSkeleton />;

  const grouped = groupBy(
    skills.map((s) => ({ ...s, category: s.category ?? inferCategory(s.title) })),
    "category"
  );

  return (
    <>
      <section id="skills" className="section" aria-labelledby="skills-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="eyebrow">Stack &amp; Experience</span>
            <h2 id="skills-title" className="h2">
              Engineering Tools &amp; Technologies
            </h2>
            <p className="lede">
              Practical toolkit refined through production backends, interactive web interfaces, and native game engines.
            </p>
          </div>

          <div className="journey-groups" data-reveal>
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category} className="journey-group">
                <div className="journey-group-head">
                  <span className="eyebrow">{category}</span>
                  <span className="mono muted" style={{ fontSize: "0.72rem" }}>
                    {items.length} {items.length === 1 ? "tool" : "tools"}
                  </span>
                </div>
                <div className="journey-grid">
                  {items.map((skill) => (
                    <button
                      key={skill.id}
                      className="journey-tile"
                      onClick={() => setSelected(skill)}
                      aria-haspopup="dialog"
                      aria-label={`Open developer log for ${skill.title}`}
                    >
                      <div className="tile-top">
                        <span className="tile-name">{skill.title}</span>
                        <span className="tile-year mono">
                          Since {new Date(skill.date).getFullYear()}
                        </span>
                      </div>
                      <div className="tile-role mono">
                        {getSkillContext(skill.title)}
                      </div>
                      <div className="tile-footer">
                        <span className="tile-affordance mono">Log →</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <SkillModal skill={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}