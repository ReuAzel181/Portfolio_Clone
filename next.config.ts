import { NextConfig } from 'next';

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
};

export default config;
