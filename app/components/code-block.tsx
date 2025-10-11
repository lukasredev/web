'use client'

import { useState } from 'react'

export function CodeBlock({ children, ...props }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    // Extract text content from the code element
    // The structure is: <pre><code>text</code></pre>
    let code = ''

    if (typeof children === 'string') {
      code = children
    } else if (children?.props?.children) {
      const codeContent = children.props.children
      code = typeof codeContent === 'string' ? codeContent : codeContent?.toString() || ''
    }

    try {
      await navigator.clipboard.writeText(code.trim())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="relative group">
      <pre {...props}>
        {children}
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label="Copy code to clipboard"
        type="button"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-green-600 dark:text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-neutral-600 dark:text-neutral-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        )}
      </button>
    </div>
  )
}
