import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cliRoot = path.resolve(__dirname, '..');
const source = path.resolve(cliRoot, '..', 'templates');
const dest = path.resolve(cliRoot, 'dist', 'templates');

await fs.rm(dest, { recursive: true, force: true });
await fs.cp(source, dest, { recursive: true });
