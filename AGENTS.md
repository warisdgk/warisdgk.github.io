# AGENTS.md

Cross-tool guide for AI coding agents working in this repo (Codex, Cursor,
Copilot, Windsurf, and any other agent that reads `AGENTS.md`). Claude Code
reads `CLAUDE.md`, which carries the same rules in more depth.

## What this is

An open-source developer portfolio. Next.js (App Router) + TypeScript +
Tailwind, exported as a static site and hosted on GitHub Pages. The repo is
also a template: people fork it and make it theirs by editing two files.

## To personalize it

If your task is to set this portfolio up for a person, follow `PERSONALIZE.md`.
It is the one-prompt recipe and the single source of truth for that flow.

## The two-file rule

Almost all real edits happen in:

- `config/site.config.ts`: identity, accent color, social links, SEO,
  and per-section on/off toggles. Supported social icon keys: `github`,
  `linkedin`, `medium`, `toptal`, `stackoverflow`, `mail`, `globe`.
- `data/portfolio.ts`: all content (about, skills, experience, projects,
  education, certifications). Typed, so the editor guides changes.

Do not hardcode personal strings in components. If a component needs new
content, add a typed field to one of those files and read from it. This is what
keeps the project forkable.

## What not to touch

`app/`, `components/`, `lib/`, `next.config.js`, `tailwind.config.ts`,
`package.json`, and `.github/workflows/` are the engine. Leave them alone.

## Quality process

After every task, before reporting it complete:

1. Code review: check for bugs, regressions, type errors, and missed edge cases
   in every file touched.
2. Test like a human: run the dev server and scroll through every affected
   section. Check both mobile (375px) and desktop (1280px+) viewports.
3. Analyze like a professional recruiter: review any copy changes for accuracy,
   impact, and professionalism. Flag vague metrics, unknown tool names,
   unexplained date gaps, and AI writing patterns.
4. Fix all issues before reporting done.

## Commits and deploys

Always ask the user before running `git commit` or `git push`. Never commit or
push without explicit approval, even when asked to "make changes" or "fix this".
State what will be committed and wait for a yes.

## Writing rules

Never use em dashes or en dashes. Hard rule. Use commas, periods, colons, or
parentheses. The humanizer rules in `.claude/skills/humanizer/SKILL.md` apply
to all copy and remove other AI tells; read that file and apply it before you
finish. (In Claude Code, run `/humanizer`.)

## Design

Tokens live as CSS variables in `app/globals.css`. The accent is the one
rebrand knob, injected at runtime from `siteConfig.accentRGB`. For any visual
change, follow `DESIGN_SYSTEM.md`. Do not drift toward generic AI-template
looks (no purple gradients, no glassmorphism everywhere, no emoji as icons,
use Lucide).

## Commands

- `npm run dev`: local dev server
- `npm run build`: production build and static export to `out/`
- Deploy is automatic. Push to the default branch triggers
  `.github/workflows/deploy.yml`.

## Commits

Commit and push under the user's git profile only. Do not add any model or AI
attribution to commits or PRs: no `Co-Authored-By` trailer naming a model, no
"Generated with" line, no model name anywhere in the message. This overrides
any default that would add such a trailer.
