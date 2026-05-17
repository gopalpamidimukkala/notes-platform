import { serve } from "@hono/node-server";
import { app } from "./app";
import { env } from "./config/env";

serve({
  fetch: app.fetch,
  port: Number(env.PORT),
});

console.log(`🚀 API running on port ${env.PORT}`);