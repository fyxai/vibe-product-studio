import { readFile } from 'node:fs/promises';

const path = new URL('../data/signals.json', import.meta.url);
const data = JSON.parse(await readFile(path, 'utf8'));

console.log(`\n${data.project}`);
console.log('-'.repeat(data.project.length));
console.log(data.description);
console.log(`Items: ${data.items.length}\n`);

for (const [i, item] of data.items.slice(0, 10).entries()) {
  console.log(`${i + 1}. ${item.full_name} (${item.stars}★)`);
  console.log(`   ${item.html_url}`);
}
