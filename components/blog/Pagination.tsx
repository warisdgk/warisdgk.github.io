import Link from 'next/link';

function pageHref(page: number): string {
  return page <= 1 ? '/blog' : `/blog/page/${page}`;
}

export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages < 2) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="mt-10 flex flex-wrap items-center gap-2">
      {page > 1 ? (
        <Link
          href={pageHref(page - 1)}
          className="cursor-pointer rounded-md border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-secondary transition-colors hover:text-accent"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Previous
        </span>
      )}

      {pages.map((number) => {
        const current = number === page;
        return (
          <Link
            key={number}
            href={pageHref(number)}
            aria-current={current ? 'page' : undefined}
            className={`inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border font-mono text-xs ${
              current
                ? 'border-foreground text-foreground'
                : 'border-border text-secondary transition-colors hover:text-accent'
            }`}
          >
            {number}
          </Link>
        );
      })}

      {page < totalPages ? (
        <Link
          href={pageHref(page + 1)}
          className="cursor-pointer rounded-md border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-secondary transition-colors hover:text-accent"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md border border-border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Next
        </span>
      )}
    </nav>
  );
}
