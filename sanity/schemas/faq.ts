import { defineType, defineField } from 'sanity'

export const faqSchema = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'frage', title: 'Frage', type: 'string', validation: r => r.required() }),
    defineField({ name: 'antwort', title: 'Antwort', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({ name: 'kategorie', title: 'Kategorie', type: 'string',
      options: { list: ['Allgemein', 'Für Eltern', 'Für Fachpersonen', 'Für Institutionen'] }
    }),
    defineField({ name: 'reihenfolge', title: 'Reihenfolge', type: 'number' }),
  ],
})
