import type { Metadata } from "next";
import { about } from "@/content/site";
import { Kicker, PageHero } from "@/components/Blocks";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.eyebrow} title={about.headline} sub={about.intro} />
      <section className="sec sec-tight"><div className="wrap">
        <div className="head" data-reveal><Kicker flush>{about.beliefsLabel}</Kicker><h2 className="h2" data-split="scroll">{about.beliefsHeadline}</h2></div>
        <div className="cells c4" data-reveal>
          {about.beliefs.map((b) => (
            <div className="card" style={{ minHeight: 240 }} key={b.title} data-reveal-item><h3 className="h3" style={{ marginTop: "auto" }}>{b.title}</h3><p className="muted" style={{ margin: 0 }}>{b.text}</p></div>
          ))}
        </div>
      </div></section>
      <section className="sec sec-tight"><div className="wrap two">
        <Kicker>{about.team.label}</Kicker>
        <p className="statement" data-scrub>{about.team.text} {about.team.muted}</p>
      </div></section>
    </>
  );
}
