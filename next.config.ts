import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Align with Vercel project Output Directory (legacy Vite setting: "dist")
  distDir: 'dist',
  reactStrictMode: true,
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  turbopack: {
    root: process.cwd(),
  },
  // Prevent Next.js from generating AGENTS.md / CLAUDE.md
  agentRules: false,
}

export default nextConfig
