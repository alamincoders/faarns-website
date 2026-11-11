import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 * Sends with Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set (see README).
 * Swap the fetch below for your own email/CRM provider if you prefer.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.name || !body?.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "FAARNS website <onboarding@resend.dev>";
  if (!key || !to) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const clean = (v: unknown) => String(v ?? "").slice(0, 4000);
  const text = [
    `Name: ${clean(body.name)}`,
    `Email: ${clean(body.email)}`,
    `Website: ${clean(body.site)}`,
    `Needs: ${Array.isArray(body.needs) ? body.needs.map(clean).join(", ") : ""}`,
    `Budget: ${clean(body.budget)}`,
    "",
    clean(body.message),
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: clean(body.email), subject: `New enquiry from ${clean(body.name)}`, text }),
  });
  if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
