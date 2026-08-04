# Design: Spanish-only site (remove i18n)

**Date:** 2026-08-03  
**Status:** Approved for implementation planning  
**Scope:** Remove the custom i18n layer; ship Cursor Guadalajara as Spanish (Mexico) only, with UI chrome and editable content translated to es-MX

## Goal

This is a Mexican community site. Drop locale switching and translation lookup entirely. All live user-facing chrome and editorial content should read as natural Spanish (Mexico), with correct accents and punctuation (á é í ó ú ñ ü, ¿ ¡). Community voice uses informal **tú**.

## Decisions

| Topic | Choice |
| ----- | ------ |
| Approach | Inline Spanish in components + translate content files in place |
| Scope | UI chrome + editable content (`events`, `featured`, `ambassadors`, `world-events`, `recaps`, site config copy) |
| Tone | Informal **tú** (Únete, Regístrate, etc.) |
| Dead UI | Delete unused `MatchmakingSection` and `PhotoDisclaimer` |
| Slides editorial | Out of scope (a11y chrome only if English) |
| Locale machinery | Delete provider, dictionaries, LanguageToggle — no replacement copy module |
| Document language | Fixed `es-MX` on `<html lang>`; keep OG `locale: 'es_MX'` |
| Dates | Format with `es-MX` (no locale from context) |

## Architecture

### Removals

- `lib/i18n.tsx` — `I18nProvider`, `useI18n`, `t()`
- `content/locales/` — `en.json`, `index.ts`
- `components/LanguageToggle.tsx`
- Unused: `components/MatchmakingSection.tsx`, `components/PhotoDisclaimer.tsx` (and orphaned imports/keys)

### Config & layout

- Remove `defaultLocale` / `locales` from `content/site.config.ts`. Document language is hardcoded as `es-MX` on `<html>` (not driven by site config).
- Root layout: remove `I18nProvider`; set `<html lang="es-MX">`
- Keep Open Graph `locale: 'es_MX'`
- No `localStorage` locale migration required once the provider is gone

### String ownership

| Kind | Where it lives |
| ---- | -------------- |
| UI chrome | Spanish string literals in the components that render them |
| Editorial content | Spanish strings inside `content/*.ts` and `content/recaps/*.ts` |
| Shared dates | `toLocaleDateString('es-MX', …)` (and equivalent) at call sites that previously used `locale` from `useI18n` |

### Docs

- Update `README.md`: remove “how to add a locale”; state the site is Spanish-only (es-MX)

## Components

Strip `useI18n` / `t()` from every consumer and inline Spanish:

- `Navbar` (also remove `LanguageToggle`)
- `Footer`
- `Partners`
- `AmbassadorSection`
- `FeaturedSection`
- `UpcomingEvents`
- `PastEvents`
- `EventRecap`
- `PhotoGallery`
- `GlobalEvents`

Also Spanish-ize hardcoded English UI chrome:

- `app/not-found.tsx`
- `ThemeToggle` / Navbar menu a11y labels
- `WorldEventsCarousel` controls
- `LumaCalendar` iframe title
- Slides module **a11y** labels only (Previous / Next / Copy → Spanish)

Interpolation that used `t('key', { count })` becomes normal template literals or simple in-component formatting.

### Representative chrome (direction; finalize during implementation)

| Area | es-MX direction |
| ---- | --------------- |
| Nav CTA | Únete |
| Upcoming | Próximos eventos / Qué sigue |
| Register / Coming soon | Regístrate / Próximamente |
| Past / Recaps | Eventos pasados / Resúmenes |
| Attendees | `{count} asistentes` |
| Ambassadors | Embajadores de Cursor {community} / Conoce al equipo |
| Footer | Partners anfitriones, Comunidad Cursor, Todos los eventos en Luma, etc. |
| Recap chrome | Volver a resúmenes, Ponentes, Proyectos, Comentarios, Recursos, Fotos |
| Gallery a11y | Abrir foto, Cerrar, Anterior, Siguiente |
| World events | Cafe Cursor alrededor del mundo + short community blurb |

## Content translation

Translate in place; keep file shapes unchanged.

| Source | What changes |
| ------ | ------------ |
| `content/events.ts` | Titles, `displayDate`, locations (where English today) |
| `content/featured.ts` | Title, description, CTA (e.g. Únete a WhatsApp) |
| `content/ambassadors.ts` | Roles → natural es-MX; keep names and handles |
| `content/world-events.ts` | Date labels and image alts |
| `content/recaps/*.ts` | Narrative body, speaker titles/bios if English, projects, highlights, resource labels |
| `content/site.config.ts` | Confirm / fix `siteDescription` and `footerTagline` as good es-MX |

### Keep untranslated (proper nouns)

Cursor, Luma, WhatsApp, X, Cafe Cursor, official English brand/venue names when that is their public name, person names, URLs, and external invite links.

### Quality bar

- Correct es-MX orthography and punctuation
- Informal **tú** for CTAs and community voice
- No leftover English UI chrome on live pages
- Recap copy should read as written for a Mexican audience, not a literal calque

## Edge cases

- No locale fallback paths after removal
- Parametric strings become ordinary JS string construction
- Deleting matchmaking/photo-disclaimer removes their dictionary keys with them — no orphan imports
- Date formatting never depends on a runtime locale preference

## Verification

Manual checks (no new test framework):

- Home, recap detail, and not-found show Spanish chrome and content
- Spot-check accents and ¿ ¡ where required
- Theme toggle and mobile menu still work; LanguageToggle absent
- `bun run fix` then `bun run check` clean
- Grep guard: no remaining `useI18n`, `I18nProvider`, `LanguageToggle`, or `content/locales`

## Out of scope

- Reintroducing multi-locale support
- Translating slide deck bodies under `modules/slides`
- Visual redesign unrelated to copy and deleted dead UI
- New i18n libraries or a centralized Spanish copy module

## Success criteria

1. The custom i18n layer and language toggle are gone.
2. Live pages are Spanish (Mexico) only for chrome + editable content in scope.
3. Document language and date formatting are `es-MX`.
4. Dead matchmaking/photo-disclaimer UI is deleted.
5. Lint/format checks pass.
