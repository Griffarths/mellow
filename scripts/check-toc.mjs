// Run after `next build` (the "build" script, on Vercel too): every entry of
// an article's table of contents (components/blog/TocBar.tsx) must lead to a
// heading of that article. Otherwise the build fails and the site stays on
// its previous version, instead of publishing a table of contents whose links
// lead nowhere (as happened in French, when the anchors were computed on a
// heading text that differed from the rendered one).
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), ".next/server/app");

function* blogPages(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* blogPages(p);
    else if (e.name.endsWith(".html") && p.split(path.sep).includes("blog")) yield p;
  }
}

const decodeHtml = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));

// The table of contents travels in the page's React data, as a JSON string
// inside a script: {"headings":[{"level":2,"text":"…","slug":"…"},…],"label":…}
const TOC = /\\"headings\\":\[(.*?)\],\\"label\\"/s;
const SLUG = /\\"slug\\":\\"(.*?)\\"/g;
const unescape = (s) => JSON.parse(`"${s.replace(/\\\\/g, "\\")}"`);

let blog = 0, articles = 0, links = 0;
const broken = [];
for (const file of blogPages(ROOT)) {
  blog++;
  const html = fs.readFileSync(file, "utf8");
  const toc = TOC.exec(html);
  if (!toc) continue;
  articles++;
  const ids = new Set([...html.matchAll(/<h[23][^>]*\sid="([^"]+)"/g)].map((m) => decodeHtml(m[1])));
  for (const m of toc[1].matchAll(SLUG)) {
    links++;
    const slug = unescape(m[1]);
    if (!ids.has(slug)) broken.push(`${path.relative(ROOT, file)} → #${slug}`);
  }
}

if (!blog || !articles) {
  console.error(
    `check-toc: ${blog} blog pages, ${articles} tables of contents found in .next/server/app: has the build output or TocBar's data changed?`,
  );
  process.exit(1);
}
if (broken.length) {
  console.error(`check-toc: ${broken.length} table of contents link(s) leading to no heading:`);
  for (const b of broken.slice(0, 50)) console.error(`  ${b}`);
  process.exit(1);
}
console.log(`check-toc: ${links} table of contents links checked in ${articles} articles, all OK`);
