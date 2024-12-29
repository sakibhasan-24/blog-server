import { z } from "zod";

const blogSchemaZod = z.object({
  title: z
    .string({
      required_error: "Blog title is required",
    })
    .min(4, "Blog title cannot be empty"),
  content: z
    .string({
      required_error: "Blog content is required",
    })
    .min(4, "Blog content cannot be empty"),
  author: z.string({
    required_error: "Author ID is required",
  }),
  isPublished: z.boolean().optional().default(true),
});
const blogSchemaUpdateZod = z.object({
  title: z
    .string({
      required_error: "Blog title is required",
    })
    .min(4, "Blog title cannot be empty"),
  content: z
    .string({
      required_error: "Blog content is required",
    })
    .min(4, "Blog content cannot be empty"),
  isPublished: z.boolean().optional().default(true),
});

export const blogValidationSchema = {
  blogSchemaZod,
  blogSchemaUpdateZod,
};
