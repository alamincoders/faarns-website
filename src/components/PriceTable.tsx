"use client";
import Link from "next/link";
import { useState } from "react";
import { pricing, services } from "@/content/site";

type Row = { name: string; amount: string; monthly: boolean; timeline: string; note: string; slug: string; fixed?: boolean };

export function PriceTable() {
  const [f, setF] = useState<"all" | "once" | "mo">("all");
  const rows: Row[] = [
    ...services.map((s) => ({ name: s.name, amount: s.price.amount, monthly: s.price.amount.includes("/mo"), timeline: s.price.timeline, note: s.price.note, slug: s.slug, fixed: s.price.label === "Fixed price" })),
    ...pricing.addOns,
  ];
  const shown = rows.filter((r) => f === "all" || (f === "mo" ? r.monthly : !r.monthly));
  return (
    <>
      <div className="head split" data-reveal>
        <div><p className="kicker">{pricing.tableLabel}</p><h2 className="h2">{pricing.tableHeadline}</h2></div>
        <div className="seg" role="group" aria-label="Filter prices">
          {([["all", "All"], ["once", "Projects"], ["mo", "Monthly"]] as const).map(([k, l]) => (
            <button key={k} type="button" aria-pressed={f === k} onClick={() => setF(k)}>{l}</button>
          ))}
        </div>
      </div>
      <div className="ptable" data-reveal>
        {shown.map((r) => (
          <div className="prow" key={r.name}>
            <span className="s"><Link href={`/services/${r.slug}`}>{r.name}</Link></span>
            <span className="p">{!r.fixed && <small>from</small>}{r.amount}</span>
            <span className="t">{r.timeline}</span>
            <span className="n">{r.note}</span>
          </div>
        ))}
      </div>
    </>
  );
}
