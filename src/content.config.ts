import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const dinners = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dinners' }),
  schema: z.object({
    highlights: z.array(z.string()).optional(),
    dishes: z.array(z.string()).optional(),
    tips: z.array(z.string()).optional(),
  }),
});

export const collections = { dinners };
