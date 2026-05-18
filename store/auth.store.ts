import { api } from "@/services/api";
import { User } from "@/types/user.type";
import { storage } from "@/utils/storage";
import { router } from "expo-router";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/auth/login", { username, password });
      const { token } = res.data;

      await storage.setToken(token);

      const data = await api.get("/auth/me");
      set({ user: data.data.user });

      router.replace("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Đăng nhập thất bại";
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await storage.removeToken();
    set({ user: null, error: null });
    router.replace("/login");
  },

  initAuth: async () => {
    const token = await storage.getToken();
    if (!token) return;

    try {
      const res = await api.get("/auth/me");
      set({ user: res.data.user });
    } catch (error) {
      await storage.removeToken();
    }
  },
}));
