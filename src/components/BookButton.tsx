import Link from "next/link";
import { settings } from "@/content/site";
import { Arrow } from "./Icons";

type Props = { label?: string; variant?: "primary" | "dark"; className?: string; arrow?: boolean; magnetic?: boolean };

/** The one CTA. Uses settings.bookingUrl when set, otherwise /contact. */
export function BookButton({ label = settings.ctaLabel, variant = "primary", className = "", arrow = true, magnetic = true }: Props) {
  const cls = `btn ${variant === "dark" ? "btn-dark" : "btn-primary"} ${className}`;
  const inner = (<>{label}{arrow && <Arrow />}</>);
  const m = magnetic ? { "data-magnetic": "" } : {};
  if (settings.bookingUrl) {
    return <a className={cls} href={settings.bookingUrl} target="_blank" rel="noopener" {...m}>{inner}</a>;
  }
  return <Link className={cls} href="/contact" {...m}>{inner}</Link>;
}
