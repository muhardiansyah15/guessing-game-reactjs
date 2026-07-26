# The Mind Reader · Tebak Nama

A magician-themed name-guessing game built with React + Vite. Think of a
nickname (3–10 letters), point at the columns where its letters appear in two
"magic" letter grids, and the mind reader reveals the exact name — every time.

Play it at: https://muhardiansyah15.github.io/guessing-game-reactjs/

## How the trick works

1. The shuffled alphabet is laid out in **N columns**, where N is the length
   of the name. For each letter, the player clicks the column it is in.
2. Each chosen column becomes a **row** of a second shuffled-looking grid.
   The player points at the columns again.
3. Letter *i* must sit at (row *i*, chosen column) — the intersection of the
   two answers identifies every letter uniquely. The app never needs to know
   the name in advance; the math does the magic.

The logic lives in [`src/game.js`](src/game.js); the step-by-step UI in
[`src/App.jsx`](src/App.jsx).

## Features

- Click-to-pick columns — no typing, no invalid input possible.
- Guided wizard with progress steps and per-letter chips (with undo).
- Dramatic reveal: crystal-ball "thinking" pause, flip-in letters, confetti.
- Magic night theme with twinkling stars; responsive down to phones;
  respects `prefers-reduced-motion`.

## Development

```bash
npm install
npm run dev
npm run build
npm run lint
```

Deployed to GitHub Pages via GitHub Actions on every push to `main`.
