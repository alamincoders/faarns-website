"use client";
/**
 * DEV NOTE (Hero demo): the scenarios and their steps come from content/site.ts → home.flow.
 * The animation itself lives in lib/motion.ts → initFlow (shared with the single-file preview).
 */
import { useEffect, useRef } from "react";
import { home } from "@/content/site";
import { initFlow } from "@/lib/motion";
import { Check } from "./Icons";

export function Flow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => (ref.current ? initFlow(ref.current) : undefined), []);
  const first = home.flow.scenarios[0];
  return (
    <div className="flow" ref={ref} data-intro="" data-flow={JSON.stringify(home.flow)} aria-label="Examples of what we automate">
      <div className="flow-tabs" role="tablist" aria-label="Choose an example">
        {home.flow.scenarios.map((s, i) => (
          <button key={s.tab} type="button" role="tab" aria-selected={i === 0} data-flow-tab>{s.tab}</button>
        ))}
      </div>
      <div className="flow-top">
        <span className="status"><i aria-hidden="true" /><span data-flow-status>{first.steps[0].status}</span></span>
        <span>{home.flow.title}</span>
      </div>
      <div className="steps">
        {first.steps.map((s, i) => (
          <div className="step" data-flow-step key={i}>
            <div className="n">Step {i + 1}<Check /></div>
            <h4>{s.title}</h4><p>{s.text}</p><div className="bar" />
          </div>
        ))}
      </div>
    </div>
  );
}
