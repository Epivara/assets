// Stamp the shared sidebar (_sidebar.html) into every guide page, between the
// <!-- SIDEBAR:START --> / <!-- SIDEBAR:END --> markers. Idempotent: edit the
// nav in ONE place (_sidebar.html) and run this to update every page.
//
// This handles the nav step only. The search index is built by Pagefind as the
// next step of `npm run build` (see package.json). Run standalone with:
//   node build.mjs        (or: npm run build:nav)

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const GUIDE = join(ROOT, "chatgpt-business-guide");
const PARTIAL = join(GUIDE, "_sidebar.html");

const START = "<!-- SIDEBAR:START -->";
const END = "<!-- SIDEBAR:END -->";

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const sidebar = readFileSync(PARTIAL, "utf8").replace(/\n+$/, "");
const pattern = new RegExp(`${escapeRegExp(START)}[\\s\\S]*?${escapeRegExp(END)}`);
const replacement = `${START}\n${sidebar}\n  ${END}`;

let changed = 0;
for (const name of readdirSync(GUIDE).sort()) {
  if (!name.endsWith(".html") || name === "_sidebar.html") continue;
  const path = join(GUIDE, name);
  const html = readFileSync(path, "utf8");
  if (!html.includes(START)) {
    console.warn(`  ! ${name}: no SIDEBAR marker, skipped`);
    continue;
  }
  const next = html.replace(pattern, replacement);
  if (next !== html) {
    writeFileSync(path, next);
    changed++;
  }
}

console.log(`sidebar: stamped into pages (${changed} updated)`);
