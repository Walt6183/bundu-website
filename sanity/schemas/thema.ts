import { defineType, defineField } from 'sanity'

export const themaSchema = defineType({
  name: 'thema',
  title: 'Thema',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'URL-Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'metaDescription', title: 'Meta-Beschreibung', type: 'text', rows: 3 }),
    defineField({ name: 'inhalt', title: 'Inhalt', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'reihenfolge', title: 'Reihenfolge', type: 'number' }),
  ],
})
