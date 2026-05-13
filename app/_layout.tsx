import { api } from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import { storage } from "@/utils/storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await storage.getToken();

        if (token) {
          const res = await api.get("/auth/me");

          useAuthStore.setState({
            user: res.data.user,
          });
        }
      } catch (err) {
        await storage.removeToken();
        useAuthStore.setState({ user: null });
      } finally {
        setReady(true);
      }
    };

    init();
  }, []);

  if (!ready) {
    return <View className="flex-1 bg-white" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
