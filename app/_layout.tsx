import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import "../global.css";
import { useAuthStore } from "@/store/auth.store";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  const { initAuth } = useAuthStore();

  useEffect(() => {
    initAuth().finally(() => setReady(true));
  }, []);

  if (!ready) return <View className="flex-1 bg-white" />;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
