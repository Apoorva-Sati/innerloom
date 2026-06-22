import type { NextConfig } from "next"

const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https",
        hostname: "cdn.sanity.io" }
    ],
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy",
          value: "camera=(), microphone=()" },
      ],
    }]
  },
}
export default config