/**
 * FAARNS motion engine.
 * Every animation is driven by a data attribute, so devs can add or remove
 * motion in markup without touching this file:
 *
 *   data-split="hero" | "scroll"  words rise in (hero runs after the preloader)
 *   data-scrub                    words light up as you scroll past
 *   data-reveal                   fades and lifts in on scroll (children with data-reveal-item stagger)
 *   data-parallax="0.2"           drifts vertically at that speed
 *   data-marquee="32"             endless strip, speeds up and reverses with scroll velocity
 *   data-stack                    sticky cards that scale back as the next one arrives
 *   data-hscroll                  pins and scrolls its [data-hscroll-track] sideways (desktop)
 *   data-magnetic                 follows the pointer a little (desktop)
 *   data-tilt                     3D tilt on hover (desktop)
 *   data-count="50"               counts up when it enters the screen
 *   data-letters                  letters rise one by one (footer wordmark)
 *   data-cursor="View"            custom cursor shows this label over the element
 *   data-hp + data-hp-row="0"     floating preview that follows the cursor over rows (desktop)
 *
 * DEV NOTE (step by step):
 *   1. To animate something new, add one of the attributes above in JSX. No code change needed.
 *   2. To tune an effect, find its block below (each starts with a comment) and change duration/ease.
 *   3. To add a brand-new effect, add a block inside the `mm.add` callback and document its attribute here.
 *   4. Reduced motion: anything inside `if (!motion) return;` is skipped for people who turned motion off.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const EASE = "expo.out";

function splitInto(el: HTMLElement, mode: "words" | "chars"): HTMLElement[] {
  if (el.dataset.splitDone === mode) return Array.from(el.querySelectorAll<HTMLElement>(mode === "words" ? ".w-i" : ".c-i"));
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const text = n.textContent || "";
        const frag = document.createDocumentFragment();
        const parts = mode === "words" ? text.split(/(\s+)/) : Array.from(text);
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(p)); return; }
          const outer = document.createElement("span");
          outer.className = mode === "words" ? "w" : "c";
          const inner = document.createElement("span");
          inner.className = mode === "words" ? "w-i" : "c-i";
          inner.textContent = p;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        n.parentNode?.replaceChild(frag, n);
      } else if (n.nodeType === Node.ELEMENT_NODE) {
        const e = n as HTMLElement;
        if (!e.classList.contains("w") && !e.classList.contains("c")) walk(e);
      }
    });
  };
  walk(el);
  el.dataset.splitDone = mode;
  return Array.from(el.querySelectorAll<HTMLElement>(mode === "words" ? ".w-i" : ".c-i"));
}

export type MotionOptions = { heroDelay?: number };

/** Run all scroll and hover animations inside `root`. Returns a cleanup function. */
export function initMotion(root: HTMLElement, opts: MotionOptions = {}): () => void {
  const mm = gsap.matchMedia();
  const cleanups: Array<() => void> = [];
  const q = <T extends HTMLElement = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s));

  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      fine: "(pointer: fine) and (min-width: 1024px)",
      wide: "(min-width: 1024px)",
    },
    (ctx) => {
      const { motion, fine, wide } = ctx.conditions as { motion: boolean; fine: boolean; wide: boolean };

      // Text splits always happen so layout is identical with or without motion.
      q("[data-split]").forEach((el) => splitInto(el, "words"));
      q("[data-scrub]").forEach((el) => splitInto(el, "words"));
      q("[data-letters]").forEach((el) => splitInto(el, "chars"));
      gsap.set(q("[data-split]"), { autoAlpha: 1 });

      // Counters
      q("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count) || 0;
        if (!motion) { el.textContent = String(end); return; }
        const o = { v: 0 };
        gsap.to(o, {
          v: end, duration: 1.8, ease: "power3.out",
          onUpdate: () => { el.textContent = String(Math.round(o.v)); },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      if (!motion) return;

      // Headline word reveals
      q("[data-split]").forEach((el) => {
        const words = el.querySelectorAll(".w-i");
        const hero = el.dataset.split === "hero";
        gsap.from(words, {
          yPercent: 115, rotate: 5, transformOrigin: "0% 100%",
          duration: 1.2, ease: EASE, stagger: hero ? 0.06 : 0.035,
          delay: hero ? opts.heroDelay ?? 0.15 : 0,
          scrollTrigger: hero ? undefined : { trigger: el, start: "top 88%", once: true },
        });
      });

      // Hero intro pieces (anything marked data-intro, in order)
      const intro = q("[data-intro]");
      if (intro.length) {
        gsap.from(intro, { y: 24, autoAlpha: 0, duration: 1, ease: EASE, stagger: 0.1, delay: (opts.heroDelay ?? 0.15) + 0.35 });
      }

      // Scroll-scrubbed word highlight
      q("[data-scrub]").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".w-i"), { opacity: 0.14 }, {
          opacity: 1, stagger: 0.08, ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: true },
        });
      });

      // Reveals
      q("[data-reveal]").forEach((el) => {
        const items = el.querySelectorAll("[data-reveal-item]");
        const targets = items.length ? items : [el];
        gsap.from(targets, {
          y: 48, autoAlpha: 0, duration: 1.1, ease: EASE, stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Parallax
      q("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.2;
        gsap.to(el, {
          yPercent: speed * 100, ease: "none",
          scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Letters (footer wordmark)
      q("[data-letters]").forEach((el) => {
        gsap.from(el.querySelectorAll(".c-i"), {
          yPercent: 105, duration: 1.2, ease: EASE, stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 98%", once: true },
        });
      });

      // Velocity marquee
      q("[data-marquee]").forEach((el) => {
        const track = el.querySelector<HTMLElement>("[data-marquee-track]");
        if (!track) return;
        const tween = gsap.to(track, { xPercent: -50, repeat: -1, duration: Number(el.dataset.marquee) || 32, ease: "none" });
        const skew = gsap.quickTo(track, "skewX", { duration: 0.4, ease: "power3" });
        let dir = 1;
        ScrollTrigger.create({
          trigger: el, start: "top bottom", end: "bottom top",
          onUpdate(self) {
            const v = self.getVelocity();
            dir = self.direction;
            const boost = gsap.utils.clamp(1, 6, Math.abs(v) / 250);
            gsap.to(tween, { timeScale: dir * boost, duration: 0.15, overwrite: true, onComplete: () => { gsap.to(tween, { timeScale: dir, duration: 1.2, ease: "power2.out" }); } });
            skew(gsap.utils.clamp(-8, 8, v / -300));
            gsap.delayedCall(0.2, () => skew(0));
          },
        });
        const pause = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6 });
        const play = () => gsap.to(tween, { timeScale: dir, duration: 0.6 });
        el.addEventListener("mouseenter", pause);
        el.addEventListener("mouseleave", play);
        cleanups.push(() => { el.removeEventListener("mouseenter", pause); el.removeEventListener("mouseleave", play); });
      });

      // Stacking cards
      q("[data-stack]").forEach((el) => {
        const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-stack-card]"));
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.9, filter: "brightness(0.45)", ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
          });
        });
      });

      // Horizontal pinned scroll (desktop only; stacks vertically on mobile via CSS)
      if (wide) {
        q("[data-hscroll]").forEach((el) => {
          const track = el.querySelector<HTMLElement>("[data-hscroll-track]");
          const bar = el.querySelector<HTMLElement>("[data-hscroll-bar]");
          if (!track) return;
          const dist = () => Math.max(0, track.scrollWidth - (el.clientWidth || window.innerWidth));
          gsap.to(track, {
            x: () => -dist(), ease: "none",
            scrollTrigger: {
              trigger: el, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true,
              onUpdate: (s) => { if (bar) gsap.set(bar, { scaleX: s.progress }); },
            },
          });
        });
      }

      if (fine) {
        // Floating hover preview for rows (Website / Search / Ads / Brand)
        q("[data-hp]").forEach((hp) => {
          const scope = hp.parentElement || root;
          const rows = Array.from(scope.querySelectorAll<HTMLElement>("[data-hp-row]"));
          const items = Array.from(hp.querySelectorAll<HTMLElement>("[data-hp-item]"));
          const xTo = gsap.quickTo(hp, "x", { duration: 0.55, ease: "power3" });
          const yTo = gsap.quickTo(hp, "y", { duration: 0.55, ease: "power3" });
          const rot = gsap.quickTo(hp, "rotation", { duration: 0.6, ease: "power3" });
          let lastX = 0;
          gsap.set(hp, { xPercent: -50, yPercent: -50, scale: 0.85 });
          const move = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); rot(gsap.utils.clamp(-8, 8, (e.clientX - lastX) * 0.6)); lastX = e.clientX; };
          const enter = (i: number) => () => {
            items.forEach((it, k) => it.classList.toggle("on", k === i));
            gsap.to(hp, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
          };
          const leave = () => gsap.to(hp, { autoAlpha: 0, scale: 0.85, duration: 0.35, ease: "power3.in", overwrite: "auto" });
          rows.forEach((r) => {
            const on = enter(Number(r.dataset.hpRow) || 0);
            r.addEventListener("pointerenter", on);
            r.addEventListener("pointerleave", leave);
            cleanups.push(() => { r.removeEventListener("pointerenter", on); r.removeEventListener("pointerleave", leave); });
          });
          window.addEventListener("pointermove", move);
          cleanups.push(() => window.removeEventListener("pointermove", move));
        });

        // Magnetic buttons
        q("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
          };
          const leave = () => { gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" }); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });

        // Tilt
        q("[data-tilt]").forEach((el) => {
          gsap.set(el, { transformPerspective: 900 });
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 8);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
          };
          const leave = () => { rx(0); ry(0); };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); });
        });
      }
    },
  );

  requestAnimationFrame(() => ScrollTrigger.refresh());
  return () => { cleanups.forEach((c) => c()); mm.revert(); };
}

/** Smooth scrolling (Lenis) wired into GSAP. Returns the instance or null when reduced motion is on. */
export function initSmoothScroll(): Lenis | null {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/** Custom cursor: a dot plus a ring that grows over links and shows labels from data-cursor. */
export function initCursor(): () => void {
  if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return () => {};
  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  ring.setAttribute("aria-hidden", "true");
  ring.innerHTML = '<span class="cursor-label"></span>';
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  dot.setAttribute("aria-hidden", "true");
  document.body.append(ring, dot);
  const label = ring.querySelector<HTMLElement>(".cursor-label")!;
  gsap.set([ring, dot], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
  const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
  const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
  const dx = gsap.quickTo(dot, "x", { duration: 0.08 });
  const dy = gsap.quickTo(dot, "y", { duration: 0.08 });
  const move = (e: PointerEvent) => { rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY); };
  const over = (e: PointerEvent) => {
    const t = e.target as HTMLElement;
    const lab = t.closest<HTMLElement>("[data-cursor]");
    const hot = t.closest("a, button, [role='button'], input, select, textarea, label");
    document.body.classList.toggle("cursor-hot", !!hot && !lab);
    document.body.classList.toggle("cursor-label-on", !!lab);
    label.textContent = lab?.dataset.cursor || "";
  };
  const leave = () => gsap.to([ring, dot], { autoAlpha: 0, duration: 0.2 });
  const enter = () => gsap.to([ring, dot], { autoAlpha: 1, duration: 0.2 });
  window.addEventListener("pointermove", move);
  document.addEventListener("pointerover", over);
  document.documentElement.addEventListener("pointerleave", leave);
  document.documentElement.addEventListener("pointerenter", enter);
  document.body.classList.add("has-cursor");
  return () => {
    window.removeEventListener("pointermove", move);
    document.removeEventListener("pointerover", over);
    document.documentElement.removeEventListener("pointerleave", leave);
    document.documentElement.removeEventListener("pointerenter", enter);
    ring.remove(); dot.remove();
    document.body.classList.remove("has-cursor", "cursor-hot", "cursor-label-on");
  };
}

/** First-visit preloader: logo assembles, counter runs to 100, panel wipes up. Calls onReveal as the wipe starts. */
export function runPreloader(el: HTMLElement, onReveal: () => void): void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const count = el.querySelector<HTMLElement>("[data-pre-count]");
  if (reduce) { el.style.display = "none"; onReveal(); return; }
  document.documentElement.classList.add("is-loading");
  const o = { v: 0 };
  const tl = gsap.timeline({
    onComplete: () => { el.style.display = "none"; document.documentElement.classList.remove("is-loading"); },
  });
  tl.from(el.querySelectorAll(".pre-mark path"), { x: (i) => [-60, 60, -40][i] ?? 0, y: (i) => [-40, 40, 60][i] ?? 0, autoAlpha: 0, duration: 1, ease: EASE, stagger: 0.12 })
    .to(o, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => { if (count) count.textContent = String(Math.round(o.v)); } }, 0)
    .to(el.querySelector(".pre-bar"), { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0)
    .to(el.querySelectorAll(".pre-inner"), { y: -30, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, ">-0.1")
    .add(onReveal, ">-0.1")
    .to(el, { yPercent: -100, duration: 1, ease: "expo.inOut" }, "<");
}

/** Page-change curtain: a violet panel that wipes away to reveal the new page. */
export function runCurtain(el: HTMLElement): void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  gsap.fromTo(el, { yPercent: 0, autoAlpha: 1 }, { yPercent: -100, duration: 0.9, ease: "expo.inOut", onComplete: () => { gsap.set(el, { autoAlpha: 0 }); } });
}

/**
 * Hero demo: tabs of scenarios (Sales & CRM, Meta ads, SEO & AEO…), each with 4 steps that light up in turn.
 * Reads its data from the element's `data-flow` JSON (built from content/site.ts → home.flow).
 * Auto-advances to the next tab after each run; clicking a tab jumps to it. Pauses off screen.
 */
type FlowData = { scenarios: { tab: string; steps: { title: string; text: string; status: string }[] }[]; doneStatus: string };
export function initFlow(el: HTMLElement): () => void {
  let data: FlowData;
  try { data = JSON.parse(el.dataset.flow || ""); } catch { return () => {}; }
  const steps = Array.from(el.querySelectorAll<HTMLElement>("[data-flow-step]"));
  const tabs = Array.from(el.querySelectorAll<HTMLButtonElement>("[data-flow-tab]"));
  const status = el.querySelector<HTMLElement>("[data-flow-status]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let sc = 0, i = -1, timer: ReturnType<typeof setTimeout> | null = null, visible = false;

  const paint = (n: number) => {
    const s = data.scenarios[n];
    tabs.forEach((t, k) => t.setAttribute("aria-selected", String(k === n)));
    el.classList.add("swap");
    setTimeout(() => {
      steps.forEach((st, k) => {
        const h = st.querySelector("h4"), p = st.querySelector("p");
        if (h) h.textContent = s.steps[k]?.title || "";
        if (p) p.textContent = s.steps[k]?.text || "";
      });
      el.classList.remove("swap");
    }, reduce ? 0 : 220);
  };
  const setStatus = (txt: string) => {
    if (!status) return;
    status.textContent = txt;
    if (!reduce) gsap.fromTo(status, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" });
  };
  const tick = () => {
    i++;
    if (i > steps.length) { i = 0; sc = (sc + 1) % data.scenarios.length; paint(sc); }
    steps.forEach((s, k) => { s.classList.toggle("done", k < i); s.classList.toggle("on", k === i); });
    setStatus(i < steps.length ? data.scenarios[sc].steps[i].status : data.doneStatus);
    timer = setTimeout(tick, i < steps.length ? 1600 : 1800);
  };
  const stop = () => { if (timer) clearTimeout(timer); timer = null; };
  const start = () => { if (!timer && visible && !document.hidden && !reduce) timer = setTimeout(tick, 500); };
  const jump = (n: number) => () => { stop(); sc = n; i = -1; paint(n); steps.forEach((s) => s.classList.remove("done", "on")); setStatus(data.scenarios[n].steps[0].status); start(); };
  const offs = tabs.map((t, n) => { const f = jump(n); t.addEventListener("click", f); return () => t.removeEventListener("click", f); });

  if (reduce) { steps.forEach((s) => s.classList.add("done")); }
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.2 });
  io.observe(el);
  const vis = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", vis);
  return () => { stop(); io.disconnect(); offs.forEach((o) => o()); document.removeEventListener("visibilitychange", vis); };
}

export { gsap, ScrollTrigger };
