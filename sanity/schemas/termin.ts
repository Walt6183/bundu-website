import { defineType, defineField } from 'sanity'

// Termin (Phase 3, Entscheid E-4): Schema und Abfrage stehen, die Seiten zeigen nichts an, bis der Inhaber einen Wortlaut freigibt.
export const terminSchema = defineType({
  name: 'termin',
  title: 'Termin',
  type: 'document',
  fields: [
    defineField({ name: 'titel', title: 'Titel', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'datum', title: 'Datum und Uhrzeit', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'ort', title: 'Ort', type: 'string' }),
    defineField({
      name: 'bereich',
      title: 'Bereich',
      type: 'string',
      options: { list: [{ title: 'Eltern', value: 'eltern' }, { title: 'Fachpersonen', value: 'fachpersonen' }, { title: 'Institutionen', value: 'institutionen' }], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'link', title: 'Adresse (Anmeldung oder Information)', type: 'url' }),
    defineField({ name: 'sichtbar', title: 'Sichtbar auf der Seite', type: 'boolean', initialValue: false }),
  ],
  orderings: [{ title: 'Datum', name: 'datumAsc', by: [{ field: 'datum', direction: 'asc' }] }],
  preview: { select: { title: 'titel', subtitle: 'datum' } },
})
