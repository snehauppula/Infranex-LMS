<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## UI / UX

Use design tokens in `app/globals.css` (`--primary`, `--deep`, `--muted`, `--surface`, etc.) and existing components (`components/ui/*`). For deeper guidance on typography, contrast, spacing, motion, and copy, read `.cursor/skills/impeccable/SKILL.md` and its `reference/*.md` files ([Impeccable](https://github.com/pbakaus/impeccable), Apache-2.0). Prefer clear hierarchy, tinted neutrals over pure gray-on-brand, purposeful motion with `prefers-reduced-motion` respected, and avoid over-nested cards or generic template aesthetics.
