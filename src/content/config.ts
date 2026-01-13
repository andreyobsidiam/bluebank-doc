import { z, defineCollection } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional().default(99),
    icon: z.string().optional().default("📄"),
  }),
});

export const collections = {
  docs: docsCollection,
};
