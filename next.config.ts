import type { NextConfig } from 'next'

// STATIC_EXPORT=1 builds plain HTML/CSS/JS for the Apache host (meganews.com.br)
const isStaticExport = process.env.STATIC_EXPORT === '1'

const nextConfig: NextConfig = {
  // Align with Vercel project Output Directory (legacy Vite setting: "dist")
  distDir: isStaticExport ? 'out-build' : 'dist',
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
  }),
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
