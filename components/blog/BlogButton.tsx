import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const styles = {
  chip: {
    link: 'group inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-accent-solid px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-foreground',
    icon: 'h-3.5 w-3.5',
  },
  action: {
    link: 'group inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent',
    icon: 'h-4 w-4',
  },
} as const;

/**
 * Standalone entry to the blog. It is not part of the portfolio section nav.
 * `chip` is the compact desktop label; `action` matches the mobile Hero buttons.
 */
export function BlogButton({ variant = 'chip' }: { variant?: keyof typeof styles }) {
  const { link, icon } = styles[variant];
  return (
    <Link href="/blog" className={link}>
      Blog
      <ArrowUpRight
        className={`${icon} transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
        aria-hidden="true"
      />
    </Link>
  );
}
