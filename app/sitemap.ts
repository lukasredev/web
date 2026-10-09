import type { MetadataRoute } from 'next'
import { getBlogPosts, getRecipePosts, getTalkPosts, getWorkshops } from 'app/blog/utils'
import { siteConfig } from './config'

export const baseUrl = siteConfig.url

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let workshops = getWorkshops().flatMap((workshop) => [
    {
      url: `${siteConfig.url}/workshops/${workshop.slug}`,
      lastModified: workshop.metadata.publishedAt,
    },
    ...workshop.steps.map((post) => ({
      url: `${siteConfig.url}/workshops/${workshop.slug}/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    })),
  ])

  let talks = getTalkPosts().map((post) => ({
    url: `${siteConfig.url}/talks/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let recipes = getRecipePosts().map((post) => ({
    url: `${siteConfig.url}/recipes/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog', '/workshops', '/talks', '/recipes'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...workshops, ...talks, ...recipes]
}
