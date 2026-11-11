"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { initCursor, initMotion, initSmoothScroll, runCurtain, runPreloader, ScrollTrigger } from "@/lib/motion";
import { settings } from "@/content/site";
import { Mark } from "./Icons";

/** Owns smooth scroll, the cursor, the preloader and per-page animations. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const firstRef = useRef(true);
  const preRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  // once: smooth scroll + cursor + in-page hash links
  useEffect(() => {
    lenisRef.current = initSmoothScroll();
    const stopCursor = initCursor();
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      history.replaceState(null, "", url.hash);
      if (lenisRef.current) lenisRef.current.scrollTo(target as HTMLElement, { offset: -72 });
      else target.scrollIntoView({ behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => { stopCursor(); document.removeEventListener("click", onClick); lenisRef.current?.destroy(); };
  }, []);

  // every page: run motion; first visit gets the preloader, later visits the curtain
  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main");
    if (!main) return;
    let cleanup: () => void = () => {};
    const start = (heroDelay: number) => { cleanup = initMotion(main, { heroDelay }); };

    lenisRef.current?.scrollTo(0, { immediate: true });
    if (location.hash) {
      const t = document.querySelector(location.hash);
      if (t) setTimeout(() => lenisRef.current ? lenisRef.current.scrollTo(t as HTMLElement, { offset: -72, immediate: true }) : t.scrollIntoView(), 50);
    } else if (!lenisRef.current) window.scrollTo(0, 0);

    if (firstRef.current) {
      firstRef.current = false;
      let seen = false;
      try { seen = sessionStorage.getItem("faarns-intro") === "1"; sessionStorage.setItem("faarns-intro", "1"); } catch {}
      if (settings.preloader && !seen && preRef.current) {
        runPreloader(preRef.current, () => start(0.25));
      } else {
        if (preRef.current) preRef.current.style.display = "none";
        start(0.1);
      }
    } else {
      if (curtainRef.current) runCurtain(curtainRef.current);
      start(0.35);
    }
    const r = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(r); cleanup(); };
  }, [pathname]);

  return (
    <>
      <div className="pre" ref={preRef} aria-hidden="true">
        <div className="pre-inner"><Mark className="pre-mark" /></div>
        <div className="pre-inner pre-count"><span data-pre-count>0</span></div>
        <div className="pre-bar" />
      </div>
      <div className="curtain" ref={curtainRef} aria-hidden="true" />
      {children}
    </>
  );
}
