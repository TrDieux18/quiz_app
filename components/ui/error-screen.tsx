import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorScreen({
  message = "Đã xảy ra lỗi khi kết nối tới máy chủ. Vui lòng kiểm tra mạng và thử lại.",
  onRetry,
}: Props) {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F2F2F7] items-center justify-center px-7">
      <View className="w-22 h-22 rounded-[28px] bg-[#FEEBE8] items-center justify-center mb-7">
        <Ionicons name="alert-circle-outline" size={44} color="#C0392B" />
      </View>

      <Text className="text-[22px] font-bold text-[#1C1C1E] text-center mb-3">
        Không tải được dữ liệu
      </Text>

      <Text className="text-[15px] text-[#8E8E93] text-center leading-6 mb-4">
        {message}
      </Text>

      <View className="flex-row items-center gap-1.5 bg-white rounded-full px-4 py-1.5 mb-9 border border-[#E5E5EA]">
        <Ionicons name="warning-outline" size={12} color="#C0392B" />
        <Text className="text-[12px] text-[#C0392B] font-medium">
          Network request failed
        </Text>
      </View>

      {onRetry && (
        <Pressable
          className="w-full flex-row items-center justify-center gap-2 bg-[#3A8EF6] rounded-[14px] py-4 mb-3"
          onPress={onRetry}
        >
          <Ionicons name="refresh-outline" size={18} color="#fff" />
          <Text className="text-[16px] font-semibold text-white">Thử lại</Text>
        </Pressable>
      )}

      <Pressable
        className="w-full flex-row items-center justify-center gap-2 bg-white rounded-[14px] py-4 border border-[#E5E5EA]"
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/")
        }
      >
        <Ionicons name="chevron-back-outline" size={18} color="#1C1C1E" />
        <Text className="text-[16px] font-semibold text-[#1C1C1E]">
          Quay lại
        </Text>
      </Pressable>
    </View>
  );
}
