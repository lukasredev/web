import { siteConfig } from 'app/config'
import { getBlogPosts, getWorkshopPosts } from 'app/blog/utils'

export async function GET() {
  let allBlogs = await getBlogPosts()
  let allWorkshops = await getWorkshopPosts()

  const blogItems = allBlogs.map((post) => ({
    ...post,
    type: 'blog' as const,
    path: `/blog/${post.slug}`,
  }))

  const workshopItems = allWorkshops.map((post) => ({
    ...post,
    type: 'workshop' as const,
    path: `/workshops/${post.slug}`,
  }))

  const allItems = [...blogItems, ...workshopItems]

  const itemsXml = allItems
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (item) =>
        `<item>
          <title>${item.metadata.title}</title>
          <link>${siteConfig.url}${item.path}</link>
          <description>${item.metadata.summary || ''}</description>
          <pubDate>${new Date(
            item.metadata.publishedAt
          ).toUTCString()}</pubDate>
          <category>${item.type === 'blog' ? 'Blog' : 'Workshop'}</category>
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
