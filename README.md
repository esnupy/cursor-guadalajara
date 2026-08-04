# Cursor Guadalajara

Community site for Cursor Guadalajara — event recaps, upcoming meetups, and ambassador info.

## Quick Start

```bash
bun install
bun dev
```

Open `http://localhost:3000`.

## Routes

- `app/page.tsx` — homepage (hero, featured, events, ambassadors, world events)
- `app/recaps/[slug]/page.tsx` — event recap pages

## Content

Most site copy and data lives in `content/`:

- `content/site.config.ts` — site name, URLs, footer text
- `content/header-photos.ts` — hero bento grid images
- `content/featured.ts` — featured resource card
- `content/events.ts` — upcoming and past events
- `content/ambassadors.ts` — ambassador profiles
- `content/world-events.ts` — global events carousel
- `content/recaps/*.ts` — recap pages (registered in `content/recaps/index.ts`)

The site is Spanish-only (`es-MX`). UI chrome is in `components/`; editorial content is in `content/`.

## Scripts

```bash
bun dev          # development server
bun run build    # production build
bun run check    # lint + format check
bun run fix      # auto-fix lint and format
```

## Credits

This site started as a fork of the [Cursor Ambassador Evergreen Template](https://github.com/luisfer/cursor-ambassador-evergreen) — a configurable Next.js starter for Cursor Ambassador community sites. We kept the content-driven structure but heavily customized the design, copy, and assets for Cursor Guadalajara, with a stronger focus on [Cursor's brand guidelines](https://cursor.com).

The evergreen template was designed and implemented by [Luis Fernando Romero Calero](https://lfrc.me) ([@luisfer](https://github.com/luisfer)), [Kristiyan Velkov](https://kristiyanvelkov.com/), [Nico](https://nicomoehn.codes), and [Cursor](https://cursor.com).

## License

MIT. See `LICENSE`.
