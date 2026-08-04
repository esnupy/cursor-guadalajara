# Typography

Hierarchy comes from one parameter at a time. Size + color + weight together
looks noisy and un-Cursor.

## Type decision tree

```
Need to show primary vs secondary text?
├── Same size available? → keep size; change color (muted vs foreground)
└── Size change required? → change size only; do not also restyle color/weight
                            unless accessibility demands it

Setting tracking / line-height?
├── Larger display type → tighter tracking + tighter line-height
└── Body / UI → normal tracking; comfortable line-height

Fonts (wired in `lib/fonts.ts` via `next/font/local`, WOFF2 in `app/fonts/`)
├── UI / marketing / body → Cursor Gothic (`font-sans`, `--font-sans`)
├── Code / prompts / technical strings → Cursor Mono (`font-mono`, `--font-mono`)
└── Outside the app (Google Docs, slide exports) → Helvetica as last-resort fallback
    only — never swap Inter/Roboto/“AI default” faces into the site.
```

Headings, labels, and titles use **sentence case**. Capitalize proper nouns only.
Smart quotes. Em dashes with spaces: `word — word`.
