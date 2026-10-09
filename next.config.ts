import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable strict mode for better debugging
  reactStrictMode: true,

  // Configure image domains if using external images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Add any external image domains here
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },

  // The DevOps workshop guides used to live directly under /workshops
  async redirects() {
    return [
      {
        source: '/workshops/0-viscon-2025',
        destination: '/workshops/devops',
        permanent: true,
      },
      {
        source: '/workshops/:slug(\\d+-[a-z0-9-]+)',
        destination: '/workshops/devops/:slug',
        permanent: true,
      },
    ]
  },

  // TypeScript build-time checking
  typescript: {
    ignoreBuildErrors: false,
  },

  experimental: {
    // TypeScript 7 no longer ships the compiler API Next.js uses for type checking
    useTypeScriptCli: true,
  },
}

export default nextConfig
