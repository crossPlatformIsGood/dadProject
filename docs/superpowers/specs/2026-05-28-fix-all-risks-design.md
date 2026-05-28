# Design: Fix All Repo Risks

**Date:** 2026-05-28
**Branch:** develop
**Author:** Alvin Mac (with Claude)

## Context

CodeGraph + code-review-graph audit flagged:

- **🔴 Zero test coverage** — 0 Test nodes in graph.
- **🔴 `CopyPage.tsx`** — god component (261-line function, `handleSubmit` 89 lines with 48 outbound calls; top hub node).
- **🟡 `NewFormPage.tsx`** — 213-line function, duplicated `getSaveArray` / `getCopy`.
- **🟡 `useFormField` + `cn`** — bridge / hub nodes with no test safety net.

Stack: Vite 7 + React 19 + TS 5.9 + react-hook-form 7 + zod 3 + biome 2. Test runner: none.

## Goals

1. Introduce a test runner and unit-test the highest-leverage (hub / bridge) nodes.
2. Refactor `CopyPage` and `NewFormPage` to reduce per-function blast radius without changing behavior.
3. Extract shared form / storage / validation utilities to DRY the two pages.

## Non-Goals (YAGNI)

- No e2e tooling (Playwright).
- No refactor of `HomePage` / `PrintPage` — not in user ask.
- No migration of `CopyPage` to react-hook-form despite deps being present (risk vs. reward not worth it; behavior preservation is priority).
- No styling / Tailwind changes.

## Phases

Each phase is independently shippable. Stop between phases if priorities shift.

### Phase 1 — Test Infrastructure

**New deps (dev):**
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `jsdom`

**New files:**
- `vitest.config.ts` — reuses Vite alias config (`@` → `src/`); environment `jsdom`; setupFiles points at the setup file below.
- `src/test/setup.ts` — imports `@testing-library/jest-dom`.
- `src/lib/utils.test.ts` — `cn` tests: conditional, conflicting Tailwind merge, arrays/falsy.
- `src/components/ui/Form.test.tsx` — `useFormField`: throws outside `<FormField>`; returns ids inside; integrates with `react-hook-form` `<Form>` provider.

**Edited files:**
- `package.json` — add scripts: `test`, `test:watch`, `coverage`. Add devDeps.
- `tsconfig.app.json` / `tsconfig.node.json` — add `vitest/globals` + `@testing-library/jest-dom` types only if needed; prefer explicit imports.

### Phase 2 — Shared Form Utilities

**New files:**
- `src/lib/storage.ts`
  - `getFormD(): FormD | null` — wraps `localStorage.getItem("formD")` + JSON.parse + null guard.
  - `getPrintData(): PrintData | null` — same for `printData`.
  - `setPrintData(data: PrintData): void`.
  - Types `FormD` and `PrintData` derived from current usage (maxNum, minNum, role; project/project2/pile/table).
- `src/lib/storage.test.ts` — tests with `localStorage` mock.
- `src/lib/validation.ts`
  - `validateRange(args: { first: string; last: string; value: string; label: string; maxNum: number }): string | null` — returns alert message or null. Replaces the four near-identical blocks in `CopyPage.handleSubmit`.
- `src/lib/validation.test.ts` — covers empty value, zero start, last < first, last > maxNum, valid range.

### Phase 3 — Refactor `CopyPage` (target: 261 → ~80 lines)

**New files:**
- `src/pages/hooks/useCopySections.ts` — replaces the 12 `useState` calls with a single `sections` array of `{ id: "sixM"|"threeM"|"j"|"p", label: string, columnIndex: number, first, last, value }`. Returns getters/setters or a single update callback.
- `src/pages/hooks/useCopySections.test.ts` — happy path + setter behavior.

**Edited:**
- `src/pages/CopyPage.tsx` — `handleSubmit` becomes a loop over `sections`: read storage via `getPrintData()`, run `validateRange`, mutate `tableList[i][columnIndex]`, save, `navigate("/print")`. Same alerts, same Chinese strings.

### Phase 4 — Refactor `NewFormPage` (target: 213 → ~100 lines)

**New files:**
- `src/pages/hooks/useFormTable.ts` — `useFormTable({ rows, cols, initial })` returns `{ values, setCell, setCellDecimal }`.
- `src/pages/hooks/useFormTable.test.ts`.
- `src/components/FormTable.tsx` — renders the table grid. Receives `values`, `onChange`, `onDecimalChange`, `roleLabel`, `minNum`.

**Edited:**
- `src/pages/NewFormPage.tsx` — collapses `getSaveArray` + `getCopy` into `saveAndGo(path: "/print" | "/copy")` since only the navigate target differs. Uses `<FormTable>` and `useFormTable`.

### Phase 5 — Verification

- `yarn build` (tsc + vite build) passes.
- `yarn test` passes (target: ≥80% coverage on new utils/hooks).
- `yarn dev` smoke check on `/`, `/new-form`, `/copy`, `/print` flows.

## File Map Summary

```
NEW:
  vitest.config.ts
  src/test/setup.ts
  src/lib/utils.test.ts
  src/lib/storage.ts
  src/lib/storage.test.ts
  src/lib/validation.ts
  src/lib/validation.test.ts
  src/components/ui/Form.test.tsx
  src/components/FormTable.tsx
  src/pages/hooks/useCopySections.ts
  src/pages/hooks/useCopySections.test.ts
  src/pages/hooks/useFormTable.ts
  src/pages/hooks/useFormTable.test.ts
  docs/superpowers/specs/2026-05-28-fix-all-risks-design.md

EDIT:
  package.json                    (devDeps + scripts)
  src/pages/CopyPage.tsx          (slim, use hooks + utils)
  src/pages/NewFormPage.tsx       (slim, use hooks + utils)
```

## Risks & Trade-offs

- **React 19 + Vitest:** confirmed compatible via RTL 16+. Pin `@testing-library/react@^16` to avoid React 18 peer constraint.
- **Behavior preservation:** refactor must keep `alert(...)` calls and exact Chinese error strings — they are the user-visible contract.
- **`localStorage` parse semantics:** current code throws on malformed JSON; new `getFormD` / `getPrintData` keep the same throw-on-malformed behavior to avoid silent regressions.
- **No state-shape change** in stored data — backward compatible with existing user data.
- **Biome ignores** may need updating for new `*.test.ts` files (likely fine — Biome treats them as TS by default).

## Out of Scope (Future Work)

- Migrating `CopyPage` to `react-hook-form` + `zod` schemas (deps already present).
- Adding tests for `HomePage` / `PrintPage`.
- Component-level tests for `Button`, `Select`, `Input`, etc.
- Coverage gates in CI (`.github/workflows/deploy.yml`).
