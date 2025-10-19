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

  // TypeScript build-time checking
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
