# 富財貿易打樁工程 — Piling Record Summary

A piling engineering record management system for **Fook Choy Trading & Piling Engineering**. Built to track pile numbers, measurements, and generate printable summary reports.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 7 + SWC |
| Styling | Tailwind CSS v4 (Vite plugin) |
| UI Components | Shadcn/ui (Radix UI) |
| Forms | React Hook Form + Zod |
| Routing | React Router v7 |
| Linting & Formatting | Biome |

## Getting Started

```bash
# Install dependencies
yarn install

# Start dev server (SWC + HMR)
yarn dev

# Production build
yarn build

# Preview production build
yarn preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server on port 5173 |
| `yarn build` | Type-check with tsc, then build with Vite |
| `yarn preview` | Preview production build locally |
| `yarn format` | Format code with Biome |
| `yarn format-and-lint` | Check formatting and lint rules |
| `yarn format-and-lint:fix` | Auto-fix formatting and lint issues |
| `yarn check-format` | Check formatting without auto-fix |

## Deployment

### GitHub Pages

The app is configured to deploy to GitHub Pages with base path `/dadProject/`. SPA routing is handled via `public/404.html` redirect.

### Docker

```bash
docker build -t dadproject .
docker run -p 5173:5173 -d dadproject
```
