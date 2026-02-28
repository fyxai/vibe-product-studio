# Vibe Product Studio

Tracks product-building and design tool repositories from GitHub signals.

## Quick start

```bash
npm ci
npm run update-data
npm run build
npm run start
```

## Scripts

- `npm run update-data` — fetches public GitHub signals and updates `data/signals.json`
- `npm run build` — validates generated JSON
- `npm run start` — prints a concise top-list view in the terminal

## Automation

A GitHub Actions workflow at `.github/workflows/update.yml` runs every 4 hours:

- cron: `0 */4 * * *`
- runs `npm ci`
- runs `npm run update-data`
- commits and pushes only when `data/signals.json` changed
