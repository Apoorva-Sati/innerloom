import type { NextConfig } from "next"

const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async headers() {
    return [
      {
        // Allow sanity.io to iframe the /studio route only
        source: "/studio/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' https://sanity.io https://*.sanity.io",
          },
          // X-Frame-Options is superseded by CSP frame-ancestors above,
          // but some older browsers still read it — omit it here so CSP wins
        ],
      },
      {
        // All other routes stay locked down
        source: "/((?!studio).*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=()" },
        ],
      },
    ]
  },
}

export default config