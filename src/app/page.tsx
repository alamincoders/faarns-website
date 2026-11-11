import Link from "next/link";
import { faqs, home, services } from "@/content/site";
import { BookButton } from "@/components/BookButton";
import { Kicker, Ladder, ProcessScroller } from "@/components/Blocks";
import { Faq } from "@/components/Faq";
import { Flow } from "@/components/Flow";
import { ArrowNE, Mark } from "@/components/Icons";
import { LightLines, Visual } from "@/components/Visuals";

/**
 * DEV NOTE (Homepage): sections run top to bottom in the order below.
 * Step 1 — Change words, prices or links in content/site.ts, not here.
 * Step 2 — Reorder sections by moving the blocks between the "SECTION" comments.
 * Step 3 — Animations come from data-* attributes (see lib/motion.ts header).
 */
export default function Home() {
  return (
    <>
      {/* SECTION: Hero — headline, CTAs and the tabbed automation demo (components/Flow.tsx) */}
      <section className="hero">
        <div className="glow a" aria-hidden="true" />
        <div data-parallax="-0.15" className="mark-bg" aria-hidden="true"><Mark outline /></div>
        <div className="wrap" style={{ position: "relative" }}>
          <div className="pill" data-intro=""><i />{home.eyebrow}</div>
          <h1 className="h1" style={{ marginTop: 30, maxWidth: "13em" }} data-split="hero">
            {home.headline[0]} <span className="grey">{home.headline[1]}</span>
          </h1>
          <div className="hero-grid">
            <p className="lede" data-intro="">{home.subhead}</p>
            <div data-intro="">
              <div className="cta-row">
                <BookButton />
                <Link className="btn btn-ghost" href={home.secondaryCta.href}>{home.secondaryCta.label}</Link>
              </div>
              <p className="proof">Trusted by <b><span className="count" data-count={home.proof.count}>{home.proof.count}</span>+</b> {home.proof.text}</p>
            </div>
          </div>
          <Flow />
        </div>
      </section>

      {/* SECTION: Tool marquee — edit tools in content/site.ts → home.stack.tools */}
      <div className="strip" aria-label="Tools we build on">
        <div className="wrap"><p>{home.stack.label}</p></div>
        <div className="marquee" data-marquee="34">
          <div className="track" data-marquee-track style={{ animation: "none" }}>
            {[0, 1].map((k) => (
              <div className="group" key={k} aria-hidden={k === 1}>{home.stack.tools.map((t) => <span key={t}>{t}</span>)}</div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: Why FAARNS — violet light lines sit behind the text (components/Visuals.tsx → LightLines) */}
      <section className="sec why">
        <LightLines />
        <div className="wrap two">
          <Kicker>{home.difference.label}</Kicker>
          <div>
            <h2 className="h2" data-scrub>{home.difference.headline}</h2>
            <p className="lede" style={{ marginTop: 32 }} data-reveal>{home.difference.body}</p>
          </div>
        </div>
      </section>

      {/* SECTION: What we build — sticky stacking cards */}
      <section className="sec sec-tight" id="automate">
        <div className="wrap">
          <div className="head" data-reveal><Kicker flush>{home.automate.label}</Kicker><h2 className="h2" style={{ maxWidth: "15em" }} data-split="scroll">{home.automate.headline}</h2></div>
          {/* Stacking cards: each card's illustration is chosen by `visual` in content/site.ts */}
          <div className="stack" data-stack>
            {home.automate.cards.map((c, i) => (
              <Link className="stack-card" href={c.link.href} key={c.team} data-stack-card data-cursor="Explore">
                <div>
                  <span className="num">0{i + 1} / 0{home.automate.cards.length}</span>
                  <span style={{ display: "block", marginTop: 14, fontSize: 14, fontWeight: 600, color: "var(--violet)" }}>{c.team}</span>
                  <h3 className="h3" style={{ marginTop: 12 }}>{c.tagline}</h3>
                  <ul style={{ marginTop: 22 }}>{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <span className="link" style={{ marginTop: 28 }}>{c.link.label}</span>
                </div>
                <Visual name={c.visual} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Then we grow it — rows with hover previews */}
      <section className="sec sec-tight">
        <div className="wrap">
          <div className="head" data-reveal><Kicker flush>{home.growth.label}</Kicker><h2 className="h2" style={{ maxWidth: "15em" }} data-split="scroll">{home.growth.headline}</h2></div>
          {/* Growth rows: desktop shows a floating preview that follows the cursor (data-hp); phones show it inline (.row-vis) */}
          <div style={{ position: "relative" }}>
            <div className="rows" data-reveal>
              {home.growth.rows.map((r, i) => (
                <Link className="row" href={r.href} key={r.title} data-reveal-item data-hp-row={i}>
                  <span className="t">{r.title}</span><span className="d">{r.text}</span><ArrowNE className="arr" />
                  <div className="row-vis"><Visual name={r.visual} /></div>
                </Link>
              ))}
            </div>
            <div className="hp" data-hp aria-hidden="true">
              <div className="hp-inner">
                {home.growth.rows.map((r) => <div className="hp-item" data-hp-item key={r.title}><Visual name={r.visual} /></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: How we work — pinned horizontal scroll on desktop */}
      <ProcessScroller />

      <section className="sec">
        <div className="wrap two">
          <div data-reveal>
            <Kicker>{home.services.label}</Kicker>
            <h2 className="h2" style={{ fontSize: "clamp(30px,3.6vw,52px)" }}>{home.services.headline}</h2>
            <Link className="btn btn-ghost" href="/services" style={{ marginTop: 28 }}>Browse all services</Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="chips" data-reveal>
              {services.map((s) => <Link key={s.slug} className={`chip${s.group === "AI automation" ? " fill" : ""}`} href={`/services/${s.slug}`} data-reveal-item>{s.name}</Link>)}
            </div>
            <div data-reveal style={{ border: "1px solid var(--line)", borderRadius: 20, padding: 26, background: "var(--surface)" }}>
              <p style={{ margin: "0 0 14px", fontSize: 18 }}>{home.services.integrations.title}</p>
              <p className="muted" style={{ margin: 0, fontSize: 15 }}>{home.services.integrations.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Work — live client sites */}
      <section className="sec sec-tight" id="work">
        <div className="wrap">
          <div className="head" data-reveal><Kicker flush>{home.work.label}</Kicker><h2 className="h2" data-split="scroll">{home.work.headline}</h2></div>
          {/* Work: browser-window previews of live client sites. Hover scrolls the preview. Add `image` in content/site.ts to use a real screenshot. */}
          <div className="work" data-reveal>
            {home.work.cases.map((c) => (
              <a className="site" href={c.url} target="_blank" rel="noopener" key={c.client} data-reveal-item data-cursor="Visit" style={{ ["--acc" as string]: c.accent }}>
                <div className="site-frame" data-tilt>
                  <div className="site-bar"><i /><i /><i /><span>{c.domain}</span></div>
                  <div className="site-view">
                    <div className="site-page">
                      {c.image ? <img src={c.image} alt={`${c.client} website`} loading="lazy" /> : (
                        <div className="mock" aria-hidden="true">
                          <div className="mock-nav"><b>{c.client}</b><span /><span /><span /><em /></div>
                          <small>{c.preview.kicker}</small>
                          <h4>{c.preview.headline}</h4>
                          <span className="mcta">{c.preview.cta}</span>
                          <div className="mock-hero" />
                          <div className="mock-tiles">{c.preview.tiles.map((x) => <div key={x}>{x}</div>)}</div>
                          <div className="mock-lines"><span /><span /><span /></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="site-meta"><span className="sector">{c.client} · {c.sector}</span><span className="visit">Visit site<ArrowNE /></span></div>
                <h3 className="h3">{c.result}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <div className="head split" data-reveal>
            <div><Kicker>{home.pricing.label}</Kicker><h2 className="h2">{home.pricing.headline[0]} <span className="grey">{home.pricing.headline[1]}</span></h2></div>
            <Link className="link" href="/pricing">See full pricing</Link>
          </div>
          <Ladder />
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap two">
          <div data-reveal>
            <Kicker>{home.faqLabel}</Kicker>
            <h2 className="h2" style={{ fontSize: "clamp(30px,3.6vw,52px)" }}>{home.faqHeadline}</h2>
            <p className="muted" style={{ marginTop: 24 }}>Something else? <Link className="link" href="/contact">Book a 30-minute call</Link> or <Link className="link" href="/contact">send us a message</Link>.</p>
          </div>
          <Faq items={faqs.home} />
        </div>
      </section>
    </>
  );
}
