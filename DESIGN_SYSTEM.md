# Design System

Generated with the bundled `ui-ux-pro-max` skill for the "developer portfolio" sector,
then tuned for restraint. This is the source of truth for tokens. Edit the accent in
`config/site.config.ts`; everything else flows from these values.

## Direction

Monochrome zinc neutrals with a single blue accent. Editorial, technical, premium.
The brief from the skill was explicit: avoid corporate templates and generic layouts.
Motion is purposeful, never decorative.

## Color tokens

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| background | `#FAFAF8` | `#09090B` | page base (warm paper / near-black OLED) |
| foreground | `#121214` | `#F4F4F5` | body text |
| primary | `#18181B` | `#FAFAFA` | headings, strong surfaces |
| secondary | `#3F3F46` | `#A1A1AA` | secondary text |
| muted | `#F0F0EC` | `#18181B` | subtle surfaces |
| border | `#E2E2DD` | `#26262A` | hairlines, card edges |
| card | `#FFFFFF` | `#101012` | cards, raised surfaces |
| accent | `#2563EB` | `#3B82F6` | links, CTAs, focus ring |

Accent is one variable. Change it in `config/site.config.ts` to rebrand.

## Typography

Three voices, mapped to Tailwind `font-display` / `font-sans` / `font-mono`:

- Display / headings: **Fraunces** (variable serif with optical sizing) for the
  name and section titles. Editorial and magazine-like, the opposite of the
  default Inter look.
- Body / UI: **Inter** (clean, legible, premium).
- Technical / metadata: **JetBrains Mono** for section indices, eyebrows, dates,
  locations, and tech tags. This is what carries the "engineering" half of the
  editorial-engineering feel.
- Scale follows an 8pt rhythm. No random spacing.

Fonts load in `app/layout.tsx` (next/font) and are wired to the Tailwind family
names in `tailwind.config.ts`.

## Layout

- Desktop (lg+): a sticky left identity rail (`Rail.tsx`) holds the name,
  tagline, primary actions, socials, theme toggle, and a scroll-spy section nav
  (the active section's nav line and label highlight on scroll). The content
  column scrolls independently on the right.
- Below lg: the rail collapses. A top `Nav` bar plus the mobile `Hero` carry the
  identity, and sections stack full width.
- Sections are framed by `Section.tsx`: a mono index, a serif title, and a
  trailing hairline rule.

## Motion (restrained)

- Scroll reveal via Intersection Observer, 300 to 400ms ease
- Hover transitions 150 to 300ms
- Hero word rotation (typing)
- Row hover highlight on experience and project entries, animated rail nav lines,
  scroll-spy active state, top scroll-progress bar
- One subtle hero treatment (mobile grid texture), no parallax stacks, no
  autoplay, no heavy Lottie
- `prefers-reduced-motion` disables non-essential motion

## Non-negotiables (from the skill checklist)

- No emoji as icons. Use Lucide SVG icons.
- `cursor-pointer` on every clickable element.
- Visible focus states for keyboard navigation.
- Text contrast 4.5:1 minimum in both modes.
- Responsive at 375, 768, 1024, 1440.
