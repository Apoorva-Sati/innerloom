import type { NextConfig } from "next"
const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 604800, // 7 days

    remotePatterns: [
      { protocol: "https",
        hostname: "cdn.sanity.io" }
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",
            value: "camera=(), microphone=()" },
        ],
      },
      {
        // Immutable cache for Next.js static chunk assets
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Long cache for public images (1 week)
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ]
  },
}
export default config