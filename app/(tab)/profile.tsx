import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const avatarUri = user?.picture?.startsWith("http") ? user.picture : null;
  const initials = [user?.firstname, user?.lastname]
    .filter(Boolean)
    .map((part) => part?.trim().charAt(0))
    .join("")
    .toUpperCase();

  return (
    <View className="flex-1 bg-slate-50 px-6 pt-16">
      <View className="items-center">
        <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-[28px] bg-slate-100">
          {avatarUri ? (
            <Image
              source={{ uri: avatarUri }}
              style={{ height: "100%", width: "100%" }}
              contentFit="cover"
            />
          ) : (
            <Text className="text-2xl font-bold text-slate-700">
              {initials || "U"}
            </Text>
          )}
        </View>

        <Text className="mt-4 text-2xl font-bold text-slate-950">
          {user?.firstname} {user?.lastname}
        </Text>
        <Text className="mt-1 text-slate-500">{user?.email}</Text>
      </View>

      <View className="mt-8 gap-3">
        <View className="rounded-2xl bg-slate-50 px-4 py-3">
          <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Username
          </Text>
          <Text className="mt-1 text-base font-medium text-slate-950">
            {user?.username || "-"}
          </Text>
        </View>

        <View className="rounded-2xl bg-slate-50 px-4 py-3">
          <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Location
          </Text>
          <Text className="mt-1 text-base font-medium text-slate-950">
            {user?.city || "Unknown"}, {user?.country || "Unknown"}
          </Text>
        </View>
      </View>

      <View className="mt-6 gap-3">
        <Button
          title="Logout"
          onPress={logout}
          variant="outline"
          className="border-slate-200 hover:bg-red-400 text-white hover:text-white transition-colors"
        />
      </View>
    </View>
  );
}
