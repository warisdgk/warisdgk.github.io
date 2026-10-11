import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag, toSummary } from '@/lib/blog';
import { BlogBrowser } from '@/components/blog/BlogBrowser';
import { BlogHeader } from '@/components/blog/BlogHeader';
import { PostList } from '@/components/blog/PostList';

export const dynamicParams = false;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ tag: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: slug } = await params;
  const tag = (await getAllTags()).find((item) => item.slug === slug);
  if (!tag) return {};
  return {
    title: tag.name,
    description: `Notes tagged ${tag.name}.`,
    alternates: { canonical: `/blog/tags/${tag.slug}/` },
  };
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: slug } = await params;
  const tags = await getAllTags();
  const tag = tags.find((item) => item.slug === slug);
  if (!tag) notFound();

  const posts = (await getPostsByTag(slug)).map(toSummary);
  const countLabel = tag.count === 1 ? '1 post' : `${tag.count} posts`;

  return (
    <BlogBrowser
      header={<BlogHeader eyebrow="Tag" title={tag.name} description={countLabel} />}
      posts={posts}
      tags={tags}
      activeTag={tag.slug}
    >
      <PostList posts={posts} />
    </BlogBrowser>
  );
}
