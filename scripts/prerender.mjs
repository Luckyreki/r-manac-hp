// Runs after `vite build`. Writes one static HTML file per route so that
// search engines and link previews (X, LINE, Facebook, Slack...) see the
// right title, description, canonical URL and a short text summary for each
// page without running JavaScript. React replaces the summary on load.
//
// Output: dist/<route>/index.html for every route, plus dist/404.html.
// Uses only Node built-ins, so it needs no extra dependencies.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  INDEX_ROBOTS,
  NOINDEX_ROBOTS,
  canonicalFor,
  notFoundMetadata,
  pageMetadata,
} from "../src/data/seo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = process.argv[2] ? resolve(process.argv[2]) : join(root, "dist");

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function replaceOnce(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: could not find ${label} in dist/index.html`);
  }
  return html.replace(pattern, replacement);
}

function setMetaContent(html, attribute, name, content) {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${name.replace(/[.:]/g, "\\$&")}"\\s+content=")[^"]*(")`);
  return replaceOnce(html, pattern, `$1${escapeHtml(content)}$2`, `${attribute}="${name}"`);
}

function renderPage(template, metadata, canonicalUrl) {
  let html = template;
  const robots = metadata.noindex ? NOINDEX_ROBOTS : INDEX_ROBOTS;

  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`, "<title>");
  html = setMetaContent(html, "name", "description", metadata.description);
  html = setMetaContent(html, "name", "robots", robots);
  html = setMetaContent(html, "name", "googlebot", robots);
  html = setMetaContent(html, "property", "og:title", metadata.title);
  html = setMetaContent(html, "property", "og:description", metadata.description);
  html = setMetaContent(html, "name", "twitter:title", metadata.title);
  html = setMetaContent(html, "name", "twitter:description", metadata.description);

  if (canonicalUrl) {
    html = setMetaContent(html, "property", "og:url", canonicalUrl);
    html = replaceOnce(
      html,
      /<\/title>/,
      `</title>\n    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
      "</title> (canonical)",
    );
  } else {
    html = html.replace(/\s*<meta\s+property="og:url"[^>]*>/, "");
  }

  const summary = `<p data-prerender>${escapeHtml(metadata.summary || metadata.description)}</p>`;
  html = replaceOnce(html, /<div id="root"><\/div>/, `<div id="root">${summary}</div>`, '<div id="root">');

  return html;
}

const template = await readFile(join(distDir, "index.html"), "utf8");
const written = [];

for (const [pathname, metadata] of Object.entries(pageMetadata)) {
  const html = renderPage(template, metadata, canonicalFor(pathname));
  const outFile = pathname === "/" ? join(distDir, "index.html") : join(distDir, pathname.slice(1), "index.html");
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  written.push(outFile.replace(`${distDir}/`, ""));
}

await writeFile(join(distDir, "404.html"), renderPage(template, notFoundMetadata, null));
written.push("404.html");

console.log(`prerender: wrote ${written.length} files -> ${written.join(", ")}`);
