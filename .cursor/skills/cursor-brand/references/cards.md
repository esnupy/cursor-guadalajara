# Cards

Cards are informational surfaces. Actions on a card are navigation hints, not
primary CTAs — they must not look like buttons.

## Card action decision tree

```
Card needs a user action (view more, register, open resource, navigate)?
├── Yes → never put a Button inside the card
│         └── Use a `.link` inline text action (see links.md)
│             Place it after the card body copy, not in CardFooter as a button row.
│             Why: Buttons are for page-level CTAs and chrome. Orange or filled
│             controls inside cards compete with real CTAs and break the
│             sparse-accent rule. Inline accent text reads as “go here” without
│             hijacking the card’s hierarchy.
├── Action is unavailable (e.g. “coming soon”)?
│   └── Plain `text-cursor-accent` text — not a link, no arrow icon
└── No action → informational card only; no affordance
```

Reference: `components/UpcomingEvents.tsx` (`.link` register action),
`components/PastEvents.tsx` (`.link` on `Card variant="interactive"`),
`components/FeaturedSection.tsx` (`.link` inside card body).

Interactive cards (`variant="interactive"`) may highlight on hover, but the
action is still inline `.link` text — never a `Button` in `CardFooter` or
`CardAction`.
