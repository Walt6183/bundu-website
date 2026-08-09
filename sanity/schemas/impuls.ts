import { defineType, defineField } from 'sanity'

export const impulsSchema = defineType({
  name: 'impuls',
  title: 'Impuls (Blog)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'URL-Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'datum', title: 'Datum', type: 'date' }),
    defineField({ name: 'kategorie', title: 'Kategorie', type: 'string',
      options: { list: ['Eltern-News', 'Neue Autorität', 'Praxisbericht', 'Systemik', 'Allgemein'] }
    }),
    defineField({ name: 'excerpt', title: 'Zusammenfassung', type: 'text', rows: 3 }),
    defineField({ name: 'inhalt', title: 'Inhalt', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'datum' } },
})
