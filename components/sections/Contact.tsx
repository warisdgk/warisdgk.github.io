import { Mail } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/config/site.config';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { ToptalBadge } from '@/components/ui/ToptalBadge';

export function Contact() {
  return (
    <Section id="contact" index="07" title="Contact">
      <Reveal>
        <h3 className="font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          Let&apos;s build something.
        </h3>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
          I&apos;m open to Senior, Lead and Staff engineering roles, remote or hybrid. Email is the fastest
          way to reach me, or find me on the platforms below.
        </p>

        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent-solid px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {siteConfig.email}
        </a>

        <div className="mt-8 flex items-center gap-1">
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
      </Reveal>

      {siteConfig.toptalBadgeUrl && (
        <Reveal delay={0.15}>
          <div className="mt-12">
            <ToptalBadge href={siteConfig.toptalBadgeUrl} />
          </div>
        </Reveal>
      )}
    </Section>
  );
}
