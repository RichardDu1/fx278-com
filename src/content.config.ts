import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const signalsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/signals" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    platform: z.string(), // "MQL5", "ZuluTrade", etc.
    monthlyReturn: z.string(),
    maxDrawdown: z.string(),
    subscribers: z.number(),
    riskLevel: z.string(), // "Low", "Medium", "High"
    winRate: z.string(),
    publishedAt: z.date()
  }),
});

export const collections = {
  'signals': signalsCollection,
};
