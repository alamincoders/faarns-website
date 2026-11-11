import Link from "next/link";
import Image from "next/image";
import { faqs, home, services } from "@/content/site";
import { BookButton } from "@/components/BookButton";
import { Kicker, Ladder, ProcessScroller } from "@/components/Blocks";
import { Faq } from "@/components/Faq";
import { Flow } from "@/components/Flow";
import { ArrowNE, Mark } from "@/components/Icons";
import { HoverImageLinks } from "@/components/HoverImageLinks";

export default function Home() {
  return (
    <>
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

      <section className="sec why-faarns-sec">
        <div className="wrap two">
          <div className="why-faarns-left">
            <Kicker>{home.difference.label}</Kicker>
            {/* Watermark logo with subtle ambient glow */}
            <div className="why-faarns-watermark" aria-hidden="true" data-parallax="-0.08">
              <div className="why-faarns-glow" />
              <div className="why-faarns-logo">
                <Mark outline />
              </div>
            </div>
          </div>
          <div>
            <h2 className="h2" data-scrub>{home.difference.headline}</h2>
            <p className="lede" style={{ marginTop: 32 }} data-reveal>{home.difference.body}</p>
          </div>
        </div>
      </section>

      <section className="sec sec-tight" id="automate">
        <div className="wrap">
          <div className="head" data-reveal>
            <Kicker flush>{home.automate.label}</Kicker>
            <h2 className="h2" style={{ maxWidth: "16em" }} data-split="scroll">
              {home.automate.headline}
            </h2>
          </div>
          <div className="stack" data-stack>
            {home.automate.cards.map((c, i) => (
              <Link
                href={c.href}
                className={`stack-card stack-card-v${(i % 5) + 1}`}
                key={c.team}
                data-stack-card
                data-cursor="Explore"
              >
                <div className="stack-card-content">
                  <div className="stack-card-badge-row">
                    <span className="stack-card-num">0{i + 1}</span>
                    <span className="stack-card-team">{c.team}</span>
                  </div>
                  <h3 className="h3 stack-card-title">{c.tagline}</h3>
                  <ul className="stack-card-bullets">
                    {c.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="stack-card-footer">
                    <span className="stack-card-link">
                      <span>Explore {c.team}</span>
                      <ArrowNE className="arr" />
                    </span>
                  </div>
                </div>
                <div className="stack-card-visual">
                  <div className="stack-card-glow" aria-hidden="true" />
                  <div className="stack-card-img-wrap">
                    <Image
                      src={c.image}
                      alt={c.team}
                      width={640}
                      height={400}
                      className="stack-card-img"
                      priority={i === 0}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <div className="head" data-reveal><Kicker flush>{home.growth.label}</Kicker><h2 className="h2" style={{ maxWidth: "15em" }} data-split="scroll">{home.growth.headline}</h2></div>
          <HoverImageLinks items={home.growth.rows} />
        </div>
      </section>

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

      <section className="sec sec-tight" id="work">
        <div className="wrap">
          <div className="head" data-reveal><Kicker flush>{home.work.label}</Kicker><h2 className="h2" data-split="scroll">{home.work.headline}</h2></div>
          <div className="work" data-reveal>
            {home.work.cases.map((c) => {
              const inner = (
                <>
                  {c.image && <Image src={c.image} alt={c.client} fill sizes="(max-width: 768px) 100vw, 33vw" />}
                  <div className="initial" aria-hidden="true">{c.client.charAt(0)}</div>
                  <div><span className="sector">{c.client} · {c.sector}</span><h3 className="h3">{c.result}</h3></div>
                </>
              );
              return c.href
                ? <Link className="case" href={c.href} key={c.client} data-reveal-item data-tilt data-cursor="View">{inner}</Link>
                : <article className="case" key={c.client} data-reveal-item data-tilt data-cursor={c.client}>{inner}</article>;
            })}
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
