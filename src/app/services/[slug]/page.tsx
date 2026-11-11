import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/site";
import { BookButton } from "@/components/BookButton";
import { Kicker, ProcessScroller } from "@/components/Blocks";
import { Faq } from "@/components/Faq";
import { Check, Mark } from "@/components/Icons";
import { Visual } from "@/components/Visuals";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return s ? { title: s.name, description: s.subhead } : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const fixed = s.price.label === "Fixed price";
  return (
    <>
      <section className="hero">
        <div className="glow a" aria-hidden="true" />
        <div data-parallax="-0.15" className="mark-bg" aria-hidden="true"><Mark outline /></div>
        <div className="wrap" style={{ position: "relative" }}>
          <Link className="pill" href="/services" data-intro=""><i />{s.group} / {s.name}</Link>
          <h1 className="h1" style={{ marginTop: 30, maxWidth: "12em", fontSize: "clamp(40px,7vw,108px)" }} data-split="hero">{s.headline}</h1>
          <div className="hero-grid">
            <div data-intro="">
              <p className="lede">{s.subhead}</p>
              <div className="cta-row" style={{ marginTop: 32 }}>
                <BookButton />
                <Link className="btn btn-ghost" href="/pricing">See all pricing</Link>
              </div>
            </div>
            <div className="svc-price" data-intro="" data-tilt>
              <span className="muted" style={{ fontSize: 14 }}>{s.price.label}</span>
              <div className="amt">{!fixed && <small>from </small>}{s.price.amount}</div>
              <span>{s.price.timeline}</span>
              <span className="muted" style={{ fontSize: 15 }}>{s.price.note}</span>
            </div>
          </div>
        </div>
      </section>

      {/* DEV NOTE: the illustration for each service is set by `visual` on the service in content/site.ts */}
      <section className="sec sec-tight">
        <div className="wrap svc-visual" data-reveal><Visual name={s.visual} /></div>
      </section>

      {s.problem && (
        <section className="sec sec-tight">
          <div className="wrap two" style={{ borderTop: "1px solid var(--line-2)", paddingTop: 56 }}>
            <Kicker>{s.problemLabel}</Kicker>
            <p className="statement" data-scrub>{s.problem}</p>
          </div>
        </section>
      )}

      <section className="sec sec-tight">
        <div className="wrap">
          <div className="head" data-reveal><Kicker flush>What you get</Kicker><h2 className="h2" data-split="scroll">Everything included.</h2></div>
          <div className="cells c3" data-reveal>
            {s.deliverables.map((g) => <div className="deliv" key={g} data-reveal-item><Check /><span>{g}</span></div>)}
          </div>
        </div>
      </section>

      <div style={{ height: "clamp(80px,11vw,140px)" }} />
      <ProcessScroller />
      <div style={{ height: "clamp(80px,11vw,140px)" }} />

      <section className="sec sec-tight">
        <div className="wrap">
          <div className="result" data-reveal>
            <div className="glow" aria-hidden="true" />
            <p className="kicker" style={{ position: "relative" }}>Results to expect</p>
            <p data-scrub>{s.results}</p>
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap two">
          <div data-reveal><Kicker>FAQ</Kicker><h2 className="h2" style={{ fontSize: "clamp(30px,3.6vw,52px)" }}>Good questions. Straight answers.</h2></div>
          <Faq items={s.faq} />
        </div>
      </section>
    </>
  );
}
