import { storage } from "@/utils/storage";
import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3002/api",
  baseURL: "https://plow-spur-raft.ngrok-free.dev/api",
  timeout: 30000,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

// attach token
api.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
