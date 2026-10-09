import { RecipePosts } from 'app/components/posts'

const description = 'Recipes and cooking guides.'

export const metadata = {
  title: 'Recipes',
  description,
  alternates: {
    canonical: '/recipes',
  },
  openGraph: {
    title: 'Recipes',
    description,
    url: '/recipes',
    images: ['/og?title=Recipes'],
  },
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Recipes</h1>
      <RecipePosts />
    </section>
  )
}
