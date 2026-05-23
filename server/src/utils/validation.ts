import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/, "One uppercase required")
  .regex(/[a-z]/, "One lowercase required")
  .regex(/[0-9]/, "One number required")
  .regex(/[@$!%*?&]/, "One special character required");

export const registerSchema = z.object({
  email: z.email(),
  name: z.string().min(2).max(60),
  password: passwordSchema,
});

export const logInSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});

export const slugify = (name: string): string =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);

export const createWorkspaceSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(60, "Name must be at most 60 characters")
      .trim(),
    slug: z
      .string()
      .min(2, "Slug must be at least 2 characters")
      .max(48, "Slug must be at most 48 characters")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug can only contain lowercase letters, numbers, and hyphens"
      )
      .optional(),
  }),
});

export const updateWorkspaceSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(60).trim().optional(),
    slug: z
      .string()
      .min(2)
      .max(48)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
  }),
  params: z.object({
    id: z.string().min(1, "Invalid workspace ID"),
  }),
});

export const workspaceParamsSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Invalid workspace ID"),
  }),
});
