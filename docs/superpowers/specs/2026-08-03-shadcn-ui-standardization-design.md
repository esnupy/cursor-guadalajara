# Design: Standardize UI on shadcn/ui

**Date:** 2026-08-03  
**Status:** Approved for implementation planning  
**Scope:** Structural migration of the Cursor Guadalajara community site onto shadcn/ui defaults

## Goal

Make the codebase look and behave like a regular shadcn/ui project: default design tokens, `components/ui` primitives, semantic Tailwind classes, and light/dark theming via `next-themes`. Keep existing page layout and section composition. Visual brand retuning (tokens, fonts) is deferred to a later manual pass.

## Decisions

| Topic               | Choice                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------- |
| Migration style     | Structural only — keep layouts/composition; swap tokens + primitives                   |
| Theme               | Light + dark (`class` strategy) with `next-themes`                                     |
| Theme control       | Navbar, beside language toggle (desktop + mobile)                                      |
| Fonts               | Default shadcn/font stack for now; drop active Cursor Gothic / BSRU / Thasadith wiring |
| Slides module       | In scope — migrate to same tokens/atoms                                                |
| Custom interactions | Keep nav, galleries, carousels custom; restyle onto tokens; atoms only where obvious   |
| Approach            | Foundation → atoms → restyle features (no compatibility aliases for `cursor-*`)        |
| Token ownership     | Use shadcn defaults; user will retune CSS variables later                              |

## Architecture

- Initialize shadcn with `components.json`, default style, path aliases (`@/components`, `@/lib/utils`), and `components/ui/`.
- Replace custom `@theme` `cursor-*` colors and brand font theme wiring in `app/globals.css` with default shadcn CSS variables (light + dark). Keep Tailwind import, `@source` paths, and necessary base resets.
- Add a client `ThemeProvider` wrapping the app in the root layout (`next-themes`, `attribute="class"`), following the standard shadcn pattern (including `suppressHydrationWarning` on `<html>`).
- Two UI layers:
  - **`components/ui/*`** — owned shadcn primitives. Shared visual defaults and variants live here.
  - **`components/*` and `modules/slides/components/*`** — feature/section components. Compose ui atoms; keep custom behavior for nav/gallery/carousel; use semantic tokens.

### `className` policy

- Prefer variants/size props and **editing the shadcn component file** for shared look.
- Use `className` mainly for one-off layout (spacing, flex, grid) or true exceptions that do not form a reusable pattern.
- Do not build long nested style stacks on call sites when the change belongs in `components/ui`.

### Out of scope

- Redesigning page structure or content model
- i18n / Luma / data behavior changes
- Brand token/font polish (manual follow-up)
- Forced rewrites to `Sheet` / `Dialog` / `Carousel` for custom interactions
- New test frameworks, Storybook, or visual regression suites

## Components

### Add (shadcn primitives, only as needed)

- `Button` — CTAs, icon buttons, nav and gallery controls
- `Card` (and subparts as needed) — event, ambassador, partner, featured surfaces
- `Badge` — small status/labels that are currently ad-hoc
- `ToggleGroup` — language toggle (one selected locale at a time)
- `Separator` — section hairlines where appropriate
- `cn` helper in `lib/utils.ts`

### New thin feature UI

- `ThemeProvider` — client wrapper around `next-themes`
- `ThemeToggle` — icon `Button` (sun/moon) in Navbar next to `LanguageToggle`; cycles or toggles light/dark (system optional only if trivial with `next-themes` defaults — do not build a three-way menu unless needed for correctness)

### Keep and restyle (feature components)

Navbar, Footer, Hero/Bento, homepage sections, PhotoGallery, WorldEventsCarousel, EventRecap, Partners, Matchmaking, slides (`SlideLayout`, `CodeBlock`, `PromptBlock`, `DiagramSlide`, etc.).

### Dependencies

- Add: shadcn stack (`class-variance-authority`, `clsx`, `tailwind-merge`, Radix packages per component), `next-themes`
- Keep: `framer-motion`, `lucide-react`

## Migration order

1. **Foundation** — shadcn init, default tokens, `cn`, remove active `cursor-*` theme tokens and brand font theme wiring
2. **Theming** — `ThemeProvider` + Navbar `ThemeToggle`
3. **Atoms** — add agreed `components/ui` set; put shared defaults in those files
4. **Shell** — Navbar, Footer, LanguageToggle
5. **Homepage sections** — Hero through remaining sections
6. **Recaps** — EventRecap and related UI
7. **Slides** — layout and slide helpers
8. **Cleanup** — grep for leftover `cursor-*` / obsolete font utilities; remove hardcoded theme colors from components; verify light and dark

### Runtime flow

`layout` → `ThemeProvider` sets `class` on `html` → CSS variables switch → components use semantic utilities (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `bg-primary`, etc.).

## Error handling

- Avoid theme hydration flash via standard `next-themes` + `suppressHydrationWarning` on `<html>`.
- Theme toggle is client-only; no crash if JS is delayed (theme may remain at default until hydrated).
- Language toggle remains hidden when ≤1 locale; theme toggle always shown.
- No new content/data failure modes.
- On CLI/peer conflicts (Tailwind v4 / Next 16), follow the documented shadcn + Tailwind v4 setup for this stack — do not invent a parallel system.

## Verification

- `bun run fix` then `bun run check` must pass.
- Manual pass: home, one recap, `/slides/1` in light and dark; theme + language controls; mobile nav; gallery/carousel open/close.
- Grep gate: no remaining `cursor-*` utility classes or obsolete brand font utilities in components.

## Success criteria

- Project matches a normal shadcn layout: `components.json`, `components/ui`, default CSS variables, `cn`.
- Light/dark works via `next-themes` from the navbar.
- Feature layouts are preserved; visuals use semantic tokens/default look.
- Custom nav/gallery/carousel remain custom but token-aligned.
- Slides use the same system.
- Shared styling lives in `components/ui` (or variants), not call-site class sprawl.
