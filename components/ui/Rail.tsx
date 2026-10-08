'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { siteConfig, type SectionKey } from '@/config/site.config';
import { SocialIcon } from './SocialIcon';
import { ThemeToggle } from './ThemeToggle';
import { asset } from '@/lib/asset';

const labels: Record<SectionKey, string> = {
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  certifications: 'Certifications',
  contact: 'Contact',
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Derived from static config, so it is stable across renders. Hoisting it keeps
// the scroll-spy effect from re-subscribing on every render.
const items = siteConfig.navOrder.filter((key) => siteConfig.sections[key]);

/**
 * Desktop-only identity rail. Sticks to the left while the content column
 * scrolls on the right. Carries the name, value statement, primary actions,
 * a scroll-spy section nav, and the social links. Hidden below lg, where the
 * Hero and mobile Nav take over.
 */
export function Rail() {
  const [active, setActive] = useState<string>(items[0] ?? '');

  // Scroll spy: keep a live map of which sections sit in the active band near
  // the top of the viewport, then highlight the first one in nav order. Reading
  // the whole set (not just the latest entry) avoids a stale highlight when a
  // short section scrolls through the band without ever being the lone hit.
  useEffect(() => {
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
        const current = items.find((id) => visible.get(id));
        if (current) setActive(current);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );
    items.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24 xl:w-[40%]">
      <div>
        <motion.p custom={0} initial="hidden" animate="show" variants={fade} className="eyebrow">
          {siteConfig.role}
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-4 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance xl:text-6xl"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-6 max-w-sm text-base leading-relaxed text-muted-foreground text-pretty"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.nav
          custom={3}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-14"
          aria-label="Sections"
        >
          <ul className="space-y-1">
            {items.map((key) => {
              const isActive = active === key;
              return (
                <li key={key}>
                  <a href={`#${key}`} className="group flex items-center gap-4 py-1.5">
                    <span
                      className={`h-px transition-all duration-300 ${
                        isActive
                          ? 'w-16 bg-foreground'
                          : 'w-8 bg-border group-hover:w-16 group-hover:bg-foreground'
                      }`}
                    />
                    <span
                      className={`font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? 'text-foreground'
                          : 'text-muted-foreground group-hover:text-foreground'
                      }`}
                    >
                      {labels[key]}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </motion.nav>
      </div>

      <motion.div custom={4} initial="hidden" animate="show" variants={fade} className="mt-12">
        {siteConfig.resumePath && (
          <a
            href={asset(siteConfig.resumePath)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent cursor-pointer"
          >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            Download CV
          </a>
        )}

        <div className="mt-6 flex items-center gap-1">
          {siteConfig.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-secondary transition-colors hover:text-accent cursor-pointer"
            >
              <SocialIcon icon={s.icon} className="h-5 w-5" />
            </a>
          ))}
          <span className="mx-2 h-5 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
        </div>
      </motion.div>
    </header>
  );
}
