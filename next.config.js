/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_KEY: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY,
  },
  images: {
    domains: ['images.ctfassets.net']
  }
}

module.exports = nextConfig
