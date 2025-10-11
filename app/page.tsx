import { WorkshopPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I am passionate about using technology to build polished products that solve real-world problems.`}
      </p>
      <div className="my-8">
        <WorkshopPosts />
      </div>
    </section>
  )
}
