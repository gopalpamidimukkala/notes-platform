import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().min(1, "Content is required"),
});

export const updateNoteSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
  isArchived: z.boolean().optional(),
  isFavorite: z.boolean().optional(),
});

export const notesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(10),
  q: z.string().optional(),
  favorite: z.enum(["true", "false"]).optional(),
  archived: z.enum(["true", "false"]).optional(),
  sort: z.enum(["createdAt", "updatedAt"]).default("updatedAt"),
  order: z.enum(["asc", "desc"]).default("desc"),
});
