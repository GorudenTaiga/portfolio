// Inline icons — 1.5 stroke, 24-grid. Zero external dependency.
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const ArrowUpRight = (p: P) => (
  <svg {...base(p)}><path d="M7 17 17 7M8 7h9v9" /></svg>
);
export const Sun = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
);
export const Moon = (p: P) => (
  <svg {...base(p)}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
);
export const Menu = (p: P) => (
  <svg {...base(p)}><path d="M4 8h16M4 16h16" /></svg>
);
export const Close = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const GitHub = (p: P) => (
  <svg {...base(p)}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.5 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg>
);
export const Discord = (p: P) => (
  <svg {...base(p)}><path d="M8.5 16.5c-1.5.7-3 1-4.5 1-.5-3.8.3-7.6 2.4-10.6A15 15 0 0 1 10 5.5l.5 1a12 12 0 0 1 3 0l.5-1a15 15 0 0 1 3.6 1.4c2.1 3 2.9 6.8 2.4 10.6-1.5 0-3-.3-4.5-1l-.8-1.4" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" /><path d="M7.5 15.3c3 1.3 6 1.3 9 0" /></svg>
);
export const WhatsApp = (p: P) => (
  <svg {...base(p)}><path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3 3Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-1.8-1.8l.8-1-1-2Z" /></svg>
);
export const Email = (p: P) => (
  <svg {...base(p)}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
export const Download = (p: P) => (
  <svg {...base(p)}><path d="M12 15V3m0 12-4-4m4 4 4-4" /><path d="M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" /></svg>
);
export const ExternalLink = (p: P) => (
  <svg {...base(p)}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
);
export const ChevronLeft = (p: P) => (
  <svg {...base(p)}><path d="M15 18l-6-6 6-6" /></svg>
);
export const ChevronRight = (p: P) => (
  <svg {...base(p)}><path d="M9 18l6-6-6-6" /></svg>
);

