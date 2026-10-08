import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  /** Small monospace index, e.g. "01". */
  index: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * Consistent section frame: anchor id, numbered mono eyebrow, serif title, and
 * a trailing rule. Width is controlled by the page shell (the content column),
 * so this adds no container of its own.
 */
export function Section({ id, index, title, children, className }: SectionProps) {
  return (
    <section id={id} className={`py-16 first:pt-12 md:py-20 ${className ?? ''}`}>
      <Reveal>
        <div className="mb-10 flex items-baseline gap-4">
          <span className="font-mono text-sm font-medium text-accent">{index}</span>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          <span className="ml-2 h-px flex-1 translate-y-[-0.35rem] bg-border" />
        </div>
      </Reveal>
      {children}
    </section>
  );
}
