import { BlogPosts } from 'app/components/posts'

const description =
  'Articles on software engineering, cloud-native technologies, and DevOps.'

export const metadata = {
  title: 'Blog',
  description,
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog',
    description,
    url: '/blog',
    images: ['/og?title=Blog'],
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts />
    </section>
  )
}
