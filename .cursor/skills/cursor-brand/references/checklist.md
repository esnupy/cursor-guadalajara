# Pre-ship checklist

- [ ] Used or added a `components/ui` primitive before any custom control chrome
- [ ] Shared look edited in the ui primitive — not copy-pasted call-site stacks
- [ ] Call-site `className` is layout/exception only
- [ ] Buttons/large CTAs are neutral — orange only on sparse labels + content links
- [ ] Card actions are `.link` inline text — never `Button` inside a card
- [ ] Content links use `.link` + `ArrowRightIcon` (internal) or `ArrowUpRightIcon` (external)
- [ ] External links have `target="_blank"` and `rel="noopener noreferrer"`
- [ ] Header/footer/nav links stay neutral — no `.link`, no arrow icons
- [ ] Hierarchy uses one parameter (prefer color before size)
- [ ] Headings are sentence case; smart quotes; spaced em dashes
- [ ] Layout defaults top-left; margins ~3–5%; gutters slightly tight
- [ ] Cards/images/videos use `rounded-card`; controls use `rounded-full`
- [ ] No ad-hoc `rounded-md` / `rounded-lg` / `rounded-xl` on new surfaces
- [ ] Motion uses ease-out spring; reduced-motion respected
- [ ] Logo is official asset; cube has ≥ ½-width clearance
- [ ] Copy does not claim official Cursor Inc. voice or ownership
- [ ] UI text uses Cursor Gothic; code blocks use Cursor Mono (`font-mono`)
- [ ] Light and dark both still work for the changed surface
