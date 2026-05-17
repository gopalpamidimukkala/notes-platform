import { NotesService } from "./notes.service";
import { createNoteSchema, updateNoteSchema } from "./notes.schema";
import { successResponse } from "@/utils/api-response";
import { NotFoundError } from "@/utils/errors";

export class NotesController {
  static async createNote(c: any) {
    const user = c.get("user");
    const body = await c.req.json();
    const validated = createNoteSchema.parse(body);
    const note = await NotesService.createNote(user.userId, validated);

    return c.json(successResponse(note, "Note created successfully"), 201);
  }

  static async getNotes(c: any) {
    const user = c.get("user");
    const notes = await NotesService.getNotes(user.userId);

    return c.json(successResponse(notes));
  }

  static async getNoteById(c: any) {
    const user = c.get("user");
    const id = c.req.param("id");
    const note = await NotesService.getNoteById(user.userId, id);

    if (!note) {
      throw new NotFoundError("Note not found");
    }

    return c.json(successResponse(note));
  }

  static async updateNote(c: any) {
    const user = c.get("user");
    const id = c.req.param("id");
    const body = await c.req.json();
    const validated = updateNoteSchema.parse(body);
    const updated = await NotesService.updateNote(user.userId, id, validated);

    return c.json(successResponse(updated, "Note updated successfully"));
  }

  static async deleteNote(c: any) {
    const user = c.get("user");
    const id = c.req.param("id");
    await NotesService.deleteNote(user.userId, id);

    return c.body(null, 204);
  }

  static async toggleArchive(c: any) {
    const user = c.get("user");
    const id = c.req.param("id");
    const body = await c.req.json();

    const updated = await NotesService.toggleArchive(
      user.userId,
      id,
      body.isArchived,
    );

    return c.json(successResponse(updated));
  }
}
