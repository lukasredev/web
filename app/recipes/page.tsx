import { RecipePosts } from 'app/components/posts'

export const metadata = {
  title: 'Recipes',
  description: 'View my recipes and cooking guides.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Recipes</h1>
      <RecipePosts />
    </section>
  )
}
