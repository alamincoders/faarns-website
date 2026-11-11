import type { Metadata } from "next";
import Link from "next/link";
import { careers } from "@/content/site";
import { Kicker, PageHero } from "@/components/Blocks";
import { ArrowNE } from "@/components/Icons";

export const metadata: Metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow={careers.eyebrow} title={careers.headline[0]} muted={careers.headline[1]} sub={careers.subhead} />
      <section className="sec sec-tight"><div className="wrap">
        <figure className="photo-band" data-reveal style={{ margin: 0 }}>
          <img src={careers.photo.src} alt={careers.photo.alt} data-parallax="-0.08" />
        </figure>
      </div></section>
      <section className="sec sec-tight"><div className="wrap">
        <div className="head" data-reveal><Kicker flush>{careers.perksLabel}</Kicker></div>
        <div className="chips" data-reveal>{careers.perks.map((p) => <span className="chip" key={p} data-reveal-item>{p}</span>)}</div>
      </div></section>
      {careers.roles.length > 0 && (
        <section className="sec sec-tight"><div className="wrap">
          <div className="head" data-reveal><Kicker flush>Open roles</Kicker></div>
          <div className="rows" data-reveal>
            {careers.roles.map((r) => (
              <Link className="row" href={r.href} key={r.title} data-reveal-item><span className="t">{r.title}</span><span className="d">{r.team} · Remote · {r.type}</span><ArrowNE className="arr" /></Link>
            ))}
          </div>
        </div></section>
      )}
    </>
  );
}
