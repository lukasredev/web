import { TalkPosts } from 'app/components/posts'

const description = 'Talks on search, AI, and cloud-native engineering.'

export const metadata = {
  title: 'Talks',
  description,
  alternates: {
    canonical: '/talks',
  },
  openGraph: {
    title: 'Talks',
    description,
    url: '/talks',
    images: ['/og?title=Talks'],
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Talks</h1>
      <TalkPosts />
    </section>
  )
}
