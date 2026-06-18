import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
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

    contactEmail: z.string().email().optional(),

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
    email: z.string().email().optional(),
    phone: z.string().optional(),
    office: z.string().optional(),
    photo: z.string().optional(),
    order: z.number().optional(),
    featured: z.boolean().default(false),

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

export const collections = { news, departments, people };
