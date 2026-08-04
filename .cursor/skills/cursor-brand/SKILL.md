---
name: cursor-brand
description: >-
  Apply Cursor brand guidelines and shadcn/ui-first composition when creating or
  refactoring UI on this community site. Use whenever building, restyling, or
  reviewing components, pages, layout, typography, color, motion, copy, logos,
  photography, theme (light/dark), buttons, cards, badges, or any interactive
  control — even if the user does not say "brand" or "shadcn". Also use when
  choosing accent vs neutral treatment, deciding whether to add a custom
  component vs a shadcn primitive, where to put shared styles (edit
  components/ui vs call-site className), writing marketing headings, or aligning
  visuals with cursor.com. Sources: docs/cursor-brand-guidelines.md,
  components/ui/*, components.json.
---

# Cursor Brand (Community Site)

This site is community-built and Cursor-inspired. Apply official Cursor visual
language so the UI feels like Cursor — never claim to be Cursor Inc., never invent
logo lockups, and never treat brand orange as a default fill.

**shadcn/ui is the default component library.** Compose from `components/ui`
before inventing markup. Shared look lives in those primitives; call-site
`className` is for layout glue and true one-offs only.

Canonical brand reference: `docs/cursor-brand-guidelines.md`. Read it when a
rule here does not cover the case. Prefer this skill’s decision trees over
improvising.

## Before you touch UI

Walk this once per task:

1. What is changing — component structure, color, type, layout, logo, motion,
   copy, or photo/video?
2. Run **Components (shadcn first)** before any other tree when markup or
   controls are involved.
3. Run the matching brand tree below.
4. Map choices onto this repo’s tokens (see Token map) — do not invent new hex
   values when a token already exists.
5. Self-check with the Pre-ship checklist.

## Components (shadcn first)

Two layers:

- `components/ui/*` — owned shadcn primitives. Shared variants, sizes, and
  default look live here.
- `components/*` and `modules/**/components/*` — feature/section composition.
  Custom behavior (nav, gallery, carousel) stays here; atoms come from ui.

### Component choice tree

```
Need a UI control or surface (button, badge, card, toggle, separator, …)?
├── Matching primitive already in components/ui/?
│   └── Yes → use it. Prefer variant/size props over new className styling.
├── Exists in shadcn registry but not in the repo yet?
│   └── Yes → add it with the shadcn CLI into components/ui/, then use it.
│           Never hand-roll a parallel Button/Badge/Card/etc.
└── No shadcn primitive fits (domain section, data wiring, one-off layout)?
    └── Build a feature component that composes ui atoms.
        Do not recreate primitive chrome (borders, button states, badge pills)
        with raw Tailwind when a ui component should own that.
```

Why: parallel custom atoms drift from tokens, break light/dark, and force every
call site to re-solve the same styling. One primitive file stays the single
source of shared chrome.

### Where styles go

```
Is the visual change needed in 2+ places, or is it the default look of that
control going forward?
├── Yes → edit components/ui/<primitive>.tsx
│         (cva variants, base classes, or new variant/size).
│         Call sites stay thin: props + layout className only.
└── No — truly one call site / edge case?
    └── className on the call site (outer feature component).
        Allowed: spacing, flex/grid placement, one-off width.
        Forbidden: re-implementing the primitive’s chrome (bg, border, radius,
        hover/focus rings, typography of the control) at the call site when a
        variant should exist instead.

Seeing the same nested className stack copy-pasted?
└── Always promote it into the ui primitive (variant or base) — delete the
    duplicates at call sites.
```

Why: editing the primitive once keeps brand + theme coherent. Nested call-site
stacks become a second, invisible design system that fights shadcn.

### Concrete defaults

| Need                         | Use                                   |
| ---------------------------- | ------------------------------------- |
| CTA / icon / nav control     | `Button` (+ `variant` / `size`)       |
| Event / partner / info panel | `Card` (+ CardHeader/Title/Content/…) |
| Status / recommended mark    | `Badge` (brand orange only per Color) |
| Locale or exclusive choice   | `ToggleGroup`                         |
| Hairline rule                | `Separator`                           |
| class merging                | `cn()` from `@/lib/utils` — always    |

Icons: `@phosphor-icons/react` (per `components.json`). Always import the
`*Icon` suffix (e.g. `ArrowRightIcon`, not `ArrowRight`) and use
`weight="regular"`. Do not mix icon libraries in new UI.

## Color

Cursor reads as understated neutrals with a sharp orange used rarely. Liberally
orange CTAs and purple/glow “AI” palettes break that signal.

### Accent decision tree

```
Is this a primary button, large CTA, or large filled surface?
├── Yes → use neutrals (`primary` / `secondary` / foreground on background)
│         Never fill with brand orange. Neutrals keep the accent rare enough
│         to stay sharp when it does appear.
└── No
    ├── Does one item need to stand out from siblings (e.g. “Recommended”)?
    │   └── Yes → brand orange (`cursor-accent`) on a small label/mark only
    └── Default → neutrals. Prefer secondary text color over a second size
                  when distinguishing hierarchy.
```

### Theme decision tree

```
Is the surface screen-first or low-light (code, night events, dark venues)?
├── Yes → dark theme is valid
└── No → light theme is valid

Neither theme is default. Support both. Prefer pure `#FFFFFF` or `#000000`
when midtones feel muddy — brand guidelines explicitly allow breaking midtone
purgatory.
```

Never use shadcn `accent` as the brand orange. In this repo `accent` is a
neutral surface; brand orange is `--cursor-accent` / `cursor-accent`.

## Typography

Hierarchy comes from one parameter at a time. Size + color + weight together
looks noisy and un-Cursor.

### Type decision tree

```
Need to show primary vs secondary text?
├── Same size available? → keep size; change color (muted vs foreground)
└── Size change required? → change size only; do not also restyle color/weight
                            unless accessibility demands it

Setting tracking / line-height?
├── Larger display type → tighter tracking + tighter line-height
└── Body / UI → normal tracking; comfortable line-height

Font available?
├── Cursor Gothic in the project → use it
└── Not available → current `--font-sans` stack (do not swap in Inter/Roboto/
                    “AI default” faces). Helvetica only as last-resort fallback
                    outside the app (docs, slides exports).
```

Headings, labels, and titles use **sentence case**. Capitalize proper nouns only.
Smart quotes. Em dashes with spaces: `word — word`.

## Layout & grid

Code-editor sensibility: dense, precise, top-left by default.

### Layout decision tree

```
Alignment
├── Default → top-left position, left-aligned text
└── Center only when the section’s job is balance/ceremony (hero lockup,
    empty state) — never center because “marketing pages center.”

Margins / gutters
├── Set outer margins as ~3–5% of viewport/container width
├── Smaller viewports → proportionally larger margins and gutters
└── Prefer slightly narrow gutters vs typical marketing grids — density
    signals a power tool when spacing stays intentional.

Logo + text lockup
└── Size the mark with geometric ratios or the type scale — never arbitrary
    scale. Clearance around the cube ≥ ½ cube width.
```

## Logo & mark

```
Need a Cursor mark?
├── Official lockup/avatar assets only — never redraw or “improve” the cube
├── Default → 2D monochrome mark
├── Large decorative / artwork → 2.5D allowed
├── Profile/social → prefer light avatar; circle crop when the platform circles
├── Favicon → light or dark to match user theme
└── ASCII mark → 4fps animation, ~120% line-height when shown as text art
```

## Motion

```
Transition type (translate, fade, most UI motion)?
└── Always → gentle ease-out spring:
    cubic-bezier(0.25, 1, 0.5, 1)
    (--ease-out-spring when defined)

Honor prefers-reduced-motion: cut motion to opacity/instant, never remove
meaning that only existed in the animation.
```

## Copy & voice

Quiet confidence: clear, complete, no hype.

```
Writing UI or marketing copy?
├── Say the thing simply — technical when needed, light when possible
├── Never oversell, fake-casual jokes, or corporate jargon
├── Sentence case for headings/labels/titles
└── Community framing: “Cursor community in Guadalajara” / meetup language —
    never “we at Cursor” or official-product claims
```

## Photography & video (when relevant)

- Photos: warm, candid, natural light; film/disposable texture beats overproduced
  stock.
- Video lower-thirds / title cards: Cursor Gothic (or current sans), one size,
  tracked-in, bottom-left — move bottom-right only if illegible. ~4% outer
  margins. Colors lively, not washed out.

## Token map (this repo)

| Brand intent          | Use                                      | Do not use as brand orange      |
| --------------------- | ---------------------------------------- | ------------------------------- |
| Brand orange (sparse) | `--cursor-accent` / `#f54e00`            | `accent`, `primary`, `warning`* |
| Neutral CTA / button  | `primary`, `secondary`, foreground fills | `--cursor-accent` fills         |
| Page surfaces         | `background`, `card`, `muted`            | random off-whites               |
| Secondary text        | `muted-foreground`                       | smaller type + dimmer color     |
| Light / dark          | `.dark` tokens; both supported           | hard-coded only-dark UI         |

\* `warning` may share the orange hex today — still reserve `--cursor-accent` for
brand emphasis, not for every alert.

## Pre-ship checklist

- [ ] Used or added a `components/ui` primitive before any custom control chrome
- [ ] Shared look edited in the ui primitive — not copy-pasted call-site stacks
- [ ] Call-site `className` is layout/exception only
- [ ] Buttons/large CTAs are neutral — orange only on small intentional accents
- [ ] Hierarchy uses one parameter (prefer color before size)
- [ ] Headings are sentence case; smart quotes; spaced em dashes
- [ ] Layout defaults top-left; margins ~3–5%; gutters slightly tight
- [ ] Motion uses ease-out spring; reduced-motion respected
- [ ] Logo is official asset; cube has ≥ ½-width clearance
- [ ] Copy does not claim official Cursor Inc. voice or ownership
- [ ] Light and dark both still work for the changed surface
