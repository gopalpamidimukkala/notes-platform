import { OpenAPIHono } from "@hono/zod-openapi";
import { authRoutes } from "@/modules/auth/auth.routes";
import { authMiddleware } from "@/middleware/auth.middleware";
import { notesRoutes } from "@/modules/notes/notes.routes";
import { sharesRoutes } from "@/modules/shares/shares.routes";

export const v1Routes = new OpenAPIHono();

v1Routes.route("/auth", authRoutes);

v1Routes.route("/notes", notesRoutes);

v1Routes.route("/notes", sharesRoutes);

v1Routes.get("/health", (c) => {
  return c.json({
    status: "ok",
  });
});

v1Routes.get("/me", authMiddleware, (c) => {
  const user = c.get("user");

  return c.json({
    success: true,
    data: user,
  });
});
