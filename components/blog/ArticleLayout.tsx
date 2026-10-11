import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { tagSlug, type Post } from '@/lib/blog';
import { MarkdownBody } from './MarkdownBody';
import { TableOfContents } from './TableOfContents';

export function ArticleLayout({ post }: { post: Post }) {
  const showUpdated = Boolean(post.updatedLabel && post.updatedAt && post.updatedAt !== post.publishedAt);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,42rem)_14rem] lg:items-start lg:gap-16">
      <article>
        <Link
          href="/blog"
          className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to blog
        </Link>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <time dateTime={post.publishedAt}>{post.publishedLabel}</time>
          {showUpdated && (
            <>
              <span aria-hidden="true"> / </span>
              Updated <time dateTime={post.updatedAt}>{post.updatedLabel}</time>
            </>
          )}
          <span aria-hidden="true"> / </span>
          {post.readingTime}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {post.tags.map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/tags/${tagSlug(tag)}`}
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-accent"
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>

        {post.coverSrc && (
          <figure className="blog-figure mt-8">
            <img
              src={post.coverSrc}
              alt={post.coverAlt ?? ''}
              className="w-full rounded-lg border border-border"
            />
          </figure>
        )}

        <div className="mt-10">
          <MarkdownBody html={post.html} />
        </div>
      </article>

      {post.headings.length > 0 && (
        <aside className="sticky top-24 mt-2 hidden lg:block">
          <TableOfContents headings={post.headings} />
        </aside>
      )}
    </div>
  );
}
