import { api } from "@/services/api";
import { storage } from "@/utils/storage";
import { router } from "expo-router";
import { create } from "zustand";

type User = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  city: string;
  country: string;
  phone1: string;
  phone2: string;
  description: string;
  descriptionformat: string;
  idnumber: string;
  calendartype: string;
  auth: string;
  confirmed: number;
  timecreated: number;
  timemodified: number;
  imagealt: string;
  picture: string;
};

type AuthState = {
  user: User | null;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  login: async (username, password) => {
    set({ loading: true });

    try {
      const res = await api.post("/auth/login", {
        username,
        password,
      });

      const { token } = res.data;

      await storage.setToken(token);

      const data = await api.get("/auth/me");

      set({ user: data.data.user });

      router.replace("/");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    await storage.removeToken();
    set({ user: null });
    router.replace("/login");
  },
}));
