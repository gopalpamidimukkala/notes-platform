import { SharesService } from "./shares.service";
import { shareNoteSchema } from "./shares.schema";

export class SharesController {
  static async shareNote(c: any) {
    const user = c.get("user");
    const noteId = c.req.param("id");
    const body = await c.req.json();
    const validated = shareNoteSchema.parse(body);

    await SharesService.shareNote(
      user.userId,
      noteId,
      validated.shareWithEmail,
      validated.permission,
    );

    return c.json({
      success: true,
      message: "Note shared successfully",
    });
  }
}
