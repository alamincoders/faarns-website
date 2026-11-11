import type { Metadata } from "next";
import { contact, settings } from "@/content/site";
import { BookButton } from "@/components/BookButton";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact", description: contact.subhead };

export default function ContactPage() {
  return (
    <section className="hero">
      <div className="glow a" aria-hidden="true" />
      <div className="wrap two" style={{ position: "relative", alignItems: "start" }}>
        <div>
          <div className="pill" data-intro=""><i />{contact.eyebrow}</div>
          <h1 className="h1" style={{ marginTop: 30, fontSize: "clamp(40px,6vw,88px)" }} data-split="hero">{contact.headline}</h1>
          <p className="lede" style={{ marginTop: 28 }} data-intro="">{contact.subhead}</p>
          {settings.bookingUrl && <div style={{ marginTop: 32 }} data-intro=""><BookButton /></div>}
          <p className="kicker" style={{ marginTop: 48 }}>{contact.callLabel}</p>
          <ol className="callsteps" data-reveal>
            {contact.callSteps.map((c, i) => <li key={c} data-reveal-item><b>{i + 1}</b><span>{c}</span></li>)}
          </ol>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
