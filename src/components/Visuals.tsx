/**
 * DEV NOTE (Visuals): code-drawn illustrations in the FAARNS dark style.
 * They replace stock screenshots, so they never go blurry, need no licence and match the theme.
 *
 * Step 1 — Use one:      <Visual name="website" />
 * Step 2 — Add a new one: add a case to the switch below and its styles in app/visuals.css (search "vis-<name>").
 * Step 3 — Use a photo instead: pass `photo="/images/your.jpg"`; it gets the same dark violet treatment.
 *
 * Every illustration is decorative (aria-hidden). Real meaning always lives in the text next to it.
 */
import { Mark } from "./Icons";

export type VisualName = "website" | "search" | "ads" | "brand" | "ui" | "chat" | "crm" | "audit" | "answer" | "vision";

export function Visual({ name, photo, className = "" }: { name: string; photo?: string; className?: string }) {
  return (
    <div className={`vis vis-${name} ${className}`} aria-hidden="true">
      {render(name as VisualName, photo)}
    </div>
  );
}

function render(name: VisualName, photo?: string) {
  switch (name) {
    case "website":
      return (
        <div className="v-browser">
          <div className="v-bar"><i /><i /><i /><span>yourbrand.com</span></div>
          <div className="v-page">
            <div className="v-nav"><b /><span /><span /><span /><em /></div>
            <div className="v-h">A site that sells.</div>
            <div className="v-sub" />
            <div className="v-cta">Book a call</div>
            <div className="v-tiles"><div /><div /><div /></div>
          </div>
          <svg className="v-cursor" viewBox="0 0 24 24"><path d="M4 2l16 10-7 1.5L9.5 21z" fill="#fff" stroke="#000" strokeWidth="1" /></svg>
        </div>
      );
    case "search":
      return (
        <div className="v-search">
          <div className="v-grid" />
          <div className="v-big">Optimize<br />your <span>SEO</span></div>
          <div className="v-pill"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m20 20-4-4" stroke="currentColor" strokeWidth="2" /></svg><span className="v-type">Keyword matters</span></div>
          <ol className="v-results">
            <li className="top"><b>1</b>yourbrand.com</li>
            <li><b>2</b>competitor.com</li>
            <li><b>3</b>another-site.com</li>
          </ol>
        </div>
      );
    case "ads":
      return (
        <div className="v-ads">
          <div className="v-rule"><span className="v-av" /><div><small>⚡ Rule</small><p>Pause underperforming ads</p></div></div>
          <div className="v-panel">
            <div className="v-chips"><span>❚❚ Pause ads</span><span>🔔 Notify</span></div>
            <div className="v-row"><b>ROAS</b><span>Last 3 days</span><span>is below</span><em>1.5</em></div>
            <div className="v-row"><b>Cost per lead</b><span>Today</span><span>is above</span><em>target</em></div>
          </div>
          <div className="v-src"><span>f</span><div><b>Meta Ads</b><small>Synced every hour</small></div></div>
        </div>
      );
    case "brand":
      return (
        <div className="v-brand">
          <div className="v-orb"><Mark /></div>
          <span className="v-tag t1">strategy</span><span className="v-tag t2">identity</span><span className="v-tag t3">voice</span>
        </div>
      );
    case "ui":
      return (
        <div className="v-ui">
          <div className="v-win">
            <div className="v-bar"><i /><i /><i /></div>
            <div className="v-canvas">
              <div className="v-art a1" />
              <div className="v-card c1"><div className="v-art a2" /><span /><span /></div>
              <div className="v-card c2"><span /><span /><div className="v-art a3" /></div>
              <div className="v-sel"><i /><i /><i /><i /><em>Select</em></div>
            </div>
          </div>
        </div>
      );
    case "chat":
      return (
        <div className="v-chat">
          <div className="v-head"><span className="v-dot" />AI agent · online</div>
          <div className="v-msg in">Do you have a table for 4 tonight?</div>
          <div className="v-msg out">Yes, 8:00 PM is free. Want me to book it?</div>
          <div className="v-msg in">Perfect, book it.</div>
          <div className="v-typing"><i /><i /><i /></div>
          <div className="v-channels"><span>Website</span><span>WhatsApp</span><span>Messenger</span><span>Email</span></div>
        </div>
      );
    case "crm":
      return (
        <div className="v-crm">
          {["New", "Qualified", "Booked"].map((c, i) => (
            <div className="v-col" key={c}>
              <small>{c}</small>
              <div className="v-lead"><span /><b /></div>
              {i < 2 && <div className="v-lead"><span /><b /></div>}
              {i === 0 && <div className="v-lead move"><span /><b /></div>}
            </div>
          ))}
        </div>
      );
    case "audit":
      return (
        <div className="v-audit">
          <small>Your automation plan</small>
          {["Lead replies", "Follow-ups", "Invoicing", "Weekly reports"].map((t, i) => (
            <div className="v-item" key={t}><b>{i + 1}</b><span>{t}</span><em className={i < 2 ? "hi" : ""}>{i < 2 ? "High impact" : "Next"}</em></div>
          ))}
        </div>
      );
    case "answer":
      return (
        <div className="v-answer">
          <div className="v-q">What’s the best AI automation agency for startups?</div>
          <div className="v-a"><span /><span /><span className="short" /></div>
          <div className="v-cite"><Mark />yourbrand.com</div>
        </div>
      );
    case "vision":
      return (
        <div className="v-photo">
          <img src={photo || "/images/ai-vision.jpg"} alt="" loading="lazy" />
          <div className="v-scan" />
          <span className="v-live">● Live · AI vision</span>
        </div>
      );
    default:
      return photo ? <div className="v-photo"><img src={photo} alt="" loading="lazy" /></div> : null;
  }
}

/**
 * DEV NOTE (Light lines): animated violet light curves, drawn in SVG so they stay sharp and licence-free.
 * Place it inside any `position: relative` section. Tweak colors in app/visuals.css (search ".lines").
 */
export function LightLines({ className = "" }: { className?: string }) {
  return (
    <svg className={`lines ${className}`} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="lg1" x1="0" x2="1">
          <stop offset="0" stopColor="#A58BFF" stopOpacity="0" />
          <stop offset=".45" stopColor="#A58BFF" stopOpacity=".9" />
          <stop offset="1" stopColor="#6E54E8" stopOpacity=".15" />
        </linearGradient>
        <filter id="lglow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <g fill="none" strokeLinecap="round">
        <path className="l l1" d="M80 -40 C 220 260, 420 300, 640 300 S 1100 300, 1280 300" stroke="url(#lg1)" strokeWidth="44" opacity=".16" filter="url(#lglow)" />
        <path className="l l2" d="M210 -40 C 330 220, 470 300, 640 300 S 1100 300, 1280 300" stroke="url(#lg1)" strokeWidth="26" opacity=".22" filter="url(#lglow)" />
        <path className="l l3" d="M-80 300 L 640 300 C 820 300, 980 360, 1120 640" stroke="url(#lg1)" strokeWidth="40" opacity=".16" filter="url(#lglow)" />
        <path className="l l4" d="M-80 300 L 640 300 C 780 300, 900 380, 1000 640" stroke="url(#lg1)" strokeWidth="22" opacity=".22" filter="url(#lglow)" />
        <path className="core" d="M-80 300 L 1280 300" stroke="#D8CCFF" strokeWidth="1.5" opacity=".9" />
        <path className="spark" d="M-80 300 L 1280 300" stroke="#FFFFFF" strokeWidth="2.5" />
      </g>
    </svg>
  );
}