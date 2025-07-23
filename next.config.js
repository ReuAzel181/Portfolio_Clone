/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  // Environment variables are now handled through Vercel's UI
};

module.exports = nextConfig; 