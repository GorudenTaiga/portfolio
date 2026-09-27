"use client";
import { useEffect } from "react";

/** Global IntersectionObserver that watches the entire document for [data-reveal] elements.
 *  When a [data-reveal] element enters the viewport, it receives the "in" class,
 *  which triggers the CSS reveal transition defined in globals.css.
 *  Also adds class "js" to <html> so the reveal CSS can activate.
 *
 *  Usage: mount once near the root of your app (e.g., in HomeClient).
 */
export default function RevealObserver({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("js");

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target); // fire once
          }
        }),
      { threshold: 0.08 }
    );

    const observe = () => {
      document.querySelectorAll("[data-reveal]:not(.in)").forEach((el) => io.observe(el));
    };

    // Initial scan
    observe();

    // Re-scan when dynamic sections are added (MutationObserver)
    const mo = new MutationObserver(() => observe());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return <>{children}</>;
}
