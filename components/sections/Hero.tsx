'use client';

import { motion } from 'framer-motion';
import { Download, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { TypingText } from '@/components/ui/TypingText';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { asset } from '@/lib/asset';

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/**
 * Identity block for mobile and tablet (< lg), where the desktop Rail is
 * hidden. Carries the name, rotating roles, value statement, and actions.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden lg:hidden">
      <div className="absolute inset-0 hero-grid" aria-hidden="true" />

      <div className="relative flex min-h-[88vh] flex-col justify-center py-24">
        <motion.p
          custom={0}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mb-6 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-secondary"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Available for work
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fade}
          className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl"
        >
          {siteConfig.name}
        </motion.h1>

        <motion.div
          custom={2}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-5 flex flex-wrap items-baseline gap-x-3 font-mono text-base text-secondary sm:text-lg"
        >
          <span>{siteConfig.role}</span>
          <span className="text-border">/</span>
          <TypingText words={siteConfig.heroRotatingWords} className="text-foreground" />
        </motion.div>

        <motion.p
          custom={3}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg"
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-accent-solid px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 cursor-pointer"
          >
            Get in touch
          </a>
          {siteConfig.resumePath && (
            <a
              href={asset(siteConfig.resumePath)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent cursor-pointer"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download CV
            </a>
          )}
        </motion.div>

        <motion.div
          custom={5}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-8 flex items-center gap-4"
        >
          <div className="flex items-center gap-1">
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
          </div>
          <span className="h-5 w-px bg-border" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {siteConfig.location}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
