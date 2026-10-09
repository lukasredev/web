import { WorkshopPosts } from 'app/components/posts'

const description =
  'Hands-on DevOps workshops: SSH, Docker, CI/CD with GitHub Actions, and deploying to Kubernetes (k3s) with HTTPS.'

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