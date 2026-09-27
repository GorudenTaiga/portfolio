"use client";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Close, GitHub } from "../components/icons";
import type { Project } from "../types/project";

const FILTERS = ["All", "Web", "Game", "Bot", "Desktop"] as const;
type FilterType = (typeof FILTERS)[number];
const PAGE = 6;
const VT_NAME = "project-media";

type VTDoc = Document & {
  startViewTransition?: (cb: () => void) => { finished: Promise<void> };
};

function getCategory(tags: string[]): FilterType {
  if (tags.some((t) =>
    ["React.js", "Laravel", "Next.js", "TypeScript", "PHP", "Node.js", "Inertia.js", "Tailwind CSS", "shadcn/ui", "Vite"].includes(t)
  )) return "Web";
  if (tags.some((t) =>
    ["Unreal Engine", "Unreal Engine 5", "Unreal Engine 5.2", "Blender", "Blueprint", "RPG", "Metahuman"].includes(t)
  )) return "Game";
  if (tags.some((t) =>
    ["Discord.js", "Discord Bot", "WhatsApp", "WhatsApp Web.js", "Puppeteer", "Baileys"].includes(t)
  )) return "Bot";
  if (tags.some((t) =>
    ["C#", ".NET", "Windows API", "Speech Recognition", "Text-to-Speech"].includes(t)
  )) return "Desktop";
  return "Web"; // default
}

function getProjectTechMeta(tags: string[] = []): { lang: string; dotColor: string; pill: string } {
  const t = tags.map((x) => x.toLowerCase());
  if (t.some((x) => x.includes("unreal") || x.includes("c++"))) {
    return { lang: "C++ / Unreal Engine", dotColor: "#f34b7d", pill: "Game System" };
  }
  if (t.some((x) => x.includes("laravel") || x.includes("php"))) {
    return { lang: "PHP / Laravel", dotColor: "#4F5D95", pill: "Backend Service" };
  }
  if (t.some((x) => x.includes("c#") || x.includes(".net"))) {
    return { lang: "C# / .NET", dotColor: "#239120", pill: "Desktop Utility" };
  }
  if (t.some((x) => x.includes("discord") || x.includes("whatsapp") || x.includes("baileys"))) {
    return { lang: "Node.js / Automation", dotColor: "#25D366", pill: "Automation Bot" };
  }
  if (t.some((x) => x.includes("react") || x.includes("next.js") || x.includes("typescript"))) {
    return { lang: "TypeScript / React", dotColor: "#3178C6", pill: "Full-Stack Web" };
  }
  return { lang: "Software Engineering", dotColor: "var(--accent)", pill: "Architecture" };
}

function isPlaceholderThumb(url?: string | null): boolean {
  if (!url) return true;
  return url.includes("No-Image-Placeholder") || url.includes("wikimedia.org") || url.trim() === "";
}

function ProjectSpecCard({ project }: { project: Project }) {
  const { lang, dotColor, pill } = getProjectTechMeta(project.tags ?? []);
  const cleanPath = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div className="spec-media" aria-hidden="true">
      <div className="spec-bar">
        <span className="spec-lang mono">
          <span className="spec-dot" style={{ backgroundColor: dotColor }} />
          {lang}
        </span>
        <span className="spec-pill mono">{pill}</span>
      </div>
      <div className="spec-body">
        <div className="spec-path mono">system / {cleanPath}</div>
        <p className="spec-desc">{project.sinopsis}</p>
      </div>
      <div className="spec-footer mono">
        {project.tags?.slice(0, 3).map((tag) => (
          <span key={tag} className="spec-tag">#{tag}</span>
        ))}
      </div>
    </div>
  );
}

function Media({
  src,
  alt,
  sizes,
  priority,
  project,
}: {
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  project?: Project;
}) {
  if (isPlaceholderThumb(src)) {
    if (project) return <ProjectSpecCard project={project} />;
    return (
      <div className="spec-media" aria-hidden="true">
        <div className="spec-body">
          <div className="spec-path mono">{alt}</div>
        </div>
      </div>
    );
  }
  return (
    <Image
      src={src!}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover" }}
    />
  );
}

interface ProjectSectionProps {
  projects: Project[];
  portfolioThumbnail?: string;
}

export default function ProjectSection({ projects, portfolioThumbnail }: ProjectSectionProps) {
  const [filter, setFilter] = useState<FilterType>("All");
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeMedia, setActiveMedia] = useState<string>("");
  const [galleryFilter, setGalleryFilter] = useState<"All" | "Videos" | "Screenshots">("All");
  const dialog = useRef<HTMLDialogElement>(null);
  const deepLinkHandled = useRef(false);

  // Inject dynamic thumbnail for the portfolio project
  const resolvedProjects = useMemo(() => {
    if (!portfolioThumbnail) return projects;
    return projects.map((p) =>
      p.id === 0
        ? { ...p, thumbnail: portfolioThumbnail, image: [portfolioThumbnail, ...(p.image ?? []).slice(1)] }
        : p
    );
  }, [projects, portfolioThumbnail]);

  const list =
    filter === "All"
      ? resolvedProjects
      : resolvedProjects.filter((p) => getCategory(p.tags ?? []) === filter);
  const visible = list.slice(0, limit);

  // Gallery items computation
  const rawMediaList = selected?.image?.filter((m) => !isPlaceholderThumb(m)) ?? [];
  const fullMediaList =
    rawMediaList.length > 0
      ? rawMediaList
      : selected?.thumbnail && !isPlaceholderThumb(selected.thumbnail)
      ? [selected.thumbnail]
      : [];

  const videoItems = fullMediaList.filter((m) => m.endsWith(".webm") || m.endsWith(".mp4"));
  const screenshotItems = fullMediaList.filter((m) => !m.endsWith(".webm") && !m.endsWith(".mp4"));

  const filteredMedia =
    galleryFilter === "Videos"
      ? (videoItems.length > 0 ? videoItems : fullMediaList)
      : galleryFilter === "Screenshots"
      ? (screenshotItems.length > 0 ? screenshotItems : fullMediaList)
      : fullMediaList;

  const currentMedia = filteredMedia.includes(activeMedia)
    ? activeMedia
    : filteredMedia[0] || activeMedia || selected?.thumbnail || "";
  const currentIndex = Math.max(0, filteredMedia.indexOf(currentMedia));
  const isVideo = currentMedia.endsWith(".webm") || currentMedia.endsWith(".mp4");

  const handlePrevMedia = () => {
    if (filteredMedia.length <= 1) return;
    const nextIdx = (currentIndex - 1 + filteredMedia.length) % filteredMedia.length;
    setActiveMedia(filteredMedia[nextIdx]);
  };

  const handleNextMedia = () => {
    if (filteredMedia.length <= 1) return;
    const nextIdx = (currentIndex + 1) % filteredMedia.length;
    setActiveMedia(filteredMedia[nextIdx]);
  };

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!selected) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevMedia();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextMedia();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected, currentIndex, filteredMedia]);

  // View Transitions helper
  const vt = () => {
    if (typeof document === "undefined") return null;
    const d = document as VTDoc;
    if (typeof d.startViewTransition !== "function") return null;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return null;
    }
    return d;
  };
  const cardMedia = (id: number | string) =>
    document.querySelector<HTMLElement>(`[data-id="${id}"] .card-media`);
  const setUrl = (id?: number | string) =>
    history.replaceState(
      history.state,
      "",
      id ? `?project=${id}#projects` : `${location.pathname}#projects`
    );

  // Open modal with optional View Transition
  const open = (p: Project) => {
    const d = vt();
    const media = cardMedia(p.id);
    const show = () => {
      flushSync(() => {
        setSelected(p);
        setGalleryFilter("All");
        const list = (p.image ?? []).filter((m) => !isPlaceholderThumb(m));
        setActiveMedia(list[0] || p.thumbnail || "");
      });
      dialog.current?.showModal();
    };
    setUrl(p.id);
    if (!d || !media) return show();
    media.style.viewTransitionName = VT_NAME;
    document.documentElement.classList.add("vt-running");
    d.startViewTransition!(() => {
      media.style.viewTransitionName = "";
      show();
    }).finished.finally(() =>
      document.documentElement.classList.remove("vt-running")
    );
  };

  // Close modal with optional View Transition
  const close = () => {
    if (!selected) return;
    const d = vt();
    const media = cardMedia(selected.id);
    setUrl();
    if (!d || !media) return dialog.current?.close();
    document.documentElement.classList.add("vt-running");
    d.startViewTransition!(() => {
      dialog.current?.close();
      media.style.viewTransitionName = VT_NAME;
    }).finished.finally(() => {
      media.style.viewTransitionName = "";
      document.documentElement.classList.remove("vt-running");
    });
  };

  // Pause background sound when modal video is playing
  useEffect(() => {
    if (!selected) return;
    const backsound = document.querySelector("audio");
    const video = dialog.current?.querySelector("video");
    if (!backsound || !video) return;

    const handlePlay = () => backsound.pause();
    const handlePause = () => backsound.play().catch(() => {});

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handlePause);
    };
  }, [selected, currentMedia]);

  // Deep-link: ?project=id opens the dialog on load
  useEffect(() => {
    if (deepLinkHandled.current) return;
    const rawId = new URLSearchParams(location.search).get("project");
    if (!rawId) return;
    const p = resolvedProjects.find((x) => String(x.id) === rawId);
    if (p) {
      deepLinkHandled.current = true;
      setSelected(p);
      setGalleryFilter("All");
      const list = (p.image ?? []).filter((m) => !isPlaceholderThumb(m));
      setActiveMedia(list[0] || p.thumbnail || "");
      dialog.current?.showModal();
    }
  }, [resolvedProjects]);

  // Spotlight border follows the pointer
  const spot = (e: React.PointerEvent) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>(".card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${e.clientX - r.left}px`);
    card.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-head row" data-reveal>
          <div>
            <span className="eyebrow">Work</span>
            <h2 id="projects-title" className="h2">
              Selected Projects
            </h2>
          </div>
          <a
            href="https://github.com/GorudenTaiga"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost hide-mobile"
          >
            <GitHub width={16} height={16} /> GitHub
          </a>
        </div>

        {/* Filter pills */}
        <div className="filters" role="group" aria-label="Filter projects" data-reveal>
          {FILTERS.map((f) => {
            const n =
              f === "All"
                ? resolvedProjects.length
                : resolvedProjects.filter((p) => getCategory(p.tags ?? []) === f).length;
            return (
              <button
                key={f}
                className="filter"
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  setLimit(PAGE);
                }}
              >
                {f} <span className="mono">{n}</span>
              </button>
            );
          })}
        </div>

        {/* Bento grid with spotlight effect */}
        {visible.length === 0 ? (
          <p className="state">No {filter.toLowerCase()} projects yet. Check back soon.</p>
        ) : (
          <ul className="bento" onPointerMove={spot} key={filter}>
            {visible.map((p, i) => (
              <li
                key={p.id}
                data-id={p.id}
                className={`card${i === 0 ? " featured" : ""}`}
                data-reveal
                style={{ "--i": i % PAGE } as React.CSSProperties}
              >
                <button
                  className="card-hit"
                  onClick={() => open(p)}
                  aria-haspopup="dialog"
                  aria-label={`Open project: ${p.title}`}
                >
                  <span className="card-media">
                    <Media
                      src={p.thumbnail ?? null}
                      alt={`${p.title} preview`}
                      sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                      priority={i === 0}
                      project={p}
                    />
                  </span>
                  <span className="card-body">
                    <span className="card-title">
                      {p.title}
                      <ArrowRight className="card-arrow" width={18} height={18} />
                    </span>
                    <span className="card-summary">{p.sinopsis}</span>
                    <span className="card-meta mono">
                      {formatDate(p.date)}
                      {p.tags?.length > 0 && ` · ${p.tags.slice(0, 3).join(", ")}`}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Show more */}
        {list.length > limit && (
          <div className="more">
            <button
              className="btn btn-ghost"
              onClick={() => setLimit((l) => l + PAGE)}
            >
              Show more{" "}
              <span className="mono muted">{list.length - limit} left</span>
            </button>
          </div>
        )}
      </div>

      {/* Project detail dialog */}
      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="modal-title"
        onCancel={(e) => { e.preventDefault(); close(); }}
        onClick={(e) => e.target === e.currentTarget && close()}
        onClose={() => {
          setSelected(null);
          setGalleryFilter("All");
        }}
      >
        {selected && (
          <article className="modal-inner">
            <button className="modal-close" onClick={close} aria-label="Close project dossier">
              <Close width={18} height={18} />
            </button>

            {/* Dossier Top Bar */}
            <div className="modal-dossier-bar mono">
              <span className="accent" style={{ fontSize: "0.72rem", letterSpacing: "0.08em" }}>
                PROJECT DOSSIER // {getCategory(selected.tags ?? []).toUpperCase()}
              </span>
              <span className="muted" style={{ fontSize: "0.72rem", marginRight: "2.5rem" }}>
                ID #{String(selected.id).slice(0, 8).toUpperCase()} · {formatDate(selected.date)}
              </span>
            </div>

            <div className="modal-media">
              {isVideo ? (
                <video
                  key={currentMedia}
                  controls
                  autoPlay
                  loop
                  playsInline
                  src={currentMedia}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Media
                  src={currentMedia || selected.thumbnail || null}
                  alt={`${selected.title} preview`}
                  sizes="(max-width: 900px) 100vw, 860px"
                  project={selected}
                />
              )}

              {/* Floating Media HUD */}
              <div className="modal-media-hud">
                <span className={`media-hud-pill ${isVideo ? "video-pill" : ""}`}>
                  {isVideo ? "VIDEO CINEMATIC" : "STILL PREVIEW"}
                </span>
                {filteredMedia.length > 1 && (
                  <span className="media-hud-counter">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(filteredMedia.length).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* Prev / Next navigation buttons on media viewport */}
              {filteredMedia.length > 1 && (
                <>
                  <button
                    type="button"
                    className="media-nav-btn prev"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevMedia();
                    }}
                    aria-label="Previous preview"
                  >
                    <ChevronLeft width={18} height={18} />
                  </button>
                  <button
                    type="button"
                    className="media-nav-btn next"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextMedia();
                    }}
                    aria-label="Next preview"
                  >
                    <ChevronRight width={18} height={18} />
                  </button>
                </>
              )}
            </div>

            {/* Media category filter tabs when multiple types exist and > 3 items */}
            {fullMediaList.length > 3 && videoItems.length > 0 && screenshotItems.length > 0 && (
              <div className="media-filter-row" role="tablist" aria-label="Media category filter">
                <button
                  type="button"
                  className={`media-filter-btn ${galleryFilter === "All" ? "active" : ""}`}
                  onClick={() => setGalleryFilter("All")}
                >
                  All ({fullMediaList.length})
                </button>
                <button
                  type="button"
                  className={`media-filter-btn ${galleryFilter === "Videos" ? "active" : ""}`}
                  onClick={() => {
                    setGalleryFilter("Videos");
                    if (videoItems[0]) setActiveMedia(videoItems[0]);
                  }}
                >
                  Cinematics ({videoItems.length})
                </button>
                <button
                  type="button"
                  className={`media-filter-btn ${galleryFilter === "Screenshots" ? "active" : ""}`}
                  onClick={() => {
                    setGalleryFilter("Screenshots");
                    if (screenshotItems[0]) setActiveMedia(screenshotItems[0]);
                  }}
                >
                  Screenshots ({screenshotItems.length})
                </button>
              </div>
            )}

            {/* Media thumbnail strip if project has multiple images/videos */}
            {filteredMedia.length > 1 && (
              <div className="modal-thumbs" role="tablist" aria-label="Media gallery thumbnails">
                {filteredMedia.map((mediaUrl, idx) => {
                  const isItemVideo = mediaUrl.endsWith(".webm") || mediaUrl.endsWith(".mp4");
                  const isActive = currentMedia === mediaUrl;
                  return (
                    <button
                      key={mediaUrl}
                      type="button"
                      className={`thumb-btn ${isActive ? "active" : ""}`}
                      onClick={() => setActiveMedia(mediaUrl)}
                      aria-label={`Preview media item ${idx + 1} for ${selected.title}`}
                      aria-selected={isActive}
                    >
                      {isItemVideo ? (
                        <>
                          <video src={mediaUrl} preload="metadata" />
                          <span className="thumb-play-badge" aria-hidden="true">▶</span>
                        </>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={mediaUrl} alt={`${selected.title} thumbnail ${idx + 1}`} loading="lazy" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="modal-body">
              <div>
                <h3 id="modal-title" className="h2" style={{ marginTop: "0.25rem" }}>
                  {selected.title}
                </h3>
              </div>
              <p className="lede">{selected.sinopsis}</p>
              {selected.description && selected.description !== selected.sinopsis && (
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
                  {selected.description}
                </p>
              )}
              {selected.impact && (
                <div className="modal-impact">
                  <span className="mono" style={{ fontSize: "0.72rem", color: "var(--accent)", display: "block", marginBottom: "0.25rem", letterSpacing: "0.06em" }}>
                    VERIFIED PRODUCTION IMPACT
                  </span>
                  <p>{selected.impact}</p>
                </div>
              )}
              {selected.tags?.length > 0 && (
                <ul className="tags" aria-label="Tech stack">
                  {selected.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              )}
              <div className="cta-row" style={{ marginTop: "0.5rem" }}>
                {selected.liveUrl && (
                  <a className="btn btn-primary" href={selected.liveUrl} target="_blank" rel="noreferrer">
                    Live Demo <ArrowUpRight width={18} height={18} />
                  </a>
                )}
                <a
                  className="btn btn-ghost"
                  href={selected.repoUrl || "https://github.com/GorudenTaiga"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHub width={18} height={18} /> {selected.repoUrl ? "Source Code" : "GitHub Repository"}
                </a>
              </div>
            </div>
          </article>
        )}
      </dialog>
    </section>
  );
}
