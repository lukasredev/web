import Link from 'next/link'
import { formatDate, getBlogPosts, getWorkshopPosts, sortPostsByDate } from 'app/blog/utils'

type PostListProps = {
  posts: ReturnType<typeof getBlogPosts>
  basePath: string
}

function PostList({ posts, basePath }: PostListProps) {
  const sortedPosts = sortPostsByDate(posts)

  return (
    <div>
      {sortedPosts.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`${basePath}/${post.slug}`}
        >
          <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
            <p className="text-neutral-600 dark:text-neutral-400 w-[100px] tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </p>
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.metadata.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export function BlogPosts() {
  return <PostList posts={getBlogPosts()} basePath="/blog" />
}

export function WorkshopPosts() {
  return <PostList posts={getWorkshopPosts()} basePath="/workshops" />
}
