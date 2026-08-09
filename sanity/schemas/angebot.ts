import { defineType, defineField } from 'sanity'

export const angebotSchema = defineType({
  name: 'angebot',
  title: 'Angebot',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'URL-Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'subtitle', title: 'Untertitel', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta-Beschreibung', type: 'text', rows: 3 }),
    defineField({
      name: 'zielgruppe', title: 'Zielgruppe', type: 'array',
      of: [{ type: 'string' }],
      options: { list: [
        { title: 'Eltern', value: 'eltern' },
        { title: 'Fachpersonen', value: 'fachpersonen' },
        { title: 'Institutionen', value: 'institutionen' },
      ]}
    }),
    defineField({ name: 'preis', title: 'Preis / Konditionen', type: 'string' }),
    defineField({ name: 'nutzenListe', title: 'Ihr Nutzen (Liste)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'fuerWen', title: 'Für wen?', type: 'text', rows: 4 }),
    defineField({ name: 'inhalte', title: 'Inhalte', type: 'text', rows: 6 }),
    defineField({ name: 'ablaufListe', title: 'Ablauf (Liste)', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'reihenfolge', title: 'Reihenfolge', type: 'number' }),
  ],
  orderings: [{ title: 'Reihenfolge', name: 'reihenfolgeAsc', by: [{ field: 'reihenfolge', direction: 'asc' }] }],
})
