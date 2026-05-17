import bcrypt from "bcryptjs";
import { prisma } from "@/db/prisma";
import { generateToken } from "@/utils/jwt";
import type { loginSchema, registerSchema } from "./auth.schema";
import type { z } from "zod";
import { BadRequestError, UnauthorizedError } from "@/utils/errors";

type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export class AuthService {
  static async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new BadRequestError("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash: hashedPassword,
      },
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  static async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const accessToken = generateToken({
      userId: user.id,
    });

    return {
      accessToken,
    };
  }
}
