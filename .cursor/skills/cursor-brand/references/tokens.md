# Token map (this repo)

| Brand intent                | Use                                      | Do not use as brand orange      |
| --------------------------- | ---------------------------------------- | ------------------------------- |
| Brand orange (sparse)       | `--cursor-accent` / `#f54e00`            | `accent`, `primary`, `warning`* |
| Content / card links        | `.link` + arrow icon (`links.md`)        | `Button` inside cards           |
| Inline content text links   | `.link` / `cursor-accent` text color     | `primary`, header/footer styles |
| Nav / header / footer link  | `foreground` / `muted-foreground`        | `cursor-accent`                 |
| Neutral CTA / button        | `primary`, `secondary`, foreground fills | `--cursor-accent` fills         |
| Page surfaces               | `background`, `card`, `muted`            | random off-whites               |
| Secondary text              | `muted-foreground`                       | smaller type + dimmer color     |
| Light / dark                | `.dark` tokens; both supported           | hard-coded only-dark UI         |
| UI typeface                 | Cursor Gothic (`font-sans`)              | Geist, Inter, system-ui stacks  |
| Code typeface               | Cursor Mono (`font-mono`)                | generic `ui-monospace` only     |
| Card / image / video radius | `rounded-card` (`--radius-card`, 4px)    | `rounded-md/lg/xl`, arbitrary   |
| Control radius              | `rounded-full`                           | `rounded-md/lg/xl` on controls  |

\* `warning` may share the orange hex today — still reserve `--cursor-accent` for
brand emphasis (sparse labels + in-content links), not for every alert.

Do not invent new hex values when a token in this table already covers the intent.
