# Border radius

Two corner languages only — never mix arbitrary `rounded-md` / `rounded-lg` /
`rounded-xl` on new UI.

## Radius decision tree

```
Need border radius?
├── Content container or media?
│   (Card, panel, image, video, gallery tile, thumbnail, embed, dialog body)
│   └── Yes → always `rounded-card` (4px / `--radius-card`)
│             Use on the `Card` primitive and on `<img>` / `<video>` / `Image`
│             at the call site. Never `rounded-[4px]` — use the token class.
│             Why: editorial surfaces share one tight corner. Matches
│             code-editor precision; keeps photos and cards visually aligned.
│             `Card` with `flushOnMobile` may drop to `rounded-none` on small
│             viewports — that exception lives in the primitive only.
└── Interactive control or control chrome?
    (Button, Input, Select, DropdownMenu, ToggleGroup, theme toggle, filter
    chips, search fields, and any other tap/click target)
    └── Yes → always `rounded-full`
              If the ui primitive still defaults to `rounded-lg` / `rounded-md`,
              fix it in `components/ui/*` — not with a one-off call-site override.
              Why: pills read as controls; full radius keeps short controls
              legible without a second corner language on the same row.

Circular by nature (Avatar, host logo, speaker photo)?
└── `rounded-full` — same bucket as controls.
```

Never invent a third radius scale. Shadcn defaults (`rounded-lg`, `rounded-md`,
`rounded-xl`) are wrong for this site until promoted into one of the two buckets
above.

Reference: `components/ui/card.tsx` (`rounded-card`), `components/ui/button.tsx`
(`rounded-full`), `components/FeaturedSection.tsx` / `components/PhotoGallery.tsx`
(media `rounded-card`).
