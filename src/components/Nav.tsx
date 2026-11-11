"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, settings } from "@/content/site";
import { BookButton } from "./BookButton";
import { Mark } from "./Icons";

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const isActive = (href: string) => !href.includes("#") && href !== "/" && pathname.startsWith(href);

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <Link className="brand" href="/" aria-label="FAARNS home"><Mark /><b>FAARNS</b></Link>
          <nav className="navlinks" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.label} href={n.href} aria-current={isActive(n.href) ? "page" : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <BookButton className="nav-cta" arrow={false} />
            <button className="menu-btn" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="drawer" onClick={() => setOpen(!open)}><span /></button>
          </div>
        </div>
      </header>
      <div className="drawer" id="drawer" aria-hidden={!open}>
        {nav.map((n, i) => (
          <Link key={n.label} className="big" href={n.href} style={{ transitionDelay: `${0.04 * (i + 1)}s` }} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>{n.label}</Link>
        ))}
        <BookButton label={settings.ctaLabel} magnetic={false} />
      </div>
    </>
  );
}
