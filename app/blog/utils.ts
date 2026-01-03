import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)

  if (!match || !match[1]) {
    throw new Error('Invalid frontmatter format: Missing or malformed frontmatter block')
  }

  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  try {
    frontMatterLines.forEach((line) => {
      let colonIndex = line.indexOf(': ')
      if (colonIndex === -1) {
        console.warn(`Skipping invalid frontmatter line: ${line}`)
        return
      }

      let key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 2).trim()
      value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
      metadata[key as keyof Metadata] = value
    })
  } catch (error) {
    throw new Error(`Failed to parse frontmatter: ${error}`)
  }

  // Validate required fields
  if (!metadata.title || !metadata.publishedAt || !metadata.summary) {
    throw new Error('Missing required frontmatter fields: title, publishedAt, or summary')
  }

  return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
  try {
    let rawContent = fs.readFileSync(filePath, 'utf-8')
    return parseFrontmatter(rawContent)
  } catch (error) {
    throw new Error(`Failed to read MDX file at ${filePath}: ${error}`)
  }
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'blog', 'posts'))
}

export function getWorkshopPosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'workshops', 'posts'))
}

export function getRecipePosts() {
  return getMDXData(path.join(process.cwd(), 'app', 'recipes', 'posts'))
}

type Post = {
  metadata: Metadata
  slug: string
  content: string
}

export function sortPostsByDate(posts: Post[]) {
  return posts.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1
    }
    return 1
  })
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  // Calculate difference in milliseconds
  const diffInMs = currentDate.getTime() - targetDate.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  const diffInMonths = Math.floor(diffInDays / 30)
  const diffInYears = Math.floor(diffInDays / 365)

  let formattedDate = ''

  if (diffInYears > 0) {
    formattedDate = `${diffInYears}y ago`
  } else if (diffInMonths > 0) {
    formattedDate = `${diffInMonths}mo ago`
  } else if (diffInDays > 0) {
    formattedDate = `${diffInDays}d ago`
  } else {
    formattedDate = 'Today'
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
