import type { Metadata } from 'next'
import { TalkPosts, WorkshopPosts } from 'app/components/posts'
import { siteConfig } from './config'

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

export default function Page() {
  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteConfig.name,
            description: siteConfig.description,
            url: siteConfig.url,
            author: {
              '@type': 'Person',
              name: siteConfig.author,
              url: siteConfig.url,
              sameAs: [siteConfig.links.github],
            },
          }),
        }}
      />
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        {siteConfig.name}
      </h1>
      <p className="mb-4">
        {`I am passionate about using technology to build polished products that solve real-world problems.`}
      </p>
      <div className="my-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">Talks</h2>
        <TalkPosts />
      </div>
      <div className="my-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">Workshops</h2>
        <WorkshopPosts />
      </div>
    </section>
  )
}
