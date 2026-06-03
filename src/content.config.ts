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
    shortTitle: z.string().optional(),
    group: z.string(),
    head: z.string().optional(),
    summary: z.string(),
    order: z.number(),

    contactEmail: z.string().email().optional(),

    staff: z.array(
      z.object({
        name: z.string(),
        url: z.string().optional(),
        position: z.string().optional()
      })
    ).default([])
  })
});

export const collections = { news, departments };
