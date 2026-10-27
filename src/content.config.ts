import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Services. One Markdown file per service in src/content/services.
 * The collection drives the Services page, the homepage overview and the
 * request-service form, so adding or removing a file updates all three.
 * Per-service pages can be added later from the same entries.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    /** One-sentence summary for overviews and meta descriptions. */
    summary: z.string(),
    /** 'core' services lead the site; 'additional' are listed more briefly. */
    tier: z.enum(['core', 'additional']),
    order: z.number(),
    /** Scope bullets. Draft wording pending owner review. */
    scope: z.array(z.string()).default([]),
    /** Optional illustration key, see src/components/diagrams. */
    diagram: z.enum(['rack', 'fiber', 'topology', 'cabling']).optional(),
    /** Verification of the service itself (is it still offered?). */
    status: z.enum(['confirmed', 'unverified']),
    source: z.string(),
    /** Optional qualifier shown with the title, e.g. "Commercial customers only". */
    qualifier: z.string().optional(),
  }),
});

export const collections = { services };
