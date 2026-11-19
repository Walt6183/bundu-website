import type { MetadataRoute } from 'next'
import { ROUTEN } from '@/lib/seiten'

const BASIS = (process.env.SITE_URL || 'https://bundu.ch').replace(/\/$/, '')
const ALLE = ['/', '/fachwelt/', '/fachwelt/fachpersonen/online-coaching/', ...ROUTEN, '/impressum/', '/datenschutz/']

export default function sitemap(): MetadataRoute.Sitemap {
  return Array.from(new Set(ALLE)).map((r) => ({ url: BASIS + r }))
}
