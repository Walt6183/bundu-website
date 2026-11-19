import { angebotSchema } from './angebot'
import { impulsSchema } from './impuls'
import { themaSchema } from './thema'
import { faqSchema } from './faq'
import { referenzSchema } from './referenz'
import { downloadSchema } from './download'
import { preisangebotSchema } from './preisangebot'
import { terminSchema } from './termin'

// Alte Typen bleiben im Studio und in den Daten, werden aber von der Seite nicht abgefragt (Phase 3).
export const schemaTypes = [angebotSchema, impulsSchema, themaSchema, faqSchema, referenzSchema, downloadSchema, preisangebotSchema, terminSchema]
