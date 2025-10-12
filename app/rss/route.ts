import { siteConfig } from 'app/config'
import { getBlogPosts, sortPostsByDate } from 'app/blog/utils'

export async function GET() {
  let allBlogs = await getBlogPosts()

  const itemsXml = sortPostsByDate(allBlogs)
    .map(
      (post) =>
        `<item>
          <title>${post.metadata.title}</title>
          <link>${siteConfig.url}/blog/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${siteConfig.name}</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
