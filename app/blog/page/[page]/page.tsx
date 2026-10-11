import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { getAllPosts, paginatePosts } from '@/lib/blog';
import { BlogIndexPage } from '@/components/blog/BlogIndexPage';

export const dynamicParams = false;

// Static export fails on a dynamic route with no params, so page 1 is always
// generated (canonical points at /blog/) even when everything fits on one page.
export async function generateStaticParams() {
  const regular = (await getAllPosts()).filter((post) => post.published && !post.pinned);
  const { totalPages } = paginatePosts(regular, 1, siteConfig.blog.postsPerPage);
  return Array.from({ length: totalPages }, (_, index) => ({ page: String(index + 1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const number = Number(page);
  return {
    title: number === 1 ? siteConfig.blog.title : `Blog, page ${number}`,
    description: siteConfig.blog.description,
    alternates: { canonical: number === 1 ? '/blog/' : `/blog/page/${number}/` },
  };
}

export default async function BlogPagedPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const number = Number(page);
  if (!Number.isInteger(number) || number < 1) notFound();
  return <BlogIndexPage page={number} />;
}
