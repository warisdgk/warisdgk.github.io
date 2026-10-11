import Link from 'next/link';
import type { PostSummary } from '@/lib/blog-shared';

export function PostList({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) {
    return <p className="text-secondary">No posts yet.</p>;
  }

  return (
    <ol className="space-y-4">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="grid grid-cols-[8rem_minmax(0,1fr)] items-baseline gap-x-5 font-sans text-base sm:gap-x-8"
        >
          <time dateTime={post.publishedAt} className="whitespace-nowrap font-mono tabular-nums text-muted-foreground">
            {post.publishedLabel}
          </time>
          <Link
            href={`/blog/${post.slug}`}
            className="cursor-pointer text-foreground underline decoration-muted-foreground/60 decoration-1 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ol>
  );
}
