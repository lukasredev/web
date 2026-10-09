import { WorkshopPosts } from 'app/components/posts'

const description =
  'Hands-on workshops: building a RAG pipeline in Python, and cloud-native DevOps with Docker, GitHub Actions, and Kubernetes (k3s).'

export const metadata = {
  title: 'Workshops',
  description,
  alternates: {
    canonical: '/workshops',
  },
  openGraph: {
    title: 'Workshops',
    description,
    url: '/workshops',
    images: ['/og?title=Workshops'],
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Workshops</h1>
      <WorkshopPosts />
    </section>
  )
}