"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Close, Menu, Moon, Sun } from "./icons";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Stack" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

/** Floating pill nav with:
 *  - IntersectionObserver scroll-spy
 *  - CSS clip-path sliding active indicator (no JS layout per frame)
 *  - Dark/light theme toggle with localStorage persistence
 *  - Native <dialog> mobile sheet
 */
export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const listRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLUListElement>(null);
  const sheetRef = useRef<HTMLDialogElement>(null);

  // Read initial theme from document (set by FOUC script in layout.tsx)
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  // Scroll-spy: section crossing the upper third of the viewport becomes active
  useEffect(() => {
    const observed = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -50% 0px" }
    );

    const bind = () => {
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          io.observe(el);
          observed.add(el);
        }
      });
    };

    bind();

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (y < 80) {
        setActive("hero");
        return;
      }
      if (window.innerHeight + y >= document.documentElement.scrollHeight - 50) {
        setActive("contact");
        return;
      }
      bind();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // MutationObserver to automatically bind any dynamically mounted sections
    const mo = new MutationObserver(() => bind());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Sliding pill: clip the highlighted overlay copy to the active link bounds
  useLayoutEffect(() => {
    const list = listRef.current;
    const overlay = overlayRef.current;
    const link = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !overlay || !link) return;
    const left = link.offsetLeft;
    const right = list.offsetWidth - (left + link.offsetWidth);
    overlay.style.clipPath = `inset(0 ${right}px 0 ${left}px round 999px)`;
  }, [active]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-fade");
    root.dataset.theme = next;
    setTimeout(() => root.classList.remove("theme-fade"), 250);
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  };

  const closeSheet = () => sheetRef.current?.close();

  const navigateTo = (id: string) => {
    setActive(id);
    closeSheet();
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  const monogram = "GT";

  return (
    <>
      <header className={`nav-wrap${scrolled ? " is-scrolled" : ""}`}>
        <nav className="nav" aria-label="Primary">
          <a href="#hero" className="monogram" aria-label="GorudenTaiga — back to top">
            {monogram}
          </a>

          {/* Desktop links with sliding active indicator */}
          <div className="nav-links">
            <ul ref={listRef}>
              {LINKS.map((l) => (
                <li key={l.id} data-id={l.id}>
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? "true" : "false"}
                    onClick={() => setActive(l.id)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            {/* Highlighted copy — clipped to active link via clip-path */}
            <ul ref={overlayRef} className="nav-overlay" aria-hidden="true">
              {LINKS.map((l) => (
                <li key={l.id}><span>{l.label}</span></li>
              ))}
            </ul>
          </div>

          <div className="nav-actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <a href="#contact" className="btn btn-primary btn-sm hide-mobile">
              Get in touch
            </a>
            <button
              className="icon-btn show-mobile"
              onClick={() => sheetRef.current?.showModal()}
              aria-label="Open menu"
            >
              <Menu />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet — native <dialog> for focus-trap + backdrop */}
      <dialog
        ref={sheetRef}
        className="sheet"
        aria-label="Menu"
        onClick={(e) => e.target === e.currentTarget && closeSheet()}
      >
        <div className="sheet-inner">
          <div className="sheet-head">
            <span className="monogram">{monogram}</span>
            <button className="icon-btn" onClick={closeSheet} aria-label="Close menu" autoFocus>
              <Close />
            </button>
          </div>
          <ul>
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ "--i": i } as React.CSSProperties}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(l.id);
                  }}
                  aria-current={active === l.id ? "true" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              navigateTo("contact");
            }}
            className="btn btn-primary"
          >
            Get in touch
          </a>
        </div>
      </dialog>
    </>
  );
}
