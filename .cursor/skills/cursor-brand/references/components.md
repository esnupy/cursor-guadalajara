# Components (shadcn first)

Two layers:

- `components/ui/*` — owned shadcn primitives. Shared variants, sizes, and
  default look live here.
- `components/*` and `modules/**/components/*` — feature/section composition.
  Custom behavior (nav, gallery, carousel) stays here; atoms come from ui.

## Component choice tree

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

## Where styles go

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

## Concrete defaults

| Need                         | Use                                        |
| ---------------------------- | ------------------------------------------ |
| CTA / icon / nav control     | `Button` (+ `variant` / `size`)            |
| Event / partner / info panel | `Card` (+ CardHeader/Title/Content/…)      |
| Action inside a card         | `.link` inline text — never `Button`       |
| Content / section link       | `.link` + arrow icon (see `links.md`)      |
| Status / recommended mark    | `Badge` (brand orange only per `color.md`) |
| Locale or exclusive choice   | `ToggleGroup`                              |
| Hairline rule                | `Separator`                                |
| class merging                | `cn()` from `@/lib/utils` — always         |

Icons: `@phosphor-icons/react` (per `components.json`). Always import the
`*Icon` suffix (e.g. `ArrowRightIcon`, not `ArrowRight`) and use
`weight="regular"`. Do not mix icon libraries in new UI.
