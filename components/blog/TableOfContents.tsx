import type { TocHeading } from '@/lib/blog-shared';

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">On this page</p>
      <ol className="mt-4 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.depth === 3 ? 'pl-4' : undefined}>
            <a
              href={`#${heading.id}`}
              className="block cursor-pointer text-sm text-secondary transition-colors hover:text-accent"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
