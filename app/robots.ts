import type { MetadataRoute } from 'next'

// Adresse aus SITE_URL (Produktion: https://bundu.ch).
const BASIS = (process.env.SITE_URL || 'https://bundu.ch').replace(/\/$/, '')

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: BASIS + '/sitemap.xml' }
}
