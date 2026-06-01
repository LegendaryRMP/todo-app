# todo-app

## Commands

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | `tsc -b && vite build` (type-check first, then bundle) |
| `npm run lint` | `eslint .` (flat config) |
| `npm run preview` | Serve production build locally |

Always run `npm run build` to verify both type-check and build pass. No test framework is configured.

## Architecture

- **Entry**: `src/main.tsx` → renders `<App />` into `#root`.
- **State**: `useTodos` and `useCategories` hooks with `localStorage` persistence (keys: `todo-app-todos`, `todo-app-categories`).
- **Types**: `Todo` (id, title, completed, categoryId, dueDate, createdAt) and `Category` (id, name, color) in `src/types.ts`.
- **Storage**: `src/utils/storage.ts` — generic `loadFromStorage<T>` / `saveToStorage<T>` wrappers.
- **No router, no external state library, no API calls.**

## TypeScript quirks

- **`verbatimModuleSyntax: true`** — use `import type` / `export type` for type-only imports.
- **`erasableSyntaxOnly: true`** — no enums, no namespaces, no parameter properties; use `as` casts instead of `!` assertions where possible.
- **`noUnusedLocals` / `noUnusedParameters`** are errors.
- **`jsx: "react-jsx"`** — no `import React from 'react'` needed.

## ESLint

Flat config (`eslint.config.js`). Extends: `js.configs.recommended`, `tseslint.configs.recommended`, `react-hooks`, `react-refresh/vite`. Run `npm run lint` to check.

## OpenCode config

`opencode.json` enables Playwright MCP for browser automation.
