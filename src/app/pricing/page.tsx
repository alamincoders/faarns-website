import type { Metadata } from "next";
import { faqs, pricing } from "@/content/site";
import { Kicker, Ladder, PageHero } from "@/components/Blocks";
import { Faq } from "@/components/Faq";
import { PriceTable } from "@/components/PriceTable";

export const metadata: Metadata = { title: "Pricing", description: pricing.subhead };

export default function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing" title={pricing.headline[0]} muted={pricing.headline[1]} sub={pricing.subhead} />
      <section className="sec sec-tight"><div className="wrap">
        <div className="head" data-reveal><Kicker flush>{pricing.ladderLabel}</Kicker><h2 className="h2" style={{ maxWidth: "16em" }} data-split="scroll">{pricing.ladderHeadline}</h2></div>
        <Ladder />
      </div></section>
      <section className="sec sec-tight" id="all-prices"><div className="wrap"><PriceTable /></div></section>
      <section className="sec sec-tight"><div className="wrap">
        <div className="head" data-reveal><Kicker flush>{pricing.promisesLabel}</Kicker><h2 className="h2" data-split="scroll">{pricing.promisesHeadline}</h2></div>
        <div className="promises" data-reveal>{pricing.promises.map((p) => <div key={p.title} data-reveal-item><b>{p.title}</b><span>{p.text}</span></div>)}</div>
      </div></section>
      <section className="sec sec-tight"><div className="wrap two">
        <div data-reveal><Kicker>FAQ</Kicker><h2 className="h2" style={{ fontSize: "clamp(30px,3.6vw,52px)" }}>Good questions. Straight answers.</h2></div>
        <Faq items={faqs.pricing} />
      </div></section>
    </>
  );
}
