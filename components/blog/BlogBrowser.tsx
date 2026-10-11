'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { comparePosts, postMatches, type PostSummary, type TagSummary } from '@/lib/blog-shared';
import { PostList } from './PostList';

export function BlogBrowser({
  header,
  posts,
  tags,
  activeTag,
  children,
}: {
  header: React.ReactNode;
  posts: PostSummary[];
  tags: TagSummary[];
  activeTag?: string;
  children: React.ReactNode;
}) {
  const showSearch = siteConfig.blog.search;
  const [query, setQuery] = useState('');
  const searching = showSearch && query.trim().length > 0;
  const matches = useMemo(
    () => posts.filter((post) => postMatches(post, query)).sort(comparePosts),
    [posts, query],
  );
  return (
    <div
      className={
        showSearch
          ? 'lg:grid lg:grid-cols-[minmax(0,42rem)_14rem] lg:items-start lg:gap-x-16'
          : undefined
      }
    >
      <div className="min-w-0 lg:col-start-1">{header}</div>

      {showSearch && (
        <aside className="mt-8 flex flex-col gap-4 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:mt-2">
          <form role="search" onSubmit={(event) => event.preventDefault()} className="w-full">
            <label htmlFor="blog-search" className="sr-only">
              Search posts
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search posts"
              className="w-full rounded-md border border-border bg-transparent px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </form>

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {activeTag && (
                <li>
                  <Link
                    href="/blog"
                    className="inline-flex cursor-pointer rounded-md border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-secondary transition-colors hover:text-accent"
                  >
                    All
                  </Link>
                </li>
              )}
              {tags.map((tag) => {
                const current = tag.slug === activeTag;
                return (
                  <li key={tag.slug}>
                    <Link
                      href={`/blog/tags/${tag.slug}`}
                      aria-current={current ? 'page' : undefined}
                      className={`inline-flex cursor-pointer rounded-md border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                        current
                          ? 'border-foreground text-foreground'
                          : 'border-border text-secondary hover:text-accent'
                      }`}
                    >
                      {tag.name}
                      <span className="ml-1.5 text-muted-foreground">{tag.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      )}

      <div className="mt-12 lg:col-start-1">
        {searching ? (
          <div>
            <p className="eyebrow mb-4" aria-live="polite">
              {matches.length === 1 ? '1 result' : `${matches.length} results`}
            </p>
            {matches.length > 0 ? (
              <PostList posts={matches} />
            ) : (
              <p className="text-secondary">No posts match that search.</p>
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
