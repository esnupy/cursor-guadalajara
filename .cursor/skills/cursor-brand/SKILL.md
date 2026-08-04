---
name: cursor-brand
description: >-
  Apply Cursor brand guidelines and shadcn/ui-first composition when creating or
  refactoring UI on this community site. Use whenever building, restyling, or
  reviewing components, pages, layout, typography, color, motion, copy, logos,
  photography, theme (light/dark), buttons, cards, badges, icons, or any
  interactive control — even if the user does not say "brand" or "shadcn". Also
  use when choosing Phosphor icons (regular *Icon imports), accent vs neutral
  treatment, styling in-content inline links with cursor-accent, card actions
  (inline accent links, never buttons), link arrow icons (ArrowRight vs
  ArrowUpRight), border radius (`rounded-card` vs `rounded-full`), deciding
  whether to add a custom component vs a shadcn primitive, where to put shared
  styles (edit components/ui vs call-site className), writing marketing
  headings, or aligning visuals with cursor.com. Sources:
  docs/cursor-brand-guidelines.md, components/ui/*, components.json.
---

# Cursor Brand (Community Site)

Community-built, Cursor-inspired UI. Never claim to be Cursor Inc., never invent
logo lockups, never treat brand orange as a default fill.

**shadcn/ui is the default component library.** Compose from `components/ui`
before inventing markup. Call-site `className` is layout glue and true one-offs
only.

Canonical fallback: `docs/cursor-brand-guidelines.md` when no reference covers
the case.

## How to use this skill

**Do not load every reference.** Read only what the task touches:

1. Identify aspects from the routing table below.
2. **Read** the matching file(s) in `.cursor/skills/cursor-brand/references/`.
3. Map choices onto repo tokens — read `references/tokens.md` when color, radius,
   or type tokens are involved.
4. Before handing off, read `references/checklist.md`.

## General rules (always apply)

- **shadcn first** — no parallel Button/Card/Badge atoms; see `components.md`.
- **Sparse orange** — `--cursor-accent` for content links and small labels only,
  never primary button fills; see `color.md`.
- **Two corner languages** — `rounded-card` for surfaces/media,
  `rounded-full` for controls; see `border-radius.md`.
- **Card actions are links** — inline `.link` text, never `Button` in a card;
  see `cards.md` + `links.md`.
- **One hierarchy parameter** — prefer color before size; see `typography.md`.
- **Top-left layout** — center only for ceremony; see `layout.md`.
- **Both themes** — light and dark must still work after every change.

## Routing table

| Task touches…                                          | Read                                          |
|--------------------------------------------------------|-----------------------------------------------|
| Components, shadcn, buttons, badges, where styles live | `references/components.md`                    |
| Cards, card CTAs, interactive cards                    | `references/cards.md` + `references/links.md` |
| Links (content, section, in-card)                      | `references/links.md`                         |
| Color, accent, theme, light/dark                       | `references/color.md`                         |
| Typography, headings, fonts                            | `references/typography.md`                    |
| Layout, spacing, alignment, margins                    | `references/layout.md`                        |
| Border radius, rounded corners                         | `references/border-radius.md`                 |
| Logo, cube, lockup, favicon                            | `references/logo.md`                          |
| Motion, transitions, animation                         | `references/motion.md`                        |
| Copy, voice, marketing text                            | `references/copy.md`                          |
| Photos, video, gallery, media                          | `references/photography.md`                   |
| Token lookup, hex/CSS variables                        | `references/tokens.md`                        |
| Final review before shipping                           | `references/checklist.md`                     |

When multiple rows apply, read each listed file — skip the rest.

## Workflow

```
Starting a UI task?
├── Markup or controls involved? → read components.md first
├── Match task to routing table → read only those references
├── Need a token not in the table? → tokens.md, then color.md or border-radius.md
└── Done implementing? → checklist.md
```
