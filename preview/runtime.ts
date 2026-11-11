// Single-file preview runtime: hash router + vanilla versions of the interactive bits.
// The real site uses the React components; this only powers the shareable preview.
import { initCursor, initFlow, initMotion, initSmoothScroll, runCurtain, runPreloader, ScrollTrigger } from "@/lib/motion";

declare const PAGES: Record<string, { title: string; html: string }>;

const main = document.querySelector("main")!;
const lenis = initSmoothScroll();
initCursor();
let cleanup: () => void = () => {};
let first = true;
let current = "";

function bindInteractive(root: HTMLElement) {
  const offs: Array<() => void> = [];
  root.querySelectorAll<HTMLElement>(".faq").forEach((faq) => {
    faq.querySelectorAll<HTMLButtonElement>(".qa > button").forEach((b) => {
      b.addEventListener("click", () => {
        const qa = b.parentElement!; const open = !qa.classList.contains("open");
        faq.querySelectorAll(".qa").forEach((x) => { x.classList.remove("open"); x.querySelector("button")!.setAttribute("aria-expanded", "false"); });
        if (open) { qa.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
      });
    });
  });
  const seg = root.querySelector(".seg");
  if (seg) {
    const rows = Array.from(root.querySelectorAll<HTMLElement>(".prow"));
    seg.querySelectorAll<HTMLButtonElement>("button").forEach((b, i) => {
      b.addEventListener("click", () => {
        seg.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        rows.forEach((r) => { const mo = /\/mo/.test(r.querySelector(".p")?.textContent || ""); r.classList.toggle("hide", i === 1 ? mo : i === 2 ? !mo : false); });
        ScrollTrigger.refresh();
      });
    });
  }
  root.querySelectorAll<HTMLButtonElement>(".opt button").forEach((b) => b.addEventListener("click", () => b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"))));
  const form = root.querySelector<HTMLFormElement>("form.form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = form.querySelector<HTMLElement>(".msg")!;
      const d = new FormData(form);
      msg.className = "msg err";
      if (!String(d.get("name") || "").trim()) { msg.textContent = "Add your name so we know who to reply to."; return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.get("email") || ""))) { msg.textContent = "Add a work email like you@company.com."; return; }
      msg.textContent = "Messages aren’t connected in this preview yet. Please use Book a 30-minute call.";
    });
  }
  const flow = root.querySelector<HTMLElement>(".flow");
  if (flow) offs.push(initFlow(flow));
  return () => offs.forEach((o) => o());
}

function route() {
  const raw = location.hash.replace("#", "") || "home";
  const [name, anchor] = raw.split("--");
  const page = PAGES[name] ? name : "home";
  if (page !== current) {
    cleanup();
    main.innerHTML = PAGES[page].html;
    document.title = PAGES[page].title;
    current = page;
    const offInteractive = bindInteractive(main);
    const start = (delay: number) => { const offMotion = initMotion(main, { heroDelay: delay }); cleanup = () => { offMotion(); offInteractive(); }; };
    lenis?.scrollTo(0, { immediate: true }); if (!lenis) window.scrollTo(0, 0);
    if (first) {
      first = false;
      const pre = document.querySelector<HTMLElement>(".pre")!;
      let seen = false; try { seen = sessionStorage.getItem("faarns-intro") === "1"; sessionStorage.setItem("faarns-intro", "1"); } catch {}
      if (!seen && !anchor) runPreloader(pre, () => start(0.25)); else { pre.style.display = "none"; start(0.1); }
    } else {
      runCurtain(document.querySelector<HTMLElement>(".curtain")!);
      start(0.35);
    }
    document.querySelectorAll<HTMLAnchorElement>(".navlinks a").forEach((a) => {
      const h = a.getAttribute("href")!.replace("#", "");
      if (h === page) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }
  document.body.classList.remove("menu-open");
  document.querySelector(".menu-btn")?.setAttribute("aria-expanded", "false");
  if (anchor) {
    setTimeout(() => {
      const t = document.getElementById(anchor);
      if (t) { if (lenis) lenis.scrollTo(t, { offset: -72 }); else t.scrollIntoView({ behavior: "smooth" }); }
    }, page !== current ? 500 : 60);
  }
}

document.querySelector(".menu-btn")?.addEventListener("click", function (this: HTMLElement) {
  const open = !document.body.classList.contains("menu-open");
  document.body.classList.toggle("menu-open", open);
  this.setAttribute("aria-expanded", String(open));
  this.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") document.body.classList.remove("menu-open"); });
document.addEventListener("click", (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href^='#']");
  if (a && a.getAttribute("href") === location.hash) { e.preventDefault(); route(); }
});
window.addEventListener("hashchange", route);
route();
