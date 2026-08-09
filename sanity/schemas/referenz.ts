import { defineType, defineField } from 'sanity'

export const referenzSchema = defineType({
  name: 'referenz',
  title: 'Referenz',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'organisation', title: 'Organisation / Funktion', type: 'string' }),
    defineField({ name: 'zitat', title: 'Zitat', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({ name: 'reihenfolge', title: 'Reihenfolge', type: 'number' }),
  ],
})
