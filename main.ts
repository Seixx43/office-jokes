// Entry for the make.fun bounty "Make the AI Judge Laugh: Office Jokes":
// reads ENTRY.md and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "ENTRY.md"), "utf8");
// The bounty caps the joke at 199 characters. Fail loudly instead of
// writing an entry that is too long to count.
if (entry.length > 199) {
  process.stderr.write(`office joke must be at most 199 characters, got ${entry.length}\n`);
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
process.stdout.write(entry);
