import { AuthService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";
import { successResponse } from "@/utils/api-response";

export class AuthController {
  static async register(c: any) {
    const body = await c.req.json();

    const validatedData = registerSchema.parse(body);

    const user = await AuthService.register(validatedData);

    return c.json(successResponse(user, "User registered successfully"), 201);
  }

  static async login(c: any) {
    const body = await c.req.json();

    const validatedData = loginSchema.parse(body);

    const result = await AuthService.login(validatedData);

    return c.json(successResponse(result, "Login successful"), 200);
  }
}
