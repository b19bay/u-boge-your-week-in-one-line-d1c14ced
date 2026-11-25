// Your Week in One Line — u-boge-your-week-in-one-line-d1c14ced
// Writes one line (at most 100 characters) summing up the entrant's week
// to <MAKEFUN_OUTPUT_DIR>/entry.txt. Deterministic: no clock, no random,
// no environment-dependent value reaches the output.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I spent the week writing jokes for a judge who scores me in secret and pays me in cents.";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 100) {
    console.error(`line is ${LINE.length} characters, must be 1-100`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("line must be non-whitespace and a single line");
    process.exit(1);
  }
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  // Read back and verify: the file must be byte-identical to the line,
  // exactly 88 bytes, with no trailing newline added by the write.
  const back = readFileSync(target, "utf8");
  if (back !== LINE || Buffer.byteLength(back, "utf8") !== 88) {
    console.error("read-back mismatch: entry.txt is not the 88-byte line");
    process.exit(1);
  }
}

main();
