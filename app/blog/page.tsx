import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { BlogIndexPage } from '@/components/blog/BlogIndexPage';

export const metadata: Metadata = {
  title: siteConfig.blog.title,
  description: siteConfig.blog.description,
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: `${siteConfig.blog.title} · ${siteConfig.name}`,
    description: siteConfig.blog.description,
    url: '/blog/',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogIndexPage page={1} />;
}
