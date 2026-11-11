// Builds dist/faarns-preview.html: one self-contained file from the Next.js build.
// Run: npm run build && node preview/build.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = path.resolve(fileURLToPath(import.meta.url), "../..");
const app = path.join(root, ".next/server/app");
const read = (p) => fs.readFileSync(p, "utf8");

const routes = { home: "index.html", services: "services.html", pricing: "pricing.html", about: "about.html", contact: "contact.html", careers: "careers.html" };
for (const f of fs.readdirSync(path.join(app, "services"))) if (f.endsWith(".html")) routes[f.replace(".html", "")] = `services/${f}`;

const pick = (html, re) => (html.match(re) || [])[1] || "";
const fixLinks = (html) =>
  html
    .replace(/href="\/#([a-z0-9-]+)"/g, 'href="#home--$1"')
    .replace(/href="\/services\/([a-z0-9-]+)"/g, 'href="#$1"')
    .replace(/href="\/([a-z0-9-]+)"/g, 'href="#$1"')
    .replace(/href="\/"/g, 'href="#home"')
    .replace(/<!--.*?-->/gs, "");

const pages = {};
for (const [k, f] of Object.entries(routes)) {
  const html = read(path.join(app, f));
  pages[k] = { title: pick(html, /<title>(.*?)<\/title>/s).replace(/&amp;/g, "&"), html: fixLinks(pick(html, /<main>([\s\S]*?)<\/main>/)) };
}
const index = read(path.join(app, "index.html"));
const bodyOpen = index.indexOf("<body");
const shellStart = index.indexOf(">", bodyOpen) + 1;
const mainStart = index.indexOf("<main>");
const mainEnd = index.indexOf("</main>") + 7;
const footerEnd = index.indexOf("</footer>") + 9;
const before = fixLinks(index.slice(shellStart, mainStart)).replace(/<script[\s\S]*?<\/script>/g, "");
const footer = fixLinks(index.slice(mainEnd, footerEnd));
const htmlClass = pick(index, /<html[^>]*class="([^"]*)"/);

let css = "";
for (const f of fs.readdirSync(path.join(root, ".next/static/css"))) css += read(path.join(root, ".next/static/css", f));
css = css.replace(/url\(\/_next\/static\/media\/([^)]+)\)/g, (_, f) => {
  const b64 = fs.readFileSync(path.join(root, ".next/static/media", f)).toString("base64");
  return `url(data:font/woff2;base64,${b64})`;
});

// Inline local images (/images/..., /work/...) as data URIs so the preview is one file.
const inlineImages = (html) =>
  html.replace(/src="(\/(?:images|work)\/[^"]+)"/g, (m, src) => {
    const file = path.join(root, "public", src);
    if (!fs.existsSync(file)) return m;
    const ext = path.extname(file).slice(1).replace("jpg", "jpeg");
    return `src="data:image/${ext};base64,${fs.readFileSync(file).toString("base64")}"`;
  });
for (const k of Object.keys(pages)) pages[k].html = inlineImages(pages[k].html);

const js = (await build({ entryPoints: [path.join(root, "preview/runtime.ts")], bundle: true, minify: true, format: "iife", write: false, target: "es2019" })).outputFiles[0].text;

const boot = pick(index, /<head>[\s\S]*?<script>([\s\S]*?)<\/script>/);
const out = `<!doctype html>
<html lang="en" class="${htmlClass}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#000000">
<title>${pages.home.title}</title>
<script>${boot}</script>
<style>${css}</style>
</head>
<body>
${before}<main></main>${footer}
<script>var PAGES=${JSON.stringify(pages).replace(/</g, "\\u003c")};</script>
<script>${js}</script>
</body>
</html>`;
fs.mkdirSync(path.join(root, "dist"), { recursive: true });
fs.writeFileSync(path.join(root, "dist/faarns-preview.html"), out);
console.log("dist/faarns-preview.html", (out.length / 1024).toFixed(0) + " kB");
