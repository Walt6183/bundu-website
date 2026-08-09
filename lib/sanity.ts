import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Queries
export const ANGEBOTE_QUERY = `*[_type == "angebot"] | order(reihenfolge asc) {
  _id, title, slug, subtitle, zielgruppe, preis
}`

export const ANGEBOT_BY_SLUG_QUERY = `*[_type == "angebot" && slug.current == $slug][0] {
  _id, title, slug, subtitle, metaDescription, zielgruppe, preis,
  nutzenListe, fuerWen, inhalte, ablaufListe
}`

export const IMPULSE_QUERY = `*[_type == "impuls"] | order(datum desc) {
  _id, title, slug, datum, kategorie, excerpt
}`

export const IMPULS_BY_SLUG_QUERY = `*[_type == "impuls" && slug.current == $slug][0] {
  _id, title, slug, datum, kategorie, excerpt, inhalt
}`

export const THEMEN_QUERY = `*[_type == "thema"] | order(reihenfolge asc) {
  _id, title, slug, metaDescription
}`

export const THEMA_BY_SLUG_QUERY = `*[_type == "thema" && slug.current == $slug][0] {
  _id, title, slug, metaDescription, inhalt
}`

export const FAQ_QUERY = `*[_type == "faq"] | order(reihenfolge asc) {
  _id, frage, antwort, kategorie
}`

export const REFERENZEN_QUERY = `*[_type == "referenz"] | order(reihenfolge asc) {
  _id, name, organisation, zitat
}`

export const DOWNLOADS_QUERY = `*[_type == "download"] | order(reihenfolge asc) {
  _id, title, beschreibung, datei, kategorie
}`
