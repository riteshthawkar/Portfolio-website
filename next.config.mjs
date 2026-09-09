/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const basePath = isGithubPages ? '/Portfolio-website' : ''

const nextConfig = {
  agentRules: false,
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
