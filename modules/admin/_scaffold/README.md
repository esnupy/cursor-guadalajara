# Admin module scaffold

Use this folder as a template when adding new admin modules.

## Steps

1. Create a module folder under `modules/admin/<module-id>/`.
2. Add server actions or data loaders in that folder.
3. Register the module in `lib/admin/modules.ts` with `id`, `label`, `href`, `minRole`, and `description`.
4. Add a route at `app/admin/(dashboard)/<module-id>/page.tsx`.
5. Gate the page with `requireRole()` or `requireAdminSession()` as needed.
6. Use TanStack Query in client components for async data; keep authorization checks on the server.

## Roles

- `super_admin` — access management and all modules
- `ambassador` — content modules (future)
- `guest` — limited modules such as speaker uploads (future)

## Conventions

- Spanish UI copy (`es-MX`)
- shadcn/ui primitives from `components/ui`
- Cursor brand guidelines from `docs/cursor-brand-guidelines.md`
