import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { authMiddleware } from "@/middleware/auth.middleware";
import { NotesController } from "./notes.controller";
import { createNoteSchema, updateNoteSchema } from "./notes.schema";

export const notesRoutes = new OpenAPIHono();

notesRoutes.use("*", authMiddleware);

/* ---------------- GET ALL NOTES ---------------- */

const getNotesRoute = createRoute({
  method: "get",

  path: "/",

  responses: {
    200: {
      description: "Get all notes",
    },
  },
});

notesRoutes.openapi(getNotesRoute, NotesController.getNotes);

/* ---------------- CREATE NOTE ---------------- */

const createNoteRoute = createRoute({
  method: "post",

  path: "/",

  request: {
    body: {
      content: {
        "application/json": {
          schema: createNoteSchema,
        },
      },
    },
  },

  responses: {
    201: {
      description: "Note created successfully",
    },
  },
});

notesRoutes.openapi(createNoteRoute, NotesController.createNote);

/* ---------------- GET NOTE BY ID ---------------- */

const getNoteByIdRoute = createRoute({
  method: "get",

  path: "/{id}",

  request: {
    params: z.object({
      id: z.string(),
    }),
  },

  responses: {
    200: {
      description: "Get note by ID",
    },
  },
});

notesRoutes.openapi(getNoteByIdRoute, NotesController.getNoteById);

/* ---------------- UPDATE NOTE ---------------- */

const updateNoteRoute = createRoute({
  method: "put",

  path: "/{id}",

  request: {
    params: z.object({
      id: z.string(),
    }),

    body: {
      content: {
        "application/json": {
          schema: updateNoteSchema,
        },
      },
    },
  },

  responses: {
    200: {
      description: "Note updated successfully",
    },
  },
});

notesRoutes.openapi(updateNoteRoute, NotesController.updateNote);

/* ---------------- DELETE NOTE ---------------- */

const deleteNoteRoute = createRoute({
  method: "delete",

  path: "/{id}",

  request: {
    params: z.object({
      id: z.string(),
    }),
  },

  responses: {
    204: {
      description: "Note deleted successfully",
    },
  },
});

notesRoutes.openapi(deleteNoteRoute, NotesController.deleteNote);

/* ---------------- ARCHIVE NOTE ---------------- */

const archiveNoteRoute = createRoute({
  method: "patch",

  path: "/{id}/archive",

  request: {
    params: z.object({
      id: z.string(),
    }),
  },

  responses: {
    200: {
      description: "Archive note",
    },
  },
});

notesRoutes.openapi(archiveNoteRoute, NotesController.toggleArchive);
