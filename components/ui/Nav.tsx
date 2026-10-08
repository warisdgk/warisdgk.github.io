'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig, type SectionKey } from '@/config/site.config';
import { ThemeToggle } from './ThemeToggle';

const labels: Record<SectionKey, string> = {
  about: 'About',
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  certifications: 'Certifications',
  contact: 'Contact',
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Only show nav items for sections that are both ordered and enabled.
  const items = siteConfig.navOrder.filter((key) => siteConfig.sections[key]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 lg:hidden ${
        scrolled ? 'border-b border-border bg-background/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-rail flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          {siteConfig.logoText || siteConfig.name.split(' ')[0]}
          <span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {items.map((key) => (
            <a
              key={key}
              href={`#${key}`}
              className="rounded-md px-3 py-2 text-sm text-secondary transition-colors hover:text-foreground"
            >
              {labels[key]}
            </a>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-secondary cursor-pointer"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-rail flex flex-col py-2">
            {items.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-secondary transition-colors hover:text-foreground"
              >
                {labels[key]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
