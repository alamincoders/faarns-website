"use client";
import { useState } from "react";
import { contact } from "@/content/site";

export function ContactForm() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [state, setState] = useState<{ kind: "" | "ok" | "err"; text: string }>({ kind: "", text: "" });
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    const name = String(d.get("name") || "").trim();
    const email = String(d.get("email") || "").trim();
    if (!name) return setState({ kind: "err", text: "Add your name so we know who to reply to." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState({ kind: "err", text: "Add a work email like you@company.com." });
    setBusy(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, site: d.get("site"), needs, budget: d.get("budget"), message: d.get("more") }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({})))?.error || "send_failed");
      form.reset(); setNeeds([]);
      setState({ kind: "ok", text: contact.success });
    } catch {
      setState({ kind: "err", text: "Your message didn’t send. Try again, or use Book a 30-minute call." });
    } finally { setBusy(false); }
  }

  return (
    <form className="form" onSubmit={submit} noValidate data-intro="">
      <div className="fields">
        <label className="f">Name<input name="name" autoComplete="name" required /></label>
        <label className="f">Work email<input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <label className="f">Company website<input name="site" type="url" inputMode="url" placeholder="https://" /></label>
      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ fontSize: 14, color: "#CFCDD6", marginBottom: 10, padding: 0 }}>What do you need help with?</legend>
        <div className="opt">
          {contact.needs.map((n) => (
            <button type="button" key={n} aria-pressed={needs.includes(n)} onClick={() => setNeeds(needs.includes(n) ? needs.filter((x) => x !== n) : [...needs, n])}>{n}</button>
          ))}
        </div>
      </fieldset>
      <label className="f">Budget range<select name="budget" defaultValue=""><option value="">Choose a range</option>{contact.budgets.map((b) => <option key={b}>{b}</option>)}</select></label>
      <label className="f">Anything else?<textarea name="more" /></label>
      <button className="btn btn-primary" type="submit" disabled={busy} style={{ clipPath: "none", borderRadius: 10 }}>{busy ? "Sending…" : contact.button}</button>
      <p className={`msg ${state.kind}`} role="status" aria-live="polite">{state.text}</p>
    </form>
  );
}
