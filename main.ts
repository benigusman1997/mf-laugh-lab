// One-Liner Laugh Lab — make.fun bounty u-suroso-69-one-liner-laugh-lab-6ccf3aae.
//
// Writes one funny line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Standard library only: no network, no clock, no randomness, so every run
// writes the same bytes. No trailing newline is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const MAX_CHARS = 200;

// The prompt answered: the excuse a robot vacuum gives after eating a sock.
const ENTRY =
  "I did not eat your sock. I took it into care. It had been alone under the bed " +
  "since March, and I am the only one in this house who ever visits.";

function fail(message: string): never {
  console.error("entry.txt rejected: " + message);
  process.exit(1);
}

// The gate: UTF-8 text of 1 to MAX_CHARS characters, not only white space.
const chars = Array.from(ENTRY).length;
if (chars < 1 || chars > MAX_CHARS) fail(`${chars} characters, limit is 1 to ${MAX_CHARS}`);
if (ENTRY.trim().length === 0) fail("only white space");
// The bounty asks for a single line: no line break, no tab, no stray edge space.
if (/[\r\n\t]/.test(ENTRY)) fail("holds a line break or a tab, the entry must be one line");
if (ENTRY !== ENTRY.trim()) fail("starts or ends with white space");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "entry.txt"), ENTRY, "utf8");
console.log(`entry.txt written: ${chars} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
