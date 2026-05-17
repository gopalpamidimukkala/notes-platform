import { prisma } from "@/db/prisma";
import { NotFoundError } from "@/utils/errors";

export class SharesService {
  static async shareNote(
    ownerId: string,
    noteId: string,
    shareWithEmail: string,
    permission: "VIEW" | "EDIT",
  ) {
    // verify note ownership
    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        ownerId,
      },
    });

    if (!note) {
      throw new NotFoundError("Note not found");
    }

    // find target user
    const targetUser = await prisma.user.findUnique({
      where: {
        email: shareWithEmail,
      },
    });

    if (!targetUser) {
      throw new Error("User not found");
    }

    // prevent self sharing
    if (targetUser.id === ownerId) {
      throw new Error("You cannot share a note with yourself");
    }

    // create/update share
    return prisma.noteShare.upsert({
      where: {
        noteId_userId: {
          noteId,
          userId: targetUser.id,
        },
      },

      update: {
        permission,
      },

      create: {
        noteId,
        userId: targetUser.id,
        permission,
      },
    });
  }
}
