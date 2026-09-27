"use client";
import { useEffect, useRef, useState } from "react";

type Tok = [string, string?]; // [text, cssClass]
type ConsoleTab = {
  id: string;
  name: string;
  lang: string;
  dotColor: string;
  meta: string;
  lines: Tok[][];
};

const TABS: ConsoleTab[] = [
  {
    id: "backend",
    name: "PPDBQueueWorker.php",
    lang: "PHP / Laravel",
    dotColor: "#777bb4",
    meta: "Scale: 6M+ lines",
    lines: [
      [["class ", "c-k"], ["BatchQueueDispatcher ", "c-f"], ["implements ", "c-k"], ["ShouldQueue"]],
      [["{"]],
      [["  ", ""], ["use ", "c-k"], ["Dispatchable, InteractsWithQueue;"]],
      [["  ", ""], ["public function ", "c-k"], ["handle", "c-f"], ["(ApplicantRepository ", "c-t"], ["$repo", "c-a"], ["): void"]],
      [["  {"]],
      [["    ", ""], ["$batch = $repo->", "c-p"], ["chunkUnprocessed", "c-f"], ["(5000);"]],
      [["    ", ""], ["$batch->each(fn(", "c-p"], ["$row", "c-a"], [") => ", "c-p"], ["Event::dispatch", "c-f"], ["(new ", "c-p"], ["Verified", "c-t"], ["($row)));"]],
      [["  }"]],
      [["}"]],
    ],
  },
  {
    id: "gameplay",
    name: "ATaigaCharacter.cpp",
    lang: "Unreal Engine 5",
    dotColor: "#f34b7d",
    meta: "Gameplay Systems",
    lines: [
      [["void ", "c-k"], ["ATaigaCharacter", "c-t"], ["::", "c-p"], ["ExecuteCombatDash", "c-f"], ["(ECombatState InState)"]],
      [["{"]],
      [["  ", ""], ["if (CombatSys && CombatSys->", "c-p"], ["CanActivateAbility", "c-f"], ["(InState))"]],
      [["  {"]],
      [["    ", ""], ["const FVector ", "c-k"], ["Fwd = ", "c-p"], ["GetActorForwardVector", "c-f"], ["();"]],
      [["    ", ""], ["LaunchCharacter", "c-f"], ["(Fwd * ", "c-p"], ["1200.f", "c-n"], [", true, false);"]],
      [["    ", ""], ["CombatSys->", "c-p"], ["ApplyCooldown", "c-f"], ["(InState, ", "c-p"], ["1.25f", "c-n"], [");"]],
      [["  }"]],
      [["}"]],
    ],
  },
  {
    id: "ai",
    name: "KafuuChinoAgent.py",
    lang: "Python / AI",
    dotColor: "#3776ab",
    meta: "Voice & 3D Companion",
    lines: [
      [["async def ", "c-k"], ["generate_voice_response", "c-f"], ["(audio_stream: AudioBuffer) -> AsyncIterator:"]],
      [["  ", ""], ["prompt = await ", "c-p"], ["speech_recognizer.transcribe", "c-f"], ["(audio_stream)"]],
      [["  ", ""], ["stream = await ", "c-p"], ["chino_core.generate", "c-f"], ["(prompt, persona=", "c-p"], ['"KafuuChino"', "c-n"], [")"]],
      [["  ", ""], ["async for ", "c-k"], ["audio_chunk, viseme in ", "c-p"], ["synthesizer.stream", "c-f"], ["(stream):"]],
      [["    ", ""], ["yield ", "c-k"], ["LipSyncPacket(audio=audio_chunk, viseme_id=viseme)"]],
    ],
  },
];

export default function HeroPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const frame = useRef<HTMLDivElement>(null);

  // Pointer tilt via CSS vars (zero re-render)
  useEffect(() => {
    const el = frame.current;
    if (!el || !matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches)
      return;
    const host = el.closest(".hero") as HTMLElement;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
        const y = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
        el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
      });
    };
    const leave = () => {
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    };
    host?.addEventListener("pointermove", move);
    host?.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      host?.removeEventListener("pointermove", move);
      host?.removeEventListener("pointerleave", leave);
    };
  }, []);

  // Auto-switch tabs periodically if user hasn't interacted
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % TABS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const tab = TABS[activeTab];

  return (
    <div
      className="panel"
      ref={frame}
      role="region"
      aria-label="Interactive Developer Console"
    >
      {/* Top Tab Bar — No fake macOS dots */}
      <div className="panel-tabs" role="tablist" aria-label="Code Domains">
        {TABS.map((t, idx) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={activeTab === idx}
            className={`panel-tab${activeTab === idx ? " active" : ""}`}
            onClick={() => setActiveTab(idx)}
          >
            <span className="panel-tab-dot" style={{ backgroundColor: t.dotColor }} />
            <span>{t.name}</span>
          </button>
        ))}
      </div>

      {/* Code Inspector */}
      <pre className="panel-code" aria-hidden="true">
        {tab.lines.map((line, li) => (
          <div key={li} className="code-line">
            <span className="ln">{li + 1}</span>
            <span>
              {line.map(([text, cls], ti) => (
                <span key={ti} className={cls}>
                  {text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </pre>

      {/* Telemetry Footer */}
      <div className="panel-foot" aria-hidden="true">
        <span className="telemetry-tag">
          <span className="status-dot" style={{ width: 6, height: 6 }} />
          <span>{tab.lang}</span>
        </span>
        <span className="muted mono">{tab.meta}</span>
      </div>
    </div>
  );
}
