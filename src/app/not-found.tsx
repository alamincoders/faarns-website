import Link from "next/link";
export default function NotFound() {
  return (
    <section className="hero"><div className="wrap">
      <h1 className="h1" style={{ fontSize: "clamp(40px,7vw,104px)" }}>This page doesn’t exist.</h1>
      <p className="lede" style={{ marginTop: 24 }}>Head back to the homepage to find what you need.</p>
      <Link className="btn btn-primary" href="/" style={{ marginTop: 32 }}>Go to the homepage</Link>
    </div></section>
  );
}
