import { Colors } from "@/constants/theme";
import { cn } from "@/utils/cn";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  variant?: "default" | "outline" | "ghost";
  className?: string;
};

export function Button({
  title,
  onPress,
  loading,
  variant = "default",
  className,
}: ButtonProps) {
  // Theme colors - use light theme explicitly
  const themeColors = Colors.light;
  const { primary, text, border } = themeColors;

  const borderColor = variant === "outline" ? border : undefined;
  const loaderColor = variant === "default" ? "#fff" : primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        borderColor,
      }}
      className={cn(
        "px-4 py-3 rounded-2xl flex-row items-center justify-center bg-slate-800",
        {
          border: variant === "outline",
        },
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={loaderColor} />
      ) : (
        <Text className="font-semibold text-white">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
