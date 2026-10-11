import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { asset } from '@/lib/asset';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function BlogShell({ children }: { children: ReactNode }) {
  if (!siteConfig.blog.enabled) notFound();

  const logo = siteConfig.logoText || siteConfig.name.split(' ')[0];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 md:px-8">
          <Link href="/" className="cursor-pointer font-display text-lg font-bold tracking-tight">
            {logo}
            <span className="text-accent">.</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/blog"
              className="cursor-pointer font-mono text-xs uppercase tracking-[0.16em] text-foreground"
            >
              Blog
            </Link>
            <a
              href={asset(siteConfig.blog.rssPath)}
              className="cursor-pointer font-mono text-xs uppercase tracking-[0.16em] text-secondary transition-colors hover:text-accent"
            >
              RSS
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 py-12 md:px-8 md:py-16">
        {children}
        <footer className="mt-16 border-t border-border py-8">
          {siteConfig.socials.length > 0 && (
            <div className="-ml-2.5 mb-4 flex flex-wrap items-center gap-1">
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
          )}
          <p className="font-mono text-xs text-muted-foreground">
            {siteConfig.name} · {siteConfig.location}
          </p>
        </footer>
      </div>
    </div>
  );
}
