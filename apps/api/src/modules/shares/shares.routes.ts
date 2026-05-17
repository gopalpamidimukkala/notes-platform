import { OpenAPIHono } from "@hono/zod-openapi";
import { authMiddleware } from "@/middleware/auth.middleware";
import { SharesController } from "./shares.controller";
import { createRoute } from "@hono/zod-openapi";

export const sharesRoutes = new OpenAPIHono();

sharesRoutes.use("*", authMiddleware);

/* ---------------- SHARE NOTE ---------------- */

const shareNoteRoute = createRoute({
  method: "post",

  path: "/{id}/share",

  responses: {
    200: {
      description: "Note shared successfully",
    },
  },
});

sharesRoutes.openapi(shareNoteRoute, SharesController.shareNote);
