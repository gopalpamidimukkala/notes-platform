import { api } from "@/lib/api";

import type { LoginInput, RegisterInput } from "./auth.schema";

export const authService = {
  async login(data: LoginInput) {
    const response = await api.post("/auth/login", data);

    return response.data;
  },

  async register(data: RegisterInput) {
    const response = await api.post("/auth/register", data);

    return response.data;
  },
};
