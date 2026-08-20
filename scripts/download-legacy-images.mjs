import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const legacyHost = 'https://myeventmcp.com';
const urlPattern = /https:\/\/myeventmcp\.com\/wp-content\/uploads\/[^\s"'`)},]+/g;
const files = [
  'content/images.csv', 'src/pages/index.astro', 'src/pages/[slug].astro',
  'src/pages/silver-mcp-package.astro', 'src/components/SeoDirectory.astro',
  'src/components/SeoLanding.astro', 'src/styles/global.css',
];

const urls = new Set();
for (const file of files) {
  const content = await readFile(join(root, file), 'utf8');
  for (const url of content.match(urlPattern) ?? []) urls.add(url);
  for (const path of content.match(/\/legacy-images\/[^\s"'`)},]+/g) ?? []) {
    urls.add(`${legacyHost}/wp-content/uploads/${path.replace(/^\/legacy-images\//, '')}`);
  }
  for (const path of content.match(/\$\{imageBase\}\/[^}`\s]+/g) ?? []) {
    urls.add(`${legacyHost}/wp-content/uploads/${path.replace(/^\$\{imageBase\}\//, '')}`);
  }
}

let downloaded = 0;
const unavailable = [];
for (const url of urls) {
  const pathname = new URL(url).pathname.replace(/^\/wp-content\/uploads\//, '');
  const destination = join(publicDir, 'legacy-images', pathname);
  if (existsSync(destination)) continue;
  await mkdir(dirname(destination), { recursive: true });
  const response = await fetch(url);
  if (!response.ok) {
    unavailable.push(`${response.status} ${url}`);
    console.warn(`Unavailable legacy image: ${response.status} ${url}`);
    continue;
  }
  await writeFile(destination, Buffer.from(await response.arrayBuffer()));
  downloaded += 1;
  console.log(`Downloaded ${relative(root, destination)}`);
}

console.log(`Legacy image inventory: ${urls.size} referenced, ${downloaded} downloaded, ${unavailable.length} unavailable.`);
