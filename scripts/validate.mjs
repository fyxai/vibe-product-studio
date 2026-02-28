import { readFile } from 'node:fs/promises';

const path = new URL('../data/signals.json', import.meta.url);
const data = JSON.parse(await readFile(path, 'utf8'));

if (!Array.isArray(data.items)) {
  throw new Error('Invalid data/signals.json: items must be an array');
}

for (const item of data.items) {
  if (!item.full_name || !item.html_url) {
    throw new Error('Invalid item: missing full_name or html_url');
  }
}

console.log(`Validated ${data.items.length} items in data/signals.json`);
