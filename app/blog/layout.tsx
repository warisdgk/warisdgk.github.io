import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { BlogShell } from '@/components/blog/BlogShell';

export const metadata: Metadata = {
  alternates: {
    types: {
      'application/rss+xml': siteConfig.blog.rssPath,
    },
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <BlogShell>{children}</BlogShell>;
}
