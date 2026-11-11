"use client";
import { useState } from "react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq" data-reveal>
      {items.map((it, i) => (
        <div className={`qa${open === i ? " open" : ""}`} key={it.q}>
          <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span><span className="pm" aria-hidden="true" />
          </button>
          <div className="ans"><div><p>{it.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}
