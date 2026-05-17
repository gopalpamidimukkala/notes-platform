import { prisma } from "@/db/prisma";
import type { z } from "zod";
import type { createNoteSchema, updateNoteSchema } from "./notes.schema";

type CreateNoteInput = z.infer<typeof createNoteSchema>;

type UpdateNoteInput = z.infer<typeof updateNoteSchema>;

export class NotesService {
  static async createNote(userId: string, data: CreateNoteInput) {
    return prisma.note.create({
      data: {
        ...data,
        ownerId: userId,
      },
    });
  }

  static async getNotes(userId: string) {
    return prisma.note.findMany({
      where: {
        OR: [
          {
            ownerId: userId,
          },

          {
            shares: {
              some: {
                userId,
              },
            },
          },
        ],
      },

      include: {
        shares: true,
      },

      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  static async getNoteById(userId: string, noteId: string) {
    return prisma.note.findFirst({
      where: {
        id: noteId,

        OR: [
          {
            ownerId: userId,
          },

          {
            shares: {
              some: {
                userId,
              },
            },
          },
        ],
      },

      include: {
        shares: true,
      },
    });
  }

  static async updateNote(
    userId: string,
    noteId: string,
    data: UpdateNoteInput,
  ) {
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,

        OR: [
          {
            ownerId: userId,
          },

          {
            shares: {
              some: {
                userId,

                permission: "EDIT",
              },
            },
          },
        ],
      },
    });

    if (!note) {
      throw new Error("Unauthorized");
    }

    return prisma.note.update({
      where: {
        id: noteId,
      },

      data,
    });
  }

  static async deleteNote(userId: string, noteId: string) {
    return prisma.note.delete({
      where: {
        id_ownerId: {
          id: noteId,
          ownerId: userId,
        },
      },
    });
  }

  static async toggleArchive(
    userId: string,
    noteId: string,
    isArchived: boolean,
  ) {
    return prisma.note.update({
      where: {
        id_ownerId: {
          id: noteId,
          ownerId: userId,
        },
      },

      data: {
        isArchived,
      },
    });
  }
}
