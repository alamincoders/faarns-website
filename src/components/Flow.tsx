"use client";
import { useEffect, useRef } from "react";
import { home } from "@/content/site";
import { initFlow } from "@/lib/motion";
import { Check } from "./Icons";

export function Flow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    return initFlow(ref.current, home.flow.steps.map((s) => s.status), home.flow.doneStatus);
  }, []);
  return (
    <div className="flow" ref={ref} data-intro="" aria-label="Example: how an AI sales agent handles a new lead">
      <div className="flow-top">
        <span className="status"><i aria-hidden="true" /><span data-flow-status>{home.flow.steps[0].status}</span></span>
        <span>{home.flow.title}</span>
      </div>
      <div className="steps">
        {home.flow.steps.map((s, i) => (
          <div className="step" data-flow-step key={s.title}>
            <div className="n">Step {i + 1}<Check /></div>
            <h4>{s.title}</h4><p>{s.text}</p><div className="bar" />
          </div>
        ))}
      </div>
    </div>
  );
}
