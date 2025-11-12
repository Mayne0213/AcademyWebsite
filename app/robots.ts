import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/main/', '/dashboard/'], // 비공개 경로
      },
    ],
    sitemap: 'https://joossameng.com/sitemap.xml',
  }
}

