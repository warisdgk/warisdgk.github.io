# Personalize this portfolio (one prompt, any AI tool)

This is the recipe for turning this template into your own portfolio. It works
in Claude Code, Cursor, Codex, GitHub Copilot, Windsurf, or any agent that can
read files and run commands. Point your tool at this file and give it your
background. It does the rest.

## The one prompt

Paste this into your AI tool of choice, fill the brackets, and run it:

> Read `PERSONALIZE.md` and follow it to personalize this portfolio. Only edit
> `config/site.config.ts`, `data/portfolio.ts`, and files in `public/`. Never
> touch `app/`, `components/`, or any build or config file. My background:
>
> [paste your resume text or LinkedIn export here, or say "read public/cv.pdf",
> or say "interview me with 5 questions first"]

That is the whole interaction. Everything below is what the agent should do
once it reads this file, so you do not have to spell it out.

## What the agent does

1. **Learn the schema.** Read `config/site.config.ts` and `data/portfolio.ts`.
   Both files carry inline comments and TypeScript types that describe every
   field. Do not guess field names; read them.

2. **Rewrite the two files with real content.** Map the person's history into
   the typed structures:
   - Identity, role, tagline, location, email, socials, and SEO `url` go in
     `config/site.config.ts`.
   - About paragraphs, skills, experience, projects, education, and
     certifications go in `data/portfolio.ts`.
   - Keep every type valid. To add an entry, copy an existing object in the
     relevant array and change its values.

3. **Set the rebrand knobs** in `config/site.config.ts`:
   - `accentRGB` and `accentRGBDark` as `"R G B"` strings (no commas). Default
     blue is `37 99 235`. Emerald is `5 150 105`. Violet is `124 58 237`.
   - `url` to `https://<their-username>.github.io` (or the project-site URL if
     the repo is not named `<username>.github.io`).
   - `heroRotatingWords`, `logoText`, and `socials` from their background.
   - `repoUrl` to their fork's GitHub URL, or `''` to hide the footer source link.
   - `toptalBadgeUrl` to their Toptal profile, or `''` to hide the Toptal badge
     in Contact (most people leave this empty).

4. **Turn off what they do not have.** If a section has no content (for
   example, no certifications), set its toggle to `false` in
   `siteConfig.sections` rather than leaving it empty. The section and its nav
   link disappear with no code deleted.

5. **Keep the prose human.** Apply the rules in
   `.claude/skills/humanizer/SKILL.md` to all about paragraphs and project
   descriptions. The hard rule for this repo: never use em dashes or en dashes.
   Use commas, periods, colons, or parentheses. In Claude Code you can run
   `/humanizer` instead; in other tools, read that file and apply it yourself.

6. **Respect the design system.** For any visual change, follow
   `DESIGN_SYSTEM.md`. Do not invent new colors or drift toward generic
   template looks.

7. **Verify.** Run `npm install` if needed, then `npm run build`. Fix any type
   errors until the build passes. The build is the proof the files are valid.

8. **Report remaining assets.** Tell the user which files in `public/` they
   still need to replace by hand: `cv.pdf` (their resume), `og-image.png` (the
   social preview, 1200x630), and `favicon.svg`.

## Input modes

Pick whichever fits the tool you are using:

- **Pasted text.** Paste resume or LinkedIn content into the prompt. Works in
  every tool. This is the safe default.
- **CV PDF.** Drop your resume at `public/cv.pdf` and tell the agent to read
  it. Claude Code reads PDFs directly. Cursor and Codex may need you to convert
  it first (for example `pdftotext public/cv.pdf -` and paste the output).
- **Interview.** Tell the agent to ask you five questions, then fill the files
  from your answers. Good when you have no resume handy.

## Boundaries

Edit only these:

- `config/site.config.ts`
- `data/portfolio.ts`
- assets in `public/`

Leave these alone. They are the engine:

- `app/`, `components/`, `lib/`
- `next.config.js`, `tailwind.config.ts`, `package.json`
- `.github/workflows/`

After the files are right, push to your default branch. The included GitHub
Actions workflow builds and deploys to GitHub Pages on its own.
