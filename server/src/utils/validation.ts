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