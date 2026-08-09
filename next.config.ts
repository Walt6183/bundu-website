import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  transpilePackages: ['@sanity/ui', '@sanity/icons', '@sanity/vision'],
}

export default nextConfig
