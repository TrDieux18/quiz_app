import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function FavoriteScreen() {
  return (
    <View className="flex-1 bg-slate-50 px-6 pt-16">
      <View className="flex-1 items-center justify-center  p-6">
        <View className="h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
          <Ionicons name="heart" size={28} color="#0f172a" />
        </View>

        <Text className="mt-5 text-2xl font-bold text-slate-950">
          Saved courses
        </Text>
        <Text className="mt-2 text-center text-base leading-6 text-slate-500">
          Keep the courses you want to review later in one clean place.
        </Text>
      </View>
    </View>
  );
}
