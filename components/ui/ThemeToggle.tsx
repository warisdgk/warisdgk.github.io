'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: render a stable placeholder until mounted.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  // Keep the label stable until mounted so SSR and client markup agree.
  const label = !mounted ? 'Toggle theme' : isDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-secondary transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
    >
      {mounted ? (
        isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}
