import { useUrlDetail } from "@/hooks/use-url";
import { stripHtml } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function UrlDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isLoading } = useUrlDetail(id);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-50">
      <View className="bg-white px-6 pt-12 pb-4 flex-row items-center border-b border-slate-100">
        <Pressable
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100"
        >
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </Pressable>
        <Text
          className="ml-4 text-xl font-bold text-slate-900 flex-1"
          numberOfLines={1}
        >
          {data?.name}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6 bg-[#ffffff] mb-4">
          <Text className="text-[15px] text-slate-700 font-medium leading-6 ">
            {stripHtml(data?.intro || "No description provided for this URL.")}
          </Text>
        </View>

        <View className="px-6">
          <Pressable
            onPress={() => Linking.openURL(data?.externalurl || "")}
            className="mb-4 rounded-xl bg-slate-900 px-4 py-3 flex-row items-center justify-center"
          >
            <Ionicons name="open-outline" size={20} color="#fff" />
            <Text className="text-white text-base font-medium ml-2">
              Mở URL
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
