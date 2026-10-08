# Vendored skills

These skills are bundled so anyone who opens this repo in Claude Code can use
them without installing anything. Both are MIT licensed and credited to their
authors.

## humanizer

- Source: https://github.com/blader/humanizer
- License: MIT
- Use: removes AI writing patterns. Run `/humanizer` on copy before committing.
  Hard rule it enforces here: no em dashes.

## ui-ux-pro-max

- Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- License: MIT
- Use: design intelligence. Generates a design system (style, palette,
  typography, effects, anti-patterns) for a given sector. This portfolio's
  design system was generated with it. Run:

  ```
  python3 .claude/skills/ui-ux-pro-max/scripts/search.py "your project" --design-system --stack nextjs
  ```
