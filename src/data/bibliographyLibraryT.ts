import type { BibliographyEntry } from './bibliography';

// Technical alphabetic batch for entries extracted from the old Бібліотека.html file.
// Public display remains unified; this file is only an internal data chunk.
// Source section: “Окремі наукові монографії, довідники та словники з механіки”.
// Letter Т.
export const bibliographyLibraryT = [
  {
    id: 'library-t-392-topekha-1952-osnovnye-vidy-iznosa-metallov',
    authors: 'Топеха П.К.',
    title: 'Основные виды износа металлов',
    year: 1952,
    publisher: 'Киев-Москва: Машгиз',
    pages: '119 с.',
    language: 'ru',
    type: 'monograph',
    tags: ['materials-mechanics', 'experimental-mechanics', 'monograph']
  }
] as const satisfies readonly BibliographyEntry[];
