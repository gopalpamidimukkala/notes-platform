import { z } from "@hono/zod-openapi";

export const registerSchema = z.object({
  email: z.email().openapi({
    example: "john@example.com",
  }),

  password: z.string().min(8).openapi({
    example: "password123",
  }),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
