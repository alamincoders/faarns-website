"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workProcess } from "@/content/site";
import { Kicker } from "@/components/Blocks";
import { Check } from "@/components/Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Realistic 3D PushPin Component ──────────────────────────────────────────
interface PushPin3DProps {
  color?: "blue" | "violet" | "emerald" | "rose";
  active?: boolean;
  className?: string;
}

const PIN_COLORS = {
  blue: {
    base: "#2563EB",
    mid: "#60A5FA",
    deep: "#1E3A8A",
    glow: "rgba(96, 165, 250, 0.8)",
  },
  violet: {
    base: "#7C3AED",
    mid: "#A78BFA",
    deep: "#4C1D95",
    glow: "rgba(167, 139, 250, 0.8)",
  },
  emerald: {
    base: "#059669",
    mid: "#34D399",
    deep: "#064E3B",
    glow: "rgba(52, 211, 153, 0.8)",
  },
  rose: {
    base: "#DB2777",
    mid: "#F472B6",
    deep: "#831843",
    glow: "rgba(244, 114, 182, 0.8)",
  },
};

function PushPin3D({ color = "violet", active = false, className = "" }: PushPin3DProps) {
  const c = PIN_COLORS[color];
  const uniqueId = `pin-${color}`;

  return (
    <div
      className={`relative inline-block select-none pointer-events-none transition-transform duration-300 ${className}`}
      aria-hidden="true"
    >
      <svg
        width="44"
        height="52"
        viewBox="0 0 48 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          {/* Radial gradient for glossy 3D sphere cap */}
          <radialGradient
            id={`${uniqueId}-head`}
            cx="34%"
            cy="28%"
            r="65%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="28%" stopColor={c.mid} />
            <stop offset="70%" stopColor={c.base} />
            <stop offset="100%" stopColor={c.deep} />
          </radialGradient>

          {/* Linear gradient for cylindrical neck bevel */}
          <linearGradient
            id={`${uniqueId}-neck`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={c.mid} />
            <stop offset="50%" stopColor={c.base} />
            <stop offset="100%" stopColor={c.deep} />
          </linearGradient>

          {/* Drop shadow filter */}
          <filter id={`${uniqueId}-shadow`} x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="8"
              floodColor="rgba(0,0,0,0.75)"
            />
          </filter>

          {/* Ambient glow filter for pin base */}
          <filter id={`${uniqueId}-glow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur" />
          </filter>
        </defs>

        {/* 1. Underlying Cast Glow on the Card */}
        <ellipse
          cx="24"
          cy="42"
          rx={active ? "20" : "14"}
          ry={active ? "10" : "7"}
          fill={c.glow}
          opacity={active ? 0.95 : 0.55}
          filter={`url(#${uniqueId}-glow)`}
          className="transition-all duration-500"
        />

        {/* 2. Deep Shadow under pin base */}
        <ellipse
          cx="24"
          cy="43"
          rx="11"
          ry="5"
          fill="rgba(0, 0, 0, 0.85)"
          filter="blur(2.5px)"
        />

        {/* 3. Pushpin Base Rim (Tactile Bevel) */}
        <ellipse
          cx="24"
          cy="37"
          rx="13.5"
          ry="5.5"
          fill={`url(#${uniqueId}-neck)`}
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.8"
        />

        {/* 4. Cylindrical Neck Body */}
        <path
          d="M14 26 C14 26, 17 34, 18 36 C19 37.5, 29 37.5, 30 36 C31 34, 34 26, 34 26 Z"
          fill={`url(#${uniqueId}-neck)`}
        />

        {/* 5. Main 3D Spherical Head (Domed Cap) */}
        <circle
          cx="24"
          cy="20"
          r="14"
          fill={`url(#${uniqueId}-head)`}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.75"
          filter={`url(#${uniqueId}-shadow)`}
        />

        {/* 6. Specular Glass Highlight Glint */}
        <ellipse
          cx="19.5"
          cy="15.5"
          rx="4.2"
          ry="2.4"
          fill="#FFFFFF"
          opacity="0.9"
          transform="rotate(-28 19.5 15.5)"
        />

        {/* 7. Subtle secondary bounce highlight at bottom-right */}
        <ellipse
          cx="28.5"
          cy="26"
          rx="3.5"
          ry="1.5"
          fill={c.mid}
          opacity="0.45"
          transform="rotate(22 28.5 26)"
        />
      </svg>
    </div>
  );
}

// ── Step Data Configuration ──────────────────────────────────────────────────
const STEPS_CONFIG = [
  {
    num: "01",
    title: workProcess.steps[0]?.title ?? "Assess",
    text:
      workProcess.steps[0]?.text ??
      "We map your workflows, site and funnel, and find where AI and automation pay off first.",
    get: workProcess.steps[0]?.get ?? "a prioritized plan in week one",
    color: "blue" as const,
    accent: "#38BDF8",
    accentGlow: "rgba(56, 189, 248, 0.28)",
    borderHover: "rgba(56, 189, 248, 0.4)",
    side: "right" as const,
    rotation: 1.5,
  },
  {
    num: "02",
    title: workProcess.steps[1]?.title ?? "Build",
    text:
      workProcess.steps[1]?.text ??
      "We ship working agents, automations and pages inside the tools you already use.",
    get: workProcess.steps[1]?.get ?? "your first automation live in 2 to 4 weeks",
    color: "violet" as const,
    accent: "var(--violet)",
    accentGlow: "rgba(165, 139, 255, 0.28)",
    borderHover: "rgba(165, 139, 255, 0.4)",
    side: "left" as const,
    rotation: -1.5,
  },
  {
    num: "03",
    title: workProcess.steps[2]?.title ?? "Train",
    text:
      workProcess.steps[2]?.text ??
      "Short, role-based sessions and playbooks so your team runs it without us.",
    get: workProcess.steps[2]?.get ?? "a team that trusts the system",
    color: "emerald" as const,
    accent: "#34D399",
    accentGlow: "rgba(52, 211, 153, 0.28)",
    borderHover: "rgba(52, 211, 153, 0.4)",
    side: "right" as const,
    rotation: 1.2,
  },
  {
    num: "04",
    title: workProcess.steps[3]?.title ?? "Grow & support",
    text:
      workProcess.steps[3]?.text ??
      "We monitor, tune and expand every month.",
    get: workProcess.steps[3]?.get ?? "a monthly review and the next thing to automate",
    color: "rose" as const,
    accent: "#F472B6",
    accentGlow: "rgba(244, 114, 182, 0.28)",
    borderHover: "rgba(244, 114, 182, 0.4)",
    side: "left" as const,
    rotation: -1.2,
  },
];

// ── Main ProcessTimeline Component ──────────────────────────────────────────
export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathGlowRef = useRef<SVGPathElement>(null);
  const pinRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [pathD, setPathD] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [svgHeight, setSvgHeight] = useState<number>(1000);

  // Dynamic SVG path generation connecting strictly from Pin 1 to Pin 4
  const computeCurves = () => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const validPins = pinRefs.current.filter(Boolean) as HTMLDivElement[];
    if (validPins.length < 2) return;

    setSvgHeight(cRect.height);

    const points = validPins.map((pin) => {
      const pRect = pin.getBoundingClientRect();
      return {
        x: pRect.left + pRect.width / 2 - cRect.left,
        y: pRect.top + pRect.height / 2 - cRect.top,
      };
    });

    // Start EXACTLY at Pin 1 — zero stray lines
    let d = `M ${points[0].x} ${points[0].y}`;

    // S-curves strictly between consecutive pins (Pin 1 -> Pin 2 -> Pin 3 -> Pin 4)
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dy = p2.y - p1.y;
      const dx = p2.x - p1.x;

      const cp1x = p1.x + dx * 0.15;
      const cp1y = p1.y + dy * 0.48;
      const cp2x = p2.x - dx * 0.15;
      const cp2y = p2.y - dy * 0.48;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    setPathD(d);
  };

  useLayoutEffect(() => {
    computeCurves();
    const handleResize = () => {
      computeCurves();
    };

    window.addEventListener("resize", handleResize);
    const ro = new ResizeObserver(() => computeCurves());
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
    };
  }, []);

  // GSAP ScrollTrigger for glowing laser stroke & card stagger
  useEffect(() => {
    if (!containerRef.current || !pathGlowRef.current || !pathD) return;

    const path = pathGlowRef.current;
    const length = path.getTotalLength();
    if (!length || isNaN(length)) return;

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Stagger animation for the cards
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      if (isReduced) {
        gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      const cfg = STEPS_CONFIG[index];
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 45,
          scale: 0.95,
          rotate: cfg.rotation * 1.5,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: cfg.rotation,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveStep((prev) => Math.max(prev, index)),
          },
        }
      );
    });

    // Scrub the glowing SVG path as the user scrolls through the section
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 72%",
      end: "bottom 80%",
      scrub: 0.6,
      onUpdate: (self) => {
        const offset = length * (1 - self.progress);
        gsap.set(path, { strokeDashoffset: offset });

        const stepIndex = Math.min(
          STEPS_CONFIG.length - 1,
          Math.floor(self.progress * STEPS_CONFIG.length * 1.15)
        );
        setActiveStep(stepIndex);
      },
    });

    return () => {
      st.kill();
    };
  }, [pathD]);

  return (
    <section
      className="sec relative overflow-hidden"
      id="how"
      style={{
        // Ultra-premium subtle spotlight ambient gradients on deep dark canvas
        background: `radial-gradient(ellipse 90% 60% at 50% -10%, rgba(140, 117, 247, 0.12) 0%, transparent 65%),
                     radial-gradient(ellipse 70% 45% at 50% 105%, rgba(56, 189, 248, 0.08) 0%, transparent 70%),
                     var(--ink)`,
      }}
    >
      {/* ── Soft Ambient Glow Blobs in Background ── */}
      <div
        className="pointer-events-none absolute top-1/4 -left-36 w-[480px] h-[480px] bg-[#8C75F7]/[0.06] blur-[140px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-36 w-[500px] h-[500px] bg-[#38BDF8]/[0.05] blur-[150px] rounded-full"
        aria-hidden="true"
      />

      {/* ── Section Header matching all other site sections ── */}
      <div className="wrap relative z-10">
        <div className="head" data-reveal>
          <Kicker flush>{workProcess.label}</Kicker>
          <h2 className="h2" style={{ maxWidth: "16em" }} data-split="scroll">
            {workProcess.headline}
          </h2>
        </div>
      </div>

      {/* ── Journey Timeline Container ── */}
      <div
        ref={containerRef}
        className="wrap relative z-10"
      >
        {/* ── SVG Winding Path Overlay (Pin 1 to Pin 4 strictly) ── */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-visible"
          style={{ height: svgHeight ? `${svgHeight}px` : "100%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glowing gradient for the active laser stroke */}
            <linearGradient id="proc-laser-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="35%" stopColor="#8C75F7" />
              <stop offset="70%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>

            {/* Neon bloom filter for active line */}
            <filter id="proc-laser-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Base Static Dashed Track */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />
          )}

          {/* 2. Active Glowing Progress Stroke */}
          {pathD && (
            <path
              ref={pathGlowRef}
              d={pathD}
              fill="none"
              stroke="url(#proc-laser-gradient)"
              strokeWidth="3.2"
              strokeLinecap="round"
              filter="url(#proc-laser-glow)"
              style={{
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          )}
        </svg>

        {/* ── Alternating Pinned Cards ── */}
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 52 }}>
          {STEPS_CONFIG.map((step, idx) => {
            const isRight = step.side === "right";
            const isActive = activeStep >= idx;

            return (
              <div
                key={step.num}
                className={`w-full flex ${
                  isRight ? "lg:justify-end" : "lg:justify-start"
                } justify-center`}
              >
                {/* Single Card Wrapper */}
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className="group relative w-full max-w-[490px] transition-all duration-300 ease-out"
                  style={{
                    transform: `rotate(${step.rotation}deg)`,
                  }}
                >
                  {/* Pin Element Container (strictly attached to top card edge) */}
                  <div
                    ref={(el) => {
                      pinRefs.current[idx] = el;
                    }}
                    className={`absolute z-30 -top-5 ${
                      isRight ? "left-7 sm:left-9" : "right-7 sm:right-9"
                    } transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1`}
                  >
                    <PushPin3D color={step.color} active={isActive} />
                  </div>

                  {/* Card Body — Premium Glassmorphic Surface */}
                  <div
                    style={{
                      background: `linear-gradient(155deg, rgba(21, 18, 32, 0.88) 0%, rgba(13, 11, 20, 0.95) 100%)`,
                      border: `1px solid ${isActive ? step.borderHover : "rgba(255, 255, 255, 0.09)"}`,
                      borderRadius: 24,
                      padding: "32px 30px 26px",
                      position: "relative",
                      overflow: "hidden",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      boxShadow: isActive
                        ? `0 24px 50px -12px rgba(0, 0, 0, 0.85), 0 0 32px -8px ${step.accentGlow}, inset 0 1px 0 rgba(255, 255, 255, 0.12)`
                        : `0 18px 40px -14px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.07)`,
                      transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease",
                    }}
                  >
                    {/* Top Row: Clean Step Number */}
                    <div style={{ display: "flex", alignItems: "baseline", marginBottom: 14 }}>
                      <span
                        style={{
                          fontFamily: "var(--display)",
                          fontSize: 32,
                          fontWeight: 700,
                          lineHeight: 1,
                          letterSpacing: "-0.04em",
                          color: step.accent,
                        }}
                      >
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3
                      className="h3"
                      style={{
                        margin: 0,
                        fontSize: "clamp(24px, 2.3vw, 28px)",
                        color: "#FFFFFF",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p
                      className="muted"
                      style={{
                        marginTop: 14,
                        marginBottom: 0,
                        fontSize: 15.5,
                        lineHeight: 1.55,
                        color: "var(--muted)",
                      }}
                    >
                      {step.text}
                    </p>

                    {/* Deliverable Box */}
                    <div
                      style={{
                        marginTop: 22,
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "11px 16px",
                        borderRadius: 14,
                        background: "rgba(255, 255, 255, 0.035)",
                        border: "1px solid rgba(255, 255, 255, 0.07)",
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: `${step.accent}20`,
                          color: step.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span
                        style={{
                          fontSize: 13.5,
                          fontWeight: 500,
                          color: "#F4F3EF",
                        }}
                      >
                        You get {step.get}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { ProcessTimeline };
