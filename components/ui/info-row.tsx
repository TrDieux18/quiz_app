import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
};

export function InfoRow({
  icon,
  iconColor,
  iconBg,
  label,
  value,
}: InfoRowProps) {
  return (
    <View className="flex-row items-center py-3.5">
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Ionicons name={icon} size={18} color={iconColor} />
      </View>
      <Text className="ml-3 text-slate-500 text-sm flex-1 font-medium">
        {label}
      </Text>
      <Text className="text-slate-800 font-semibold text-sm">{value}</Text>
    </View>
  );
}
