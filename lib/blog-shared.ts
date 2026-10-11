export interface TocHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedLabel: string;
  updatedAt?: string;
  updatedLabel?: string;
  tags: string[];
  pinned: boolean;
  /** When false, the post stays off the blog index. The article URL still works. */
  published: boolean;
  draft: boolean;
  /** Site path, without basePath. Example: /blog/images/diagram.svg */
  coverPath?: string;
  /** basePath-aware URL for <img src>. */
  coverSrc?: string;
  coverAlt?: string;
  readingTime: string;
}

export interface TagSummary {
  name: string;
  slug: string;
  count: number;
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

export function postMatches(post: PostSummary, query: string): boolean {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  const haystack = [post.title, post.description, post.tags.join(' ')].join(' ').toLowerCase();
  return words.every((word) => haystack.includes(word));
}

export function comparePosts(a: PostSummary, b: PostSummary): number {
  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
  return b.publishedAt.localeCompare(a.publishedAt);
}
