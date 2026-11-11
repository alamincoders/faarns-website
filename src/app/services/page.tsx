import type { Metadata } from "next";
import { PageHero, ServiceRows } from "@/components/Blocks";
import { home } from "@/content/site";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={home.services.headline} />
      <section className="sec sec-tight">
        <div className="wrap">
          <div className="head" data-reveal><p className="kicker" style={{ margin: 0 }}>AI automation</p></div>
          <ServiceRows group="AI automation" />
          <div className="head" data-reveal style={{ marginTop: "clamp(64px,8vw,110px)" }}><p className="kicker" style={{ margin: 0 }}>Growth</p></div>
          <ServiceRows group="Growth" />
        </div>
      </section>
    </>
  );
}
