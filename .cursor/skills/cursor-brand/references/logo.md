# Logo & mark

```
Need a Cursor mark?
├── Official lockup/avatar assets only — never redraw or “improve” the cube
├── Default → `/components/icons/CursorLogo.tsx`
├── Large Lockup (logo + wordmark) → `/components/icons/CursorLockupSwap.tsx`
├── Profile/social → prefer light avatar; circle crop when the platform circles
├── Favicon → light or dark to match user theme
└── ASCII mark → 4fps animation, ~120% line-height when shown as text art
```

Prefer using the react component variations for the logo in code, using tailwind
utility classes to change the main color on specific cases. Otherwise it defaults
to the `text-foreground` variant based on the selected theme.
