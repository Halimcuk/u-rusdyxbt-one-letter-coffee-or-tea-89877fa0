// One Letter: Coffee or Tea — entry program.
//
// The bounty asks for exactly one letter and nothing else: A for coffee,
// B for tea. This entry picks A, coffee — the bolder drink, the one that
// lands as the more vivid, funnier and truer answer in a single letter.
//
// The program writes that single letter to entry.txt in the harness output
// directory and verifies it read it back exactly, with no newline, no
// space and no punctuation beside it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one letter this entry sends: A, for coffee.
const LETTER = "A";

// Where the harness expects the answer: the output directory named by the
// environment, or the sandbox output folder. An empty value counts as
// unset, so the sandbox folder is used instead.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output";
const entryPath = join(outputDir, "entry.txt");

// Deterministic: every run writes the same single letter, so two runs of
// the entry always produce the same answer file.
mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, LETTER, "utf8");

// Read it back and confirm the file holds exactly the one letter, so a
// bad write is caught at once instead of silently passing the gate.
const written = readFileSync(entryPath, "utf8");
if (written !== LETTER) {
  throw new Error(`entry.txt must hold exactly one letter, got ${JSON.stringify(written)}`);
}

console.log(`Wrote one letter to ${entryPath}: ${LETTER} (coffee)`);
