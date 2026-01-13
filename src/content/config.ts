import { z, defineCollection } from "astro:content";

const docsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional().default("Documentación"),
    description: z.string().optional(),
    order: z.number().optional().default(99),
    icon: z.string().optional().default("📄"),
    section: z.enum(["mobile", "web", "api"]).optional().default("api"),
  }),
});

export const collections = {
  docs: docsCollection,
};
