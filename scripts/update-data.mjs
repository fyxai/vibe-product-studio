import { readFile, writeFile } from 'node:fs/promises';

const seedPath = new URL('../data/seed.json', import.meta.url);
const outPath = new URL('../data/signals.json', import.meta.url);

const seed = JSON.parse(await readFile(seedPath, 'utf8'));
const query = encodeURIComponent(seed.source.query);
const url = `https://api.github.com/search/repositories?q=${query}&sort=updated&order=desc&per_page=20`;

const res = await fetch(url, {
  headers: {
    'User-Agent': 'openclaw-skeleton-updater',
    'Accept': 'application/vnd.github+json'
  }
});

if (!res.ok) {
  throw new Error(`GitHub API failed: ${res.status} ${res.statusText}`);
}

const payload = await res.json();
const items = (payload.items || [])
  .map((r) => ({
    id: r.id,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description || '',
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language || 'Unknown',
    pushed_at: r.pushed_at,
    updated_at: r.updated_at
  }))
  .sort((a, b) => b.stars - a.stars || a.full_name.localeCompare(b.full_name))
  .slice(0, 15);

const output = {
  project: seed.project,
  description: seed.description,
  source: seed.source,
  total_found: payload.total_count || 0,
  items
};

await writeFile(outPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(`Updated ${outPath.pathname} with ${items.length} items.`);
