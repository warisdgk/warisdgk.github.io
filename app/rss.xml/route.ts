import { buildRss } from '@/lib/blog';

export const dynamic = 'force-static';

export async function GET() {
  const xml = await buildRss();
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
