import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { registerSchema } from "./auth.schema";
import { AuthController } from "./auth.controller";

export const authRoutes = new OpenAPIHono();

// authRoutes.post("/register", AuthController.register);

// authRoutes.post("/login", AuthController.login);

const registerRoute = createRoute({
  method: "post",

  path: "/register",

  request: {
    body: {
      content: {
        "application/json": {
          schema: registerSchema,
        },
      },
    },
  },

  responses: {
    201: {
      description: "User registered successfully",

      content: {
        "application/json": {
          schema: registerSchema,
        },
      },
    },
  },
});

authRoutes.openapi(registerRoute, AuthController.register as any);

const loginRoute = createRoute({
  method: "post",

  path: "/login",

  request: {
    body: {
      content: {
        "application/json": {
          schema: registerSchema,
        },
      },
    },
  },

  responses: {
    200: {
      description: "User logged in successfully",
    },
  },
});

authRoutes.openapi(loginRoute, AuthController.login);
