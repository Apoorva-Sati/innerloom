import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://innerloom.in"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ['/admin', '/studio', '/api/'], 
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}