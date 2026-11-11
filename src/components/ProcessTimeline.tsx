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

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathGlowRef = useRef<SVGPathElement>(null);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [pathD, setPathD] = useState<string>("");
  const [activeStep, setActiveStep] = useState<number>(0);
  const [svgHeight, setSvgHeight] = useState<number>(1000);

  const steps = workProcess.steps;

  // Mathematically perfect cubic Bézier curve calculation connecting node centers
  const computeCurves = () => {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const validAnchors = anchorRefs.current.filter(Boolean) as HTMLDivElement[];
    if (validAnchors.length < 2) return;

    setSvgHeight(cRect.height);
    const wide = window.innerWidth >= 1024;

    const points = validAnchors.map((node) => {
      const nRect = node.getBoundingClientRect();
      return {
        x: nRect.left + nRect.width / 2 - cRect.left,
        y: nRect.top + nRect.height / 2 - cRect.top,
      };
    });

    // Start with 100% precision at the exact center of Anchor 1
    let d = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dy = p2.y - p1.y;

      if (!wide) {
        // Mobile single-column: gentle organic wave along the left rail
        const wave = 16 * (i % 2 === 0 ? 1 : -1);
        const midX = p1.x + wave;
        const cp1x = midX;
        const cp1y = p1.y + dy * 0.45;
        const cp2x = midX;
        const cp2y = p2.y - dy * 0.45;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      } else {
        // Desktop: flawless, continuous S-curve zig-zag across the center
        const midX = (p1.x + p2.x) / 2;
        const cp1x = midX;
        const cp1y = p1.y + dy * 0.48;
        const cp2x = midX;
        const cp2y = p2.y - dy * 0.48;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
      }
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

  // GSAP ScrollTrigger for animated laser path drawing & card stagger
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
    const wide = window.innerWidth >= 1024;

    // Card stagger & subtle rotation animation on scroll
    cardInnerRefs.current.forEach((card, index) => {
      if (!card) return;
      if (isReduced) {
        gsap.set(card, { opacity: 1, y: 0, rotate: 0 });
        return;
      }

      const rot = wide ? (index % 2 === 0 ? 1.2 : -1.2) : 0;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 32,
          rotate: rot * 1.5,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          rotate: rot,
          scale: 1,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
            onEnter: () => setActiveStep((prev) => Math.max(prev, index)),
          },
        }
      );
    });

    // Draw the active zig-zag path as user scrolls
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 72%",
      end: "bottom 78%",
      scrub: 0.45,
      onUpdate: (self) => {
        const offset = length * (1 - self.progress);
        gsap.set(path, { strokeDashoffset: offset });

        const currentIdx = Math.min(
          steps.length - 1,
          Math.floor(self.progress * steps.length * 1.05)
        );
        setActiveStep(currentIdx);
      },
    });

    return () => {
      st.kill();
    };
  }, [pathD, steps.length]);

  return (
    <section className="sec relative" id="how">
      {/* ── Section Header ── */}
      <div className="wrap">
        <div className="head" data-reveal>
          <Kicker flush>{workProcess.label}</Kicker>
          <h2 className="h2" style={{ maxWidth: "16em" }} data-split="scroll">
            {workProcess.headline}
          </h2>
        </div>
      </div>

      {/* ── Zig-Zag Journey Timeline Container ── */}
      <div
        ref={containerRef}
        className="wrap relative"
      >
        {/* ── SVG Animated Zig-Zag Winding Path ── */}
        <svg
          className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-visible"
          style={{ height: svgHeight ? `${svgHeight}px` : "100%" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Subtle glow filter for the active laser line */}
            <filter id="zigzag-laser-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Base Static Dashed Zig-Zag Road */}
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

          {/* 2. Active Glowing Laser Stroke (Violet) */}
          {pathD && (
            <path
              ref={pathGlowRef}
              d={pathD}
              fill="none"
              stroke="var(--violet)"
              strokeWidth="2.8"
              strokeLinecap="round"
              filter="url(#zigzag-laser-glow)"
              style={{
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
          )}
        </svg>

        {/* ── Timeline Steps ── */}
        <div className="relative z-10 flex flex-col gap-10 sm:gap-14 lg:gap-16">
          {steps.map((step, idx) => {
            const isRight = idx % 2 === 0;
            const isActive = activeStep >= idx;

            return (
              <div
                key={step.title}
                className={`relative w-full flex ${
                  isRight ? "lg:justify-end" : "lg:justify-start"
                } justify-start pl-8 sm:pl-10 lg:pl-0`}
              >
                {/* ── Card Slot Wrapper (Fixed in layout, never transformed by GSAP) ── */}
                <div className="relative w-full lg:w-[calc(50%-44px)]">
                  {/* ── Milestone Anchor Node: Anchor is attached to the fixed slot so SVG connects with 100% precision ── */}
                  <div
                    ref={(el) => {
                      anchorRefs.current[idx] = el;
                    }}
                    className={`absolute z-30 top-9 flex items-center justify-center ${
                      isRight
                        ? "-left-[10px] sm:-left-[11px]"
                        : "-left-[10px] sm:-left-[11px] lg:left-auto lg:-right-[11px]"
                    }`}
                  >
                    <div
                      className="w-[20px] h-[20px] rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: "#0A0712",
                        border: `2px solid ${isActive ? "var(--violet)" : "rgba(255, 255, 255, 0.22)"}`,
                        boxShadow: isActive
                          ? "0 0 12px rgba(165, 139, 255, 0.8), inset 0 0 4px var(--violet)"
                          : "none",
                      }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                        style={{
                          background: isActive ? "var(--violet)" : "rgba(255, 255, 255, 0.25)",
                          boxShadow: isActive ? "0 0 5px var(--violet)" : "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* ── Animated Inner Card (Carries the scroll stagger & subtle organic rotation) ── */}
                  <div
                    ref={(el) => {
                      cardInnerRefs.current[idx] = el;
                    }}
                    style={{
                      background: "var(--surface)",
                      border: `1px solid ${isActive ? "rgba(165, 139, 255, 0.3)" : "var(--line)"}`,
                      borderRadius: 20,
                      padding: "clamp(24px, 3.8vw, 32px) clamp(20px, 3.5vw, 30px)",
                      boxShadow: isActive
                        ? "0 18px 45px -12px rgba(0, 0, 0, 0.75), 0 0 25px -6px rgba(165, 139, 255, 0.12)"
                        : "0 12px 30px -10px rgba(0, 0, 0, 0.5)",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                    }}
                    className="hover:-translate-y-1 hover:rotate-0"
                  >
                    {/* Step Number */}
                    <span
                      style={{
                        fontFamily: "var(--display)",
                        fontSize: "clamp(26px, 3vw, 32px)",
                        fontWeight: 700,
                        lineHeight: 1,
                        letterSpacing: "-0.03em",
                        color: "var(--violet)",
                        display: "block",
                        marginBottom: 12,
                      }}
                    >
                      0{idx + 1}
                    </span>

                    {/* Step Title */}
                    <h3
                      className="h3"
                      style={{
                        margin: 0,
                        fontSize: "clamp(20px, 2.2vw, 25px)",
                        fontWeight: 600,
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
                        marginTop: 10,
                        marginBottom: 0,
                        fontSize: 15,
                        lineHeight: 1.55,
                      }}
                    >
                      {step.text}
                    </p>

                    {/* Deliverable Row: Clean border divider, NO boxy grey background, prominent check icon */}
                    <div
                      style={{
                        marginTop: 20,
                        paddingTop: 16,
                        borderTop: "1px solid var(--line)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: "50%",
                          background: "rgba(165, 139, 255, 0.14)",
                          color: "var(--violet)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 14,
                          lineHeight: 1.5,
                          color: "var(--text)",
                        }}
                      >
                        You get{" "}
                        <strong style={{ color: "#FFFFFF", fontWeight: 600 }}>
                          {step.get}
                        </strong>
                      </p>
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
