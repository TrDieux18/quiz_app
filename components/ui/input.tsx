import { cn } from "@/utils/cn";
import { Text, TextInput, View } from "react-native";

type InputProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  className?: string;
  loading?: boolean;
};

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  className,
  loading,
}: InputProps) {
  return (
    <View className="gap-2">
      {label && (
        <Text className="text-sm font-medium text-slate-700">{label}</Text>
      )}

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        className={cn(
          "border border-slate-200 rounded-2xl px-4 py-3 text-slate-950 font-medium bg-white",
          className,
        )}
        editable={!loading}
      />
    </View>
  );
}
