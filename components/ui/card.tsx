import { Colors } from "@/constants/theme";
import { cn } from "@/utils/cn";
import { View } from "react-native";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  const { surface, border } = Colors.light;

  return (
    <View
      style={{
        backgroundColor: surface,
        borderColor: border,
      }}
      className={cn("border rounded-2xl p-4 shadow-sm", className)}
    >
      {children}
    </View>
  );
}
