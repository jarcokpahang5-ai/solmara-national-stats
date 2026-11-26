// DataNusa — hand-in program (Node 22, standard library only).
// It copies this repository's app/ and screenshots/ into the output
// directory and writes /output/dossier.json with the vendored make.fun
// library, exactly as the competition's kit prescribes. Outside the
// grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Determinism and output contract: this program reads only the files
// already committed in this repository (app/, screenshots/) and the
// vendored library; it performs no network access, reads no clock or
// environment state other than MAKEFUN_OUTPUT_DIR, and emits no
// timestamps or random values. Two runs from the same commit therefore
// produce byte-identical dossier.json files, and the only outputs are
// the copied app/ and screenshots/ trees plus dossier.json.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });
mkdirSync(join(outputDir, 'screenshots'), { recursive: true });
if (existsSync(join(repoRoot, 'screenshots'))) {
  cpSync(join(repoRoot, 'screenshots'), join(outputDir, 'screenshots'), { recursive: true });
}

// Caps from the scorer's reference: at most 4 screenshots of 256 KiB, at
// most 993 files and 16 MiB under app/, dossier text at most 160 KiB.
writeFileSync(
  join(outputDir, 'dossier.json'),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
