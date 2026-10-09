import { siteConfig } from 'app/config'
import { getBlogPosts, getTalkPosts, getWorkshops } from 'app/blog/utils'

const categories = {
  blog: 'Blog',
  workshop: 'Workshop',
  talk: 'Talk',
}

export async function GET() {
  let allBlogs = await getBlogPosts()
  let allWorkshops = await getWorkshops()
  let allTalks = await getTalkPosts()

  const blogItems = allBlogs.map((post) => ({
    ...post,
    type: 'blog' as const,
    path: `/blog/${post.slug}`,
  }))

  const workshopItems = allWorkshops.flatMap((workshop) => [
    {
      ...workshop,
      type: 'workshop' as const,
      path: `/workshops/${workshop.slug}`,
    },
    ...workshop.steps.map((post) => ({
      ...post,
      type: 'workshop' as const,
      path: `/workshops/${workshop.slug}/${post.slug}`,
    })),
  ])

  const talkItems = allTalks.map((post) => ({
    ...post,
    type: 'talk' as const,
    path: `/talks/${post.slug}`,
  }))

  const allItems = [...blogItems, ...workshopItems, ...talkItems]

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
          <category>${categories[item.type]}</category>
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
