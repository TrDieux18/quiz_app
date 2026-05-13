import { useAuthStore } from "@/store/auth.store";
import { Redirect } from "expo-router";

export default function Index() {
  const { user } = useAuthStore();

  if (user) {
    return <Redirect href="/(tab)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
