import { readFile, readdir } from 'node:fs/promises';
import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    description: z.string(),
    descriptionEn: z.string().optional(),
    date: z.coerce.date(),
    category: z.string(),
    categoryEn: z.string().optional(),
    tags: z.array(z.string()).default([]),
    tagsEn: z.array(z.string()).optional(),
    scopes: z.array(z.enum(['institute', 'ncutam'])).default(['institute']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageAltEn: z.string().optional(),
    year: z.number(),
    featured: z.boolean().default(false),
    externalUrl: z.string().optional()
  })
});

const departments = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/departments' }),
  schema: z.object({
    number: z.number(),
    title: z.string(),
    titleEn: z.string().optional(),
    shortTitle: z.string().optional(),
    shortTitleEn: z.string().optional(),
    group: z.string(),
    groupEn: z.string().optional(),
    head: z.string().optional(),
    headEn: z.string().optional(),
    summary: z.string(),
    summaryEn: z.string().optional(),
    sectionsEn: z.array(
      z.object({
        title: z.string(),
        paragraphs: z.array(z.string()).default([]),
        items: z.array(z.string()).default([]),
        figures: z.array(
          z.object({
            src: z.string(),
            alt: z.string(),
            caption: z.string()
          })
        ).default([])
      })
    ).default([]),
    order: z.number(),

    contactEmail: z.email().optional(),

    staff: z.array(
      z.object({
        name: z.string(),
        nameEn: z.string().optional(),
        url: z.string().optional(),
        position: z.string().optional(),
        positionEn: z.string().optional()
      })
    ).default([])
  })
});

const people = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/people' }),
  schema: z.object({
    name: z.string(),
    nameEn: z.string().optional(),
    position: z.string().optional(),
    positionEn: z.string().optional(),
    department: z.string().optional(),
    departmentEn: z.string().optional(),
    departmentUrl: z.string().optional(),
    degree: z.string().optional(),
    degreeEn: z.string().optional(),
    academicTitle: z.string().optional(),
    academicTitleEn: z.string().optional(),
    email: z.email().optional(),
    phone: z.string().optional(),
    office: z.string().optional(),
    photo: z.string().optional(),
    order: z.number().optional(),
    featured: z.boolean().default(false),
    historicalPageUrl: z.string().optional(),
    historicalPageLabel: z.string().optional(),
    historicalPageLabelEn: z.string().optional(),

    profiles: z.array(
      z.object({
        label: z.string(),
        value: z.string().optional(),
        url: z.string().optional(),
        kind: z.enum(['scopus', 'wos', 'scholar', 'orcid', 'researchgate', 'other']).default('other')
      })
    ).default([]),

    researchAreas: z.array(z.string()).default([]),
    researchAreasEn: z.array(z.string()).default([]),
    professionalActivity: z.string().optional(),
    professionalActivityEn: z.string().optional(),

    publications: z.array(
      z.object({
        title: z.string(),
        titleEn: z.string().optional(),
        type: z.enum(['ordered', 'unordered']).default('ordered'),
        items: z.array(z.string()),
        itemsEn: z.array(z.string()).optional()
      })
    ).default([])
  })
});

const ncutamInstitutions = defineCollection({
  loader: file('./src/data/ncutam/institutions.yaml'),
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    city: z.string(),
    cityEn: z.string(),
    url: z.string().url().optional()
  })
});

const ncutamMembers = defineCollection({
  loader: async () => {
    const directory = new URL('./data/ncutam/members/', import.meta.url);
    const files = (await readdir(directory)).filter((name) => name.endsWith('.json')).sort();
    const batches = await Promise.all(
      files.map(async (name) => JSON.parse(await readFile(new URL(name, directory), 'utf8')))
    );
    return batches.flat();
  },
  schema: z.object({
    name: z.string(),
    nameEn: z.string(),
    sortName: z.string().optional(),
    status: z.enum(['active', 'former']),
    joinedYear: z.number().int().min(1992).optional(),
    endedYear: z.number().int().min(1992).optional(),
    institution: reference('ncutamInstitutions').optional(),
    additionalInstitutions: z.array(reference('ncutamInstitutions')).default([]),
    affiliationSources: z.array(
      z.object({
        kind: z.enum(['official', 'publication']),
        label: z.string(),
        url: z.string().url()
      })
    ).default([]),
    city: z.string().optional(),
    cityEn: z.string().optional(),
    inmechPersonId: z.string().optional(),
    profiles: z.array(
      z.object({
        kind: z.enum(['esu', 'orcid', 'scholar', 'other']).default('other'),
        label: z.string(),
        url: z.string().url()
      })
    ).default([])
  })
});

const ncutamDocuments = defineCollection({
  loader: file('./src/data/ncutam/documents.yaml'),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    kind: z.enum([
      'foundation',
      'regulation',
      'resolution',
      'governance',
      'annual-report',
      'meeting-material',
      'other'
    ]),
    date: z.coerce.date().optional(),
    year: z.number().int().optional(),
    language: z.enum(['uk', 'en', 'bilingual']),
    path: z.string(),
    issuedBy: z.string().optional(),
    issuedByEn: z.string().optional(),
    status: z.enum(['current', 'historical', 'superseded']).default('historical'),
    note: z.string().optional(),
    noteEn: z.string().optional()
  })
});

const ncutamGovernance = defineCollection({
  loader: file('./src/data/ncutam/governance.yaml'),
  schema: z.object({
    member: reference('ncutamMembers'),
    role: z.enum(['chair', 'deputy-chair', 'scientific-secretary', 'presidium-member']),
    order: z.number().int(),
    responsibilities: z.array(z.string()).default([]),
    responsibilitiesEn: z.array(z.string()).default([]),
    effectiveFrom: z.coerce.date(),
    effectiveTo: z.coerce.date().optional(),
    sourceDocument: reference('ncutamDocuments').optional()
  })
});

const ncutamMedia = defineCollection({
  loader: file('./src/data/ncutam/media.yaml'),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    source: z.string(),
    sourceEn: z.string().optional(),
    date: z.coerce.date(),
    url: z.string().url(),
    description: z.string(),
    descriptionEn: z.string(),
    relatedActivityId: z.string().optional()
  })
});

const ncutamPages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/ncutam-pages' }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    description: z.string(),
    descriptionEn: z.string(),
    updated: z.coerce.date().optional(),
    sourceDocuments: z.array(reference('ncutamDocuments')).default([])
  })
});

const ncutamActivities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ncutam-activity' }),
  schema: z.object({
    type: z.enum(['meeting', 'conference', 'initiative', 'international']),
    title: z.string(),
    titleEn: z.string(),
    summary: z.string(),
    summaryEn: z.string(),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    ongoing: z.boolean().default(false),
    location: z.string().optional(),
    locationEn: z.string().optional(),
    committeeRole: z.string().optional(),
    committeeRoleEn: z.string().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageAltEn: z.string().optional(),
    gallery: z.array(
      z.object({
        src: z.string(),
        alt: z.string(),
        altEn: z.string().optional(),
        caption: z.string().optional(),
        captionEn: z.string().optional()
      })
    ).default([]),
    video: z.object({
      youtubeId: z.string(),
      title: z.string(),
      titleEn: z.string().optional()
    }).optional(),
    documents: z.array(reference('ncutamDocuments')).default([]),
    relatedNews: z.array(reference('news')).default([]),
    externalLinks: z.array(
      z.object({
        label: z.string(),
        labelEn: z.string().optional(),
        url: z.string().url()
      })
    ).default([])
  })
});

export const collections = {
  news,
  departments,
  people,
  ncutamPages,
  ncutamActivities,
  ncutamInstitutions,
  ncutamMembers,
  ncutamGovernance,
  ncutamDocuments,
  ncutamMedia
};
