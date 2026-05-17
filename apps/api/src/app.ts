import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { v1Routes } from "./routes/v1";
import { errorHandler } from "./middleware/error-handler";
import { swaggerUI } from "@hono/swagger-ui";
import { rateLimiter } from "hono-rate-limiter";
import { secureHeaders } from "hono/secure-headers";

export const app = new OpenAPIHono();

app.use("*", logger());
app.use("*", secureHeaders());
app.use(
  "*",
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(
  "*",
  rateLimiter({
    windowMs: 60 * 1000,
    limit: 100,

    keyGenerator: (c) => {
      return c.req.header("x-forwarded-for") ?? "anonymous";
    },
  }),
);

app.onError(errorHandler);

app.get("/about", (c) => {
  return c.json({
    name: "Gopal Pamidimukkala",

    email: "pamidimukkala65@gmail.com",

    "my features": {
      "Collaborative Note Sharing":
        "Implemented secure note sharing with permission-based access control for collaborative workflows.",

      "Favorites and Archives":
        "Added productivity-focused note organization using favorites and archive filtering.",

      "Search Functionality":
        "Implemented real-time search across note titles and content for faster navigation.",

      "Responsive Dashboard":
        "Built a fully responsive dashboard optimized for desktop and mobile devices.",

      "Command Palette":
        "Added keyboard-driven command palette for modern productivity-focused UX.",
    },
  });
});

app.route("/api/v1", v1Routes);

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Notes Platform API",
  });
});

app.doc("/openapi.json", {
  openapi: "3.0.0",

  info: {
    title: "Notes Platform API",

    version: "1.0.0",

    description: "Collaborative AI-powered notes platform API",
  },

  servers: [
    {
      url: "http://localhost:8080",

      description: "Local server",
    },
  ],

});

app.get(
  "/docs",
  swaggerUI({
    url: "/openapi.json",
  }),
);
