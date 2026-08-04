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

## Admin dashboard

Protected admin routes live under `/admin`. Access is controlled by a Neon Postgres `access_grants` whitelist and Neon Auth (GitHub OAuth in production).

### Setup

1. Copy `.env.example` to `.env.local`.
2. Point `DATABASE_URL` at the Neon `development` branch for local work.
3. Set `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` from the Neon Console (development branch).
4. For local development without GitHub OAuth, set:
   - `AUTH_DEV_BYPASS=true`
   - `DEV_USER_EMAIL=your@approved.email` (optional auto-login)
   - `DEV_SESSION_SECRET` (32+ characters)

### Database

```bash
bun run db:migrate   # apply schema to DATABASE_URL
bun run db:seed      # seed super admin grant
```

Run migrate + seed on both Neon branches (`main` for production, `development` for local).

### Production OAuth

1. Create a GitHub OAuth app per Neon branch.
2. Set callback URL to `{NEON_AUTH_BASE_URL}/callback/github`.
3. Add the GitHub client ID/secret in Neon Console → Auth for that branch.
4. Add your production site origin to Neon Auth trusted domains.

### Admin routes

- `/admin` — dashboard home
- `/admin/access` — super admin access management
- `/admin/login` — sign in (GitHub in production, email form in local bypass mode)

## Scripts

```bash
bun dev          # development server
bun run build    # production build
bun run check    # lint + format check
bun run fix      # auto-fix lint and format
bun run db:migrate
bun run db:seed
bun test         # unit tests
```

## Credits

This site started as a fork of the [Cursor Ambassador Evergreen Template](https://github.com/luisfer/cursor-ambassador-evergreen) — a configurable Next.js starter for Cursor Ambassador community sites. We kept the content-driven structure but heavily customized the design, copy, and assets for Cursor Guadalajara, with a stronger focus on [Cursor's brand guidelines](https://cursor.com).

The evergreen template was designed and implemented by [Luis Fernando Romero Calero](https://lfrc.me) ([@luisfer](https://github.com/luisfer)), [Kristiyan Velkov](https://kristiyanvelkov.com/), [Nico](https://nicomoehn.codes), and [Cursor](https://cursor.com).

## License

MIT. See `LICENSE`.
