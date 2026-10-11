import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import { getAllPosts, getAllTags, paginatePosts, toSummary } from '@/lib/blog';
import { BlogBrowser } from './BlogBrowser';
import { BlogHeader } from './BlogHeader';
import { Pagination } from './Pagination';
import { PostList } from './PostList';

export async function BlogIndexPage({ page }: { page: number }) {
  const posts = (await getAllPosts()).filter((post) => post.published);
  const tags = await getAllTags();
  const pinned = posts.filter((post) => post.pinned);
  const regular = posts.filter((post) => !post.pinned);
  const paged = paginatePosts(regular, page, siteConfig.blog.postsPerPage);

  if (page < 1 || page > paged.totalPages) notFound();

  const showPinned = page === 1 && pinned.length > 0;

  return (
    <BlogBrowser
      header={
        <BlogHeader
          eyebrow={siteConfig.blog.eyebrow}
          title={siteConfig.blog.title}
          description={siteConfig.blog.description}
        />
      }
      posts={posts.map(toSummary)}
      tags={tags}
    >
      {showPinned && (
        <section aria-labelledby="pinned-posts" className="mb-12">
          <h2 id="pinned-posts" className="mb-5 font-sans text-xl font-bold tracking-tight text-foreground">
            Pinned Posts
          </h2>
          <PostList posts={pinned.map(toSummary)} />
        </section>
      )}

      <section aria-labelledby="all-posts">
        <h2 id="all-posts" className="mb-5 font-sans text-xl font-bold tracking-tight text-foreground">
          Posts
        </h2>
        <PostList posts={paged.posts.map(toSummary)} />
        <Pagination page={paged.page} totalPages={paged.totalPages} />
      </section>
    </BlogBrowser>
  );
}
