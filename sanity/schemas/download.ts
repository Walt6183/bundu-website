import { defineType, defineField } from 'sanity'

export const downloadSchema = defineType({
  name: 'download',
  title: 'Download',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Titel', type: 'string', validation: r => r.required() }),
    defineField({ name: 'beschreibung', title: 'Beschreibung', type: 'text', rows: 3 }),
    defineField({ name: 'datei', title: 'Datei', type: 'file' }),
    defineField({ name: 'kategorie', title: 'Kategorie', type: 'string' }),
    defineField({ name: 'reihenfolge', title: 'Reihenfolge', type: 'number' }),
  ],
})
