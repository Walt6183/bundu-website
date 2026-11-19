import { defineType, defineField } from 'sanity'

// Preistabelle eines Angebots (Phase 3, Entscheid E-3). Ein Dokument je Tabelle, Schlüssel fest.
// Der Betrag ist eine ganze Zahl, die Seite setzt daraus «CHF 1'150». Spaltenköpfe und alle Texte bleiben in den Dateien.
export const preisangebotSchema = defineType({
  name: 'preisangebot',
  title: 'Preise eines Angebots',
  type: 'document',
  fields: [
    defineField({
      name: 'schluessel',
      title: 'Kennung der Tabelle (fest)',
      type: 'string',
      readOnly: true,
      validation: (r) => r.required(),
    }),
    defineField({ name: 'titel', title: 'Titel (nur im Studio sichtbar)', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'bereich',
      title: 'Bereich',
      type: 'string',
      options: { list: [{ title: 'Eltern', value: 'eltern' }, { title: 'Fachpersonen', value: 'fachpersonen' }, { title: 'Institutionen', value: 'institutionen' }], layout: 'radio' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'zeilen',
      title: 'Preiszeilen',
      type: 'array',
      validation: (r) => r.required().min(1),
      of: [
        {
          type: 'object',
          name: 'zeile',
          fields: [
            defineField({ name: 'leistung', title: 'Leistung', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'umfang', title: 'Dauer oder Umfang', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'preisart',
              title: 'Preisart',
              type: 'string',
              initialValue: 'betrag',
              options: { list: [{ title: 'Betrag', value: 'betrag' }, { title: 'Kostenlos', value: 'kostenlos' }, { title: 'Auf Anfrage', value: 'anfrage' }], layout: 'radio' },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'betrag',
              title: 'Betrag in CHF (ganze Zahl)',
              type: 'number',
              hidden: ({ parent }) => parent?.preisart !== 'betrag',
              validation: (r) =>
                r.custom((v, ctx) => {
                  const art = (ctx.parent as { preisart?: string } | undefined)?.preisart
                  if (art !== 'betrag') return true
                  return Number.isInteger(v) && (v as number) > 0 ? true : 'Ganze Zahl grösser 0, ohne CHF und ohne Hochkomma'
                }),
            }),
          ],
          preview: { select: { title: 'leistung', subtitle: 'umfang' } },
        },
      ],
    }),
  ],
  preview: { select: { title: 'titel', subtitle: 'bereich' } },
})
