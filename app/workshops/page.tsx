import { WorkshopPosts } from 'app/components/posts'

export const metadata = {
  title: 'Workshops',
  description: 'View my workshops and training sessions.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Workshops</h1>
      <WorkshopPosts />
    </section>
  )
}