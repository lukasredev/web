import { getBlogPosts, getWorkshopPosts } from 'app/blog/utils'
import { siteConfig } from './config'

export const baseUrl = siteConfig.url

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let workshops = getWorkshopPosts().map((post) => ({
    url: `${siteConfig.url}/workshops/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/blog', '/workshops'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...workshops]
}
