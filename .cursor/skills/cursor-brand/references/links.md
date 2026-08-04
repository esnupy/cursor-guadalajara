# Links

Content and section links share one treatment everywhere — inside cards, recap
bodies, featured panels, etc. Chrome links (header, footer, nav) stay neutral
and never use this pattern.

## Link decision tree

```
Adding a link?
├── Is it chrome (header, footer, sidebar nav)?
│   └── Yes → `foreground` / `muted-foreground`. No arrow icon. No `.link`.
└── No — content, section, or card action
    ├── Internal (same app — relative path like `/recaps/foo` or `/#section`)?
    │   └── Next.js `<Link href="…" className="link">`
    │       + `ArrowRightIcon` after the label
    └── External (`http`, `https`, `mailto`, or off-origin)?
        └── `<a href="…" target="_blank" rel="noopener noreferrer" className="link">`
            + `ArrowUpRightIcon` after the label

Back / up navigation (e.g. “Volver a resúmenes”)?
└── Exception: `ArrowLeftIcon` before the label is allowed. Still use `.link`.
```

## Link markup rules

Always use the global `.link` utility (`app/globals.css`) — it owns
`text-cursor-accent`, flex layout, gap, and hover. Never re-stack those classes
at the call site unless `.link` literally cannot apply.

```tsx
// Internal
<Link href={path} className="link" aria-label="…when label alone is insufficient">
  Ver resumen
  <ArrowRightIcon weight="regular" className="size-4" aria-hidden="true" />
</Link>

// External
<a href={url} target="_blank" rel="noopener noreferrer" className="link">
  Regístrate
  <ArrowUpRightIcon weight="regular" className="size-4" aria-hidden="true" />
</a>
```

Strict:

- Arrow icon always **after** the label (except back-nav with `ArrowLeftIcon`
  before).
- Icon: `weight="regular"`, `aria-hidden="true"`, `size-3.5` or `size-4`.
- External links always get `target="_blank"` and `rel="noopener noreferrer"`.
- Add `aria-label` when visible text alone does not describe the destination.
- On interactive cards, optional `group-hover:translate-x-1` on `ArrowRightIcon`
  only — see `PastEvents.tsx`. Honor `motion-reduce:transform-none`.

Why arrows: accent color signals “clickable”; the arrow signals direction
(forward vs leaving the site) without turning the control into a button.

Reference: `components/PastEvents.tsx`, `components/UpcomingEvents.tsx`,
`components/FeaturedSection.tsx`, `components/EventRecap.tsx` (back link).
