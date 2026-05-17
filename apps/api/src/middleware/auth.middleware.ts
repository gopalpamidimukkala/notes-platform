import { createMiddleware } from "hono/factory";
import { verifyToken } from "@/utils/jwt";

export const authMiddleware = createMiddleware(
  async (c, next) => {
    const authHeader =
      c.req.header("Authorization");

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return c.json(
        {
          success: false,
          message: "Unauthorized",
        },
        401
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const payload = verifyToken(token);

      c.set("user", {
        userId: payload.userId,
      });

      await next();
    } catch {
      return c.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        401
      );
    }
  }
);