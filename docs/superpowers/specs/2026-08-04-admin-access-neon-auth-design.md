# Admin Access Management + Neon Auth Design

**Date:** 2026-08-04  
**Branch:** `feat/admin-dashboard`  
**Status:** Approved for implementation planning

## Goal

Build the first admin dashboard module: **access management**. Integrate a Neon database with Neon Auth (GitHub OAuth) so only whitelisted emails can enter `/admin`. Seed the first super admin. Scaffold the admin shell and module layout for future content modules. Do **not** migrate public site content into the database in this pass.

## Decisions (locked)

| Topic                       | Choice                                                            |
| --------------------------- | ----------------------------------------------------------------- |
| Auth                        | Neon Auth (Better Auth–compatible), GitHub OAuth                  |
| Authorization model         | App-owned `access_grants` table (Approach 1)                      |
| Neon project                | New dedicated project `cursor-guadalajara`                        |
| Branches                    | `main` (production), `development` (local)                        |
| Local auth                  | Bypass GitHub; `DEV_USER_EMAIL` auto-login **or** email form      |
| Whitelist UI                | Full CRUD for `super_admin`, `ambassador`, `guest`                |
| Non-whitelisted GitHub user | Reject immediately — no durable app session                       |
| Email matching              | Any **verified** GitHub email may match a grant                   |
| Seed                        | `juanda.martinezn@gmail.com` → `super_admin` on **both** branches |
| ORM                         | Drizzle + SQL migrations                                          |
| Admin client data           | TanStack Query                                                    |
| Admin chrome                | shadcn **Sidebar**                                                |

## Architecture

```
GitHub OAuth (prod) ──► Neon Auth session
                              │
Local email / DEV_USER_EMAIL ─┤
                              ▼
                    access_grants lookup (email → role)
                              │
                              ▼
                         /admin shell
                    (Sidebar + module registry)
                              │
                              ▼
              modules/admin/access (this module)
              future modules (scaffolded only)
```

- **Identity:** Neon Auth on each Neon branch (auth data branches with the DB).
- **Authorization:** Always from `access_grants`, never from client-only claims.
- **Environments:** Local `DATABASE_URL` + Neon Auth creds → `development` branch. Production → `main`.

## Data model

### Enum: `access_role`

- `super_admin` — full `/admin`, including access management
- `ambassador` — all future content modules; **no** access management
- `guest` — lesser capabilities later (e.g. speaker slide uploads); can authenticate but sees only guest-allowed modules (none yet)

### Table: `access_grants`

| Column             | Type            | Notes                                  |
| ------------------ | --------------- | -------------------------------------- |
| `id`               | `uuid` PK       | Default `gen_random_uuid()`            |
| `email`            | `citext` UNIQUE | Normalized lowercase; match key        |
| `role`             | `access_role`   | See enum above                         |
| `created_at`       | `timestamptz`   | Default `now()`                        |
| `updated_at`       | `timestamptz`   | Default `now()`                        |
| `created_by_email` | `text` NULL     | Actor email, or `'seed'` for bootstrap |

Neon Auth owns the `neon_auth` schema (users/sessions). Application code must not mutate that schema for roles.

### Seed

Both `main` and `development`:

- email: `juanda.martinezn@gmail.com`
- role: `super_admin`
- `created_by_email`: `seed`

### Invariants

- Cannot delete or demote the **last** `super_admin`.
- Email lookup is case-insensitive via `citext` / normalized writes.
- Duplicate email inserts fail with a clear validation error.
- When multiple verified GitHub emails match multiple grants, the effective role is the highest privilege: `super_admin` > `ambassador` > `guest`.

## Auth flows

### Production

1. Unauthenticated visit to `/admin` → Neon Auth GitHub OAuth.
2. After OAuth, server fetches **all verified GitHub emails** for the account.
3. Resolve all matching `access_grants` rows for those emails.
   - If **none** match → **reject immediately**, clear/end session, show not-approved state. No half-logged-in access to `/admin`.
   - If **one or more** match → pick the grant with the highest privilege (`super_admin` > `ambassador` > `guest`) and establish session context `{ email, role, authSource: 'neon' }` using that grant’s email + role.
4. Every `/admin/*` request requires a valid Neon Auth session **and** an active grant.

### Local development

Preconditions: `NODE_ENV=development` **and** `AUTH_DEV_BYPASS=true`. Production must ignore bypass env vars.

1. Skip GitHub OAuth.
2. If `DEV_USER_EMAIL` is set → resolve grant for that email; on success, session `{ email, role, authSource: 'dev' }`; if missing grant → not-approved (same as unknown email).
3. Else → `/admin/login` email form; succeeds only when the email exists in `access_grants`.
4. Same role helpers and route gates as production.

### Session contract

```ts
type AdminSession = {
	email: string;
	role: 'super_admin' | 'ambassador' | 'guest';
	authSource: 'neon' | 'dev';
};
```

Authorization is re-checked server-side from `access_grants` on sensitive actions (not trust cookie role alone for mutations).

## Admin UI

### Routes

| Route           | Purpose                                                     | Access                                    |
| --------------- | ----------------------------------------------------------- | ----------------------------------------- |
| `/admin`        | Dashboard home; lists modules available to the current role | Any granted role                          |
| `/admin/access` | Access management CRUD                                      | `super_admin` only                        |
| `/admin/login`  | Local email login                                           | Dev bypass only; prod redirects to GitHub |

Future modules: `/admin/<module>` (stubs / registry entries only in this pass).

### Shell

- shadcn **Sidebar** layout: module nav, user email + role, sign out.
- Module registry: `{ id, label, href, minRole }[]`.
  - **Access** registered now (`minRole: super_admin`).
  - Placeholders for future content modules disabled or omitted until built.
- Guests with no allowed modules see an empty / “no modules yet” home.
- Ambassadors who navigate to `/admin/access` get forbidden / redirect to `/admin`.
- Visual language: existing Cursor brand guidelines + shadcn/`components/ui` (no parallel design system).

### Access management module

- List grants: email, role, created_at, created_by.
- Add grant (email + role), change role, remove grant.
- TanStack Query for list queries and mutation cache invalidation.
- Server Actions (or equivalent server mutations) enforce `super_admin` and last-super-admin guard.
- Surface guard errors in the UI.

## Repo scaffolding

```
app/admin/                 # route group + Sidebar layout
lib/db/                    # Drizzle client, schema, migrations
lib/auth/                  # Neon Auth helpers, grant resolve, role checks, dev bypass
modules/admin/access/      # access management UI + server actions
modules/admin/_scaffold/   # README + empty module template for later features
```

Public marketing site under `app/` (non-admin) remains content-driven; unchanged by this module except shared deps if needed (e.g. providers).

### Stack additions

- Neon project + Auth
- Drizzle ORM
- TanStack Query (admin client)
- shadcn Sidebar (and its required sidebar primitives)

## Environment variables

| Variable                    | Local                            | Production    |
| --------------------------- | -------------------------------- | ------------- |
| `DATABASE_URL`              | `development` branch             | `main` branch |
| Neon Auth URL + credentials | `development` Auth               | `main` Auth   |
| GitHub OAuth credentials    | Optional / unused when bypass on | Required      |
| `AUTH_DEV_BYPASS`           | `true` to enable bypass          | unset / false |
| `DEV_USER_EMAIL`            | Optional auto-login email        | ignored       |

## Error handling

| Case                           | Behavior                                         |
| ------------------------------ | ------------------------------------------------ |
| OAuth OK, no grant             | Reject; no durable session; not-approved message |
| Grant revoked mid-session      | Next gated request fails; forced out             |
| Duplicate email                | Validation error                                 |
| Last super_admin delete/demote | Blocked                                          |
| Unknown email on local login   | Not-approved                                     |
| Bypass attempted in prod       | Impossible (env gates)                           |

## Testing

- **Unit:** email normalization, role helpers, last-super-admin guard.
- **Server:** grant CRUD rejects non–`super_admin`.
- **Manual:** prod allow/deny via verified GitHub emails; local auto-login + email form on `development` branch.

## Out of scope

- Migrating `content/*` into the database
- Guest upload / slides admin features
- Ambassador content editors
- Multi-org / teams
- Outbound invite emails (whitelist entry only)

## Success criteria

1. Neon project `cursor-guadalajara` exists with `main` and `development`, both seeded with the super admin grant.
2. Neon Auth + GitHub works in production against the whitelist (verified emails).
3. Local dev can enter `/admin` without GitHub via bypass + grant check.
4. Super admin can CRUD grants for all three roles with last-super-admin protection.
5. Ambassadors and guests cannot manage access; admin shell uses shadcn Sidebar and a module registry ready for later modules.
