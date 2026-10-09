import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/components/mdx'
import { formatDate, getWorkshops } from 'app/blog/utils'
import { siteConfig } from 'app/config'

type Params = Promise<{ workshop: string; slug: string }>

function getWorkshopStep(workshopSlug: string, slug: string) {
  let workshop = getWorkshops().find((workshop) => workshop.slug === workshopSlug)
  let post = workshop?.steps.find((post) => post.slug === slug)
  return { workshop, post }
}

export async function generateStaticParams() {
  return getWorkshops().flatMap((workshop) =>
    workshop.steps.map((post) => ({
      workshop: workshop.slug,
      slug: post.slug,
    }))
  )
}

export async function generateMetadata({ params }: { params: Params }) {
  const { workshop: workshopSlug, slug } = await params
  let { post } = getWorkshopStep(workshopSlug, slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${siteConfig.url}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    alternates: {
      canonical: `/workshops/${workshopSlug}/${post.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${siteConfig.url}/workshops/${workshopSlug}/${post.slug}`,
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

export default async function WorkshopStep({ params }: { params: Params }) {
  const { workshop: workshopSlug, slug } = await params
  let { workshop, post } = getWorkshopStep(workshopSlug, slug)

  if (!workshop || !post) {
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
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${siteConfig.url}${post.metadata.image}`
              : `${siteConfig.url}/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${siteConfig.url}/workshops/${workshop.slug}/${post.slug}`,
            author: {
              '@type': 'Person',
              name: siteConfig.author,
            },
          }),
        }}
      />
      <Link
        href={`/workshops/${workshop.slug}`}
        className="block mb-4 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"
      >
        ← {workshop.metadata.title}
      </Link>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
