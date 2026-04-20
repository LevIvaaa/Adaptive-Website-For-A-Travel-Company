/** @type {import('next').NextConfig} */
const basePath = process.env.PAGES_BASE_PATH || ""

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined
}

module.exports = nextConfig
