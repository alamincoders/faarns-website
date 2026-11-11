import Link from "next/link";
import { closer, pricing, workProcess, services } from "@/content/site";
import { BookButton } from "./BookButton";
import { ArrowNE, Check, Mark } from "./Icons";

export function PageHero({ eyebrow, title, muted, sub, children, eyebrowHref }: { eyebrow: string; title: string; muted?: string; sub?: string; children?: React.ReactNode; eyebrowHref?: string }) {
  return (
    <div className="hero">
      <div className="glow a" aria-hidden="true" />
      <Mark className="mark-bg" outline />
      <div className="wrap" style={{ position: "relative" }}>
        {eyebrowHref
          ? <Link className="pill" href={eyebrowHref} data-intro=""><i />{eyebrow}</Link>
          : <div className="pill" data-intro=""><i />{eyebrow}</div>}
        <h1 className="h1" style={{ marginTop: 30, maxWidth: "12em", fontSize: "clamp(40px,7vw,108px)" }} data-split="hero">
          {title}{muted && <> <span className="grey">{muted}</span></>}
        </h1>
        {sub && <p className="lede" style={{ marginTop: 30 }} data-intro="">{sub}</p>}
        {children}
      </div>
    </div>
  );
}

export function Kicker({ children, flush }: { children: React.ReactNode; flush?: boolean }) {
  return <p className="kicker" style={flush ? { margin: 0 } : undefined}>{children}</p>;
}

export function Closer({ headline = closer.headline, subhead = closer.subhead, cta, ctaHref }: { headline?: string; subhead?: string; cta?: string; ctaHref?: string }) {
  return (
    <div className="wrap" data-reveal>
      <div className="closer">
        <Mark className="mk" />
        <div style={{ position: "relative", maxWidth: 880 }}>
          <h2 className="h1" style={{ fontSize: "clamp(38px,5.6vw,86px)" }} data-split="scroll">{headline}</h2>
          <p>{subhead}</p>
          <div className="cta-row">
            {cta && ctaHref ? <Link className="btn btn-dark" href={ctaHref} data-magnetic="">{cta}</Link> : <BookButton variant="dark" />}
            <Link className="btn btn-ghost" href={closer.secondary.href}>{closer.secondary.label}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcessScroller() {
  return (
    <section className="band" id="how">
      <div className="hs" data-hscroll>
        <div className="wrap" style={{ width: "100%" }}>
          <div className="head" data-reveal><Kicker flush>{workProcess.label}</Kicker><h2 className="h2" style={{ maxWidth: "14em" }} data-split="scroll">{workProcess.headline}</h2></div>
        </div>
        <div style={{ paddingLeft: "max(var(--pad), calc((100vw - 1320px) / 2 + var(--pad)))", paddingRight: "var(--pad)" }}>
          <ol className="hs-track" data-hscroll-track style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {workProcess.steps.map((s, i) => (
              <li className="hs-card" key={s.title}>
                <span className="num">0{i + 1}</span>
                <span className="ttl">{s.title}</span>
                <span className="muted">{s.text}</span>
                <span className="get">You get {s.get}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap" style={{ width: "100%" }}><div className="hs-bar"><span data-hscroll-bar /></div></div>
      </div>
    </section>
  );
}

export function Ladder() {
  return (
    <div className="ladder" data-reveal>
      {pricing.ladder.map((r, i) => (
        <div className={`rung${r.highlight ? " hl" : ""}`} key={r.name} data-reveal-item data-tilt>
          <span className="step-n">{r.step} · {r.name}</span>
          <div className="amt"><small>{r.prefix}</small>{r.amount}<small>{r.suffix}</small></div>
          <span className="muted">{r.tagline}</span>
          <ul>{r.includes.map((x) => <li key={x}><Check /><span>{x}</span></li>)}</ul>
          <BookButton label={r.cta} variant={r.highlight ? "dark" : "primary"} className="" magnetic={false} />
          {i < pricing.ladder.length - 1 && <span className="arrow-next" aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" /></svg></span>}
        </div>
      ))}
    </div>
  );
}

export function ServiceRows({ group }: { group: string }) {
  return (
    <div className="rows" data-reveal>
      {services.filter((s) => s.group === group).map((s) => (
        <Link className="row" href={`/services/${s.slug}`} key={s.slug} data-reveal-item>
          <span className="t">{s.name}</span>
          <span className="d">{s.tagline}</span>
          <span className="price"><span className="muted">from</span> {s.price.amount}<ArrowNE className="arr" /></span>
        </Link>
      ))}
    </div>
  );
}
