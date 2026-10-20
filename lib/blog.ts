import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';
import type { Root as MarkdownRoot } from 'mdast';
import { siteConfig } from '@/config/site.config';
import { asset } from '@/lib/asset';
import {
  comparePosts,
  formatPostDate,
  tagSlug,
  type PostSummary,
  type TagSummary,
  type TocHeading,
} from '@/lib/blog-shared';

export type { PostSummary, TagSummary, TocHeading };
export { comparePosts, formatPostDate, postMatches, tagSlug } from '@/lib/blog-shared';

export interface Post extends PostSummary {
  html: string;
  headings: TocHeading[];
}

export function toSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    publishedLabel: post.publishedLabel,
    updatedAt: post.updatedAt,
    updatedLabel: post.updatedLabel,
    tags: post.tags,
    pinned: post.pinned,
    published: post.published,
    draft: post.draft,
    coverPath: post.coverPath,
    coverSrc: post.coverSrc,
    coverAlt: post.coverAlt,
    readingTime: post.readingTime,
  };
}

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

let productionCache: Promise<Post[]> | null = null;

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}

function asDate(value: unknown, file: string, field: string): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    // Date-only YAML is often UTC midnight. A zoned local midnight is not.
    if (value.getUTCHours() === 0 && value.getUTCMinutes() === 0) {
      return value.toISOString().slice(0, 10);
    }
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const day = String(value.getDate()).padStart(2, '0');
    return `${value.getFullYear()}-${month}-${day}`;
  }
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value.trim())) {
    return value.trim().slice(0, 10);
  }
  return fail(file, `${field} must be a YYYY-MM-DD date`);
}

function asString(value: unknown, file: string, field: string): string {
  if (typeof value === 'string' && value.trim()) return value.trim();
  return fail(file, `${field} is required`);
}

function asTags(value: unknown, file: string): string[] {
  const tags = Array.isArray(value) ? value : typeof value === 'string' ? [value] : null;
  if (!tags || tags.length === 0 || tags.some((tag) => typeof tag !== 'string' || !tag.trim())) {
    return fail(file, 'tags must be a non-empty list of strings');
  }
  return tags.map((tag) => tag.trim());
}

function asBoolean(value: unknown, fallback: boolean): boolean {
  if (value === undefined) return fallback;
  return value === true;
}

export function resolveBlogImage(src: string, sourceFile: string): { publicPath: string; href: string } {
  const trimmed = src.trim();
  if (/^(https?:)?\/\//.test(trimmed) || trimmed.startsWith('data:')) {
    return { publicPath: trimmed, href: trimmed };
  }

  const relative = trimmed.replace(/^\.\//, '').replace(/^\/+/, '');
  if (!relative.startsWith('images/') || relative.includes('..')) {
    return fail(
      sourceFile,
      `image "${src}" should be referenced as images/<file> from public/blog/images`,
    );
  }

  const absolute = path.join(process.cwd(), 'public', 'blog', relative);
  if (!fs.existsSync(absolute)) {
    return fail(sourceFile, `missing ${relative}`);
  }

  const publicPath = `/blog/${relative.split(path.sep).join('/')}`;
  return { publicPath, href: asset(publicPath) };
}

function readingTime(markdown: string): string {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function extractHeadings(markdown: string): TocHeading[] {
  const slugger = new GithubSlugger();
  const headings: TocHeading[] = [];
  let inFence = false;

  for (const line of markdown.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+?)\s*#*$/.exec(trimmed);
    if (!match) continue;

    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[`*_]/g, '')
      .trim();
    const id = slugger.slug(text);
    const depth = match[1].length;
    if (depth === 2 || depth === 3) headings.push({ id, text, depth });
  }

  return headings;
}

function remarkImageAttributes(sourceFile: string) {
  return (tree: MarkdownRoot) => {
    visit(tree, 'image', (image, index, parent) => {
      if (index === undefined || !parent) return;

      const following = parent.children[index + 1];
      if (following?.type !== 'text') return;

      const attributeMatch = /^(\s*)\{([^{}]+)\}/.exec(following.value);
      if (!attributeMatch || !/(?:^|\s)(?:width|height|align)=/.test(attributeMatch[2])) return;

      const dimensions: Partial<Record<'width' | 'height', number>> = {};
      let alignment: 'left' | 'center' | 'right' | undefined;
      for (const attribute of attributeMatch[2].trim().split(/\s+/)) {
        const match = /^(width|height|align)=(.+)$/.exec(attribute);
        if (!match) {
          fail(
            sourceFile,
            `invalid image attribute "${attribute}", use width=<pixels>, height=<pixels>, or align=left|center|right`,
          );
        }

        if (match[1] === 'align') {
          if (
            (match[2] !== 'left' && match[2] !== 'center' && match[2] !== 'right') ||
            alignment !== undefined
          ) {
            fail(
              sourceFile,
              `invalid or repeated image alignment "${attribute}", use align=left, align=center, or align=right`,
            );
          }
          alignment = match[2];
          continue;
        }

        if (!/^\d+$/.test(match[2])) {
          fail(sourceFile, `invalid image dimension "${attribute}", use a positive pixel value`);
        }
        const value = Number(match[2]);
        const dimension = match[1] === 'width' ? 'width' : 'height';
        if (!Number.isSafeInteger(value) || value < 1 || dimensions[dimension] !== undefined) {
          fail(sourceFile, `invalid or repeated image dimension "${attribute}"`);
        }
        dimensions[dimension] = value;
      }

      const styles: string[] = [];
      if (alignment) {
        styles.push('display:block', 'width:auto');
        styles.push(
          dimensions.width === undefined
            ? 'max-width:100%'
            : `max-width:min(100%,${dimensions.width}px)`,
        );
        styles.push(`margin-left:${alignment === 'left' ? '0' : 'auto'}`);
        styles.push(`margin-right:${alignment === 'right' ? '0' : 'auto'}`);
      } else if (dimensions.width !== undefined) {
        styles.push(`max-width:${dimensions.width}px`);
      }
      if (dimensions.height !== undefined) styles.push(`max-height:${dimensions.height}px`);
      image.data = {
        ...image.data,
        hProperties: {
          ...image.data?.hProperties,
          style: styles.join(';'),
        },
      };

      following.value = following.value.slice(attributeMatch[0].length);
      if (!following.value) parent.children.splice(index + 1, 1);
    });
  };
}

function rehypeArticle(sourceFile: string) {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img') {
        const src = node.properties.src;
        if (typeof src !== 'string') return;
        node.properties.src = resolveBlogImage(src, sourceFile).href;
        if (typeof node.properties.alt !== 'string') node.properties.alt = '';
        node.properties.loading = 'lazy';
      }

      if (node.tagName === 'a') {
        const href = node.properties.href;
        if (typeof href === 'string' && /^https?:\/\//.test(href)) {
          node.properties.target = '_blank';
          node.properties.rel = ['noopener', 'noreferrer'];
        }
      }
    });

    wrapTables(tree);
  };
}

function wrapTables(node: Root | Element) {
  node.children = node.children.map((child) => {
    if (child.type !== 'element') return child;
    wrapTables(child);
    if (child.tagName !== 'table') return child;
    const wrapper: Element = {
      type: 'element',
      tagName: 'div',
      properties: { className: ['table-wrap'] },
      children: [child],
    };
    return wrapper;
  });
}

async function renderMarkdown(markdown: string, sourceFile: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkImageAttributes, sourceFile)
    .use(remarkRehype)
    .use(rehypeArticle, sourceFile)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: {
        className: ['heading-anchor'],
        ariaLabel: 'Link to this section',
      },
      content: { type: 'text', value: '#' },
    })
    .use(rehypePrettyCode, {
      theme: {
        light: 'github-light',
        dark: 'github-dark',
      },
      keepBackground: false,
      bypassInlineCode: true,
      grid: false,
      defaultLang: 'plaintext',
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

function loadPostFile(fileName: string): Promise<Post> {
  const absolute = path.join(CONTENT_DIR, fileName);
  const slug = fileName.replace(/\.md$/, '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    fail(fileName, 'filename must be a lowercase slug, such as my-post.md');
  }

  const raw = fs.readFileSync(absolute, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data as Record<string, unknown>;
  const publishedAt = asDate(data.publishedAt, fileName, 'publishedAt');
  const updatedAt = data.updatedAt === undefined ? undefined : asDate(data.updatedAt, fileName, 'updatedAt');
  const cover =
    data.cover === undefined || data.cover === ''
      ? undefined
      : resolveBlogImage(asString(data.cover, fileName, 'cover'), fileName);
  const coverAlt = data.coverAlt === undefined ? undefined : asString(data.coverAlt, fileName, 'coverAlt');

  const summary: PostSummary = {
    slug,
    title: asString(data.title, fileName, 'title'),
    description: asString(data.description, fileName, 'description'),
    publishedAt,
    publishedLabel: formatPostDate(publishedAt),
    updatedAt,
    updatedLabel: updatedAt ? formatPostDate(updatedAt) : undefined,
    tags: asTags(data.tags, fileName),
    pinned: asBoolean(data.pinned, false),
    published: asBoolean(data.published, true),
    draft: asBoolean(data.draft, false),
    coverPath: cover?.publicPath,
    coverSrc: cover?.href,
    coverAlt,
    readingTime: readingTime(parsed.content),
  };

  return renderMarkdown(parsed.content, fileName).then((html) => ({
    ...summary,
    html,
    headings: extractHeadings(parsed.content),
  }));
}

async function loadPosts(): Promise<Post[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const fileNames = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name);

  const posts = await Promise.all(fileNames.map((fileName) => loadPostFile(fileName)));
  const includeDrafts = process.env.NODE_ENV !== 'production';
  const slugs = new Set<string>();

  for (const post of posts) {
    if (slugs.has(post.slug)) fail(post.slug, 'duplicate slug');
    slugs.add(post.slug);
  }

  return posts.filter((post) => includeDrafts || !post.draft).sort(comparePosts);
}

export function getAllPosts(): Promise<Post[]> {
  if (process.env.NODE_ENV !== 'production') return loadPosts();
  productionCache ??= loadPosts();
  return productionCache;
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getAllTags(): Promise<TagSummary[]> {
  const posts = await getAllPosts();
  const counts = new Map<string, TagSummary>();

  for (const post of posts) {
    for (const name of post.tags) {
      const slug = tagSlug(name);
      const existing = counts.get(slug);
      if (existing && existing.name !== name) {
        fail(name, `tag slug "${slug}" is already used by "${existing.name}"`);
      }
      if (existing) existing.count += 1;
      else counts.set(slug, { name, slug, count: 1 });
    }
  }

  return Array.from(counts.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getPostsByTag(slug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts
    .filter((post) => post.tags.some((tag) => tagSlug(tag) === slug))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function paginatePosts<T>(posts: T[], page: number, perPage: number): {
  posts: T[];
  page: number;
  totalPages: number;
} {
  const size = Math.max(1, perPage);
  const totalPages = Math.max(1, Math.ceil(posts.length / size));
  const start = (page - 1) * size;
  return { posts: posts.slice(start, start + size), page, totalPages };
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function buildRss(): Promise<string> {
  const posts = await getAllPosts();
  const origin = siteConfig.url.replace(/\/$/, '');
  const channelLink = `${origin}/blog/`;
  const items = posts
    .map((post) => {
      const link = `${origin}/blog/${post.slug}/`;
      const pubDate = new Date(`${post.publishedAt}T00:00:00Z`).toUTCString();
      return [
        '<item>',
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${escapeXml(link)}</link>`,
        `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `<pubDate>${pubDate}</pubDate>`,
        `<description>${escapeXml(post.description)}</description>`,
        '</item>',
      ].join('');
    })
    .join('');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    '<channel>',
    `<title>${escapeXml(`${siteConfig.name} · ${siteConfig.blog.title}`)}</title>`,
    `<link>${escapeXml(channelLink)}</link>`,
    `<description>${escapeXml(siteConfig.blog.description)}</description>`,
    '<language>en</language>',
    items,
    '</channel>',
    '</rss>',
  ].join('');
}
