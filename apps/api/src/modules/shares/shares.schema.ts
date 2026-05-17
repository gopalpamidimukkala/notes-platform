import { z } from "zod";

export const shareNoteSchema = z.object({
  shareWithEmail: z.email(),
  permission: z.enum(["VIEW", "EDIT"]).default("VIEW"),
});