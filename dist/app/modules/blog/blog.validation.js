"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidationSchema = void 0;
const zod_1 = require("zod");
const blogSchemaZod = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Blog title is required",
    })
        .min(4, "Blog title cannot be empty"),
    content: zod_1.z
        .string({
        required_error: "Blog content is required",
    })
        .min(4, "Blog content cannot be empty"),
    author: zod_1.z
        .string({
        required_error: "Author ID is required",
    })
        .optional(),
    isPublished: zod_1.z.boolean().optional().default(true),
});
const blogSchemaUpdateZod = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Blog title is required",
    })
        .min(4, "Blog title cannot be empty")
        .optional(),
    content: zod_1.z
        .string({
        required_error: "Blog content is required",
    })
        .min(4, "Blog content cannot be empty")
        .optional(),
    isPublished: zod_1.z.boolean().optional().default(true).optional(),
});
exports.blogValidationSchema = {
    blogSchemaZod,
    blogSchemaUpdateZod,
};
