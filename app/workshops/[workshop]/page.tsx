import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getWorkshops } from 'app/blog/utils'
import { siteConfig } from 'app/config'

type Params = Promise<{ workshop: string }>

export async function generateStaticParams() {
  return getWorkshops().map((workshop) => ({
    workshop: workshop.slug,
  }))
}

export async function generateMetadata({ params }: { params: Params }) {
  const { workshop: slug } = await params
  let workshop = getWorkshops().find((workshop) => workshop.slug === slug)
  if (!workshop) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = workshop.metadata
  let ogImage = image
    ? image
    : `${siteConfig.url}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    alternates: {
      canonical: `/workshops/${workshop.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${siteConfig.url}/workshops/${workshop.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Workshop({ params }: { params: Params }) {
  const { workshop: slug } = await params
  let workshop = getWorkshops().find((workshop) => workshop.slug === slug)

  if (!workshop) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: workshop.metadata.title,
            datePublished: workshop.metadata.publishedAt,
            dateModified: workshop.metadata.publishedAt,
            description: workshop.metadata.summary,
            image: workshop.metadata.image
              ? `${siteConfig.url}${workshop.metadata.image}`
              : `${siteConfig.url}/og?title=${encodeURIComponent(workshop.metadata.title)}`,
            url: `${siteConfig.url}/workshops/${workshop.slug}`,
            author: {
              '@type': 'Person',
              name: siteConfig.author,
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {workshop.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(workshop.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={workshop.content} />
      </article>
      {workshop.steps.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-xl font-semibold tracking-tighter">Workshop Guides</h2>
          {workshop.steps.map((post) => (
            <Link
              key={post.slug}
              className="block mb-4 text-neutral-900 dark:text-neutral-100 tracking-tight"
              href={`/workshops/${workshop.slug}/${post.slug}`}
            >
              {post.metadata.title}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
