import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import "./visuals.css";
import { Nav } from "@/components/Nav";
import Footer from "@/components/layout/Footer";
import { MotionProvider } from "@/components/MotionProvider";

// Archivo variable (weight 100–900, width 62–125%), self-hosted so builds work anywhere.
const archivo = localFont({ src: "./fonts/Archivo-Variable.woff2", variable: "--font-archivo", display: "swap", weight: "100 900", declarations: [{ prop: "font-stretch", value: "62% 125%" }] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "FAARNS — AI automation and growth, under one roof", template: "%s — FAARNS" },
  description: "FAARNS builds AI agents and automations that answer leads, run operations and cut busywork, plus the website, search and ads that bring in more customers.",
  openGraph: { type: "website", siteName: "FAARNS" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#000000" };

// Runs before paint: hides split headlines until motion starts (with a safety timeout),
// and skips the preloader for visitors who already saw it this session.
const boot = `(function(){var d=document.documentElement;try{if(sessionStorage.getItem('faarns-intro')==='1')d.classList.add('pre-seen')}catch(e){}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){d.classList.remove('motion')},4500)}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${GeistSans.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: boot }} /></head>
      <body>
        <MotionProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
