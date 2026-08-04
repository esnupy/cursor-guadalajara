# Color

Cursor reads as understated neutrals with a sharp orange used rarely. Liberally
orange CTAs and purple/glow “AI” palettes break that signal.

## Accent decision tree

```
Is this a primary button, large CTA, or large filled surface?
├── Yes → use neutrals (`primary` / `secondary` / foreground on background)
│         Never fill with brand orange. Neutrals keep the accent rare enough
│         to stay sharp when it does appear.
└── No
    ├── Is this a content / section / card link (not chrome)?
    │   └── Yes → always `.link` + arrow icon per links.md.
    │             Applies in paragraphs, cards, recaps, featured panels, etc.
    │             Does NOT apply to header, footer, nav, or chrome links —
    │             those stay neutrals (`foreground` / `muted-foreground`).
    ├── Does one item need to stand out from siblings (e.g. “Recommended”)?
    │   └── Yes → brand orange (`cursor-accent`) on a small label/mark only
    └── Default → neutrals. Prefer secondary text color over a second size
                  when distinguishing hierarchy.
```

## Theme decision tree

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
