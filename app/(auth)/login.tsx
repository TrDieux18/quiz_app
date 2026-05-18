import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function LoginScreen() {
  const { login, loading } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-6 py-10"
        keyboardShouldPersistTaps="handled"
      >
        <View className="mb-6">
          <Text className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            QuizApp
          </Text>
          <Text className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            Welcome back
          </Text>
          <Text className="mt-3 max-w-[320px] text-base leading-6 text-slate-600">
            Sign in to continue learning.
          </Text>
        </View>

        <View className="rounded-[32px] border border-slate-200 bg-white p-6 gap-4 ">
          <View className="gap-1.5">
            <Text className="text-lg font-bold text-slate-950">Sign in</Text>
            <Text className="text-sm text-slate-500">
              Use your username and password.
            </Text>
          </View>

          <Input
            label="Username"
            placeholder="John Doe"
            value={username}
            onChangeText={setUsername}
            loading={loading}
            className="bg-slate-50"
          />

          <Input
            label="Password"
            secureTextEntry={true}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            loading={loading}
            className="bg-slate-50"
          />

          <Button
            title="Login"
            loading={loading}
            onPress={() => login(username, password)}
            className="mt-2"
          />

          <Text className="text-center text-sm leading-5 text-slate-500">
            If you need access, contact the administrator.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
