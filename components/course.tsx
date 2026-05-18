import { Colors } from "@/constants/theme";
import { Course } from "@/types/course.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function CourseCard({ course }: { course: Course }) {
  const themeColors = Colors.light;
  const { surface, text, textSecondary, textTertiary, border, icon } =
    themeColors;

  const summary = course.summary?.replace(/<[^>]*>?/gm, "") || "No description";

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/course/[id]",
          params: { id: course.id },
        })
      }
      style={{
        backgroundColor: surface,
        borderColor: border,
      }}
      className="mb-4 overflow-hidden rounded-[24px] border active:opacity-90"
    >
      <View className="gap-3 p-5">
        <View className="flex-row items-start justify-between gap-3">
          <Text
            numberOfLines={2}
            style={{ color: text }}
            className="text-xl font-bold leading-7"
          >
            {course.fullname}
          </Text>
          <Ionicons name="chevron-forward" size={18} color={icon} />
        </View>

        <Text style={{ color: textSecondary }} className="text-sm font-medium">
          {course.shortname}
        </Text>

        <Text
          numberOfLines={3}
          style={{ color: textTertiary }}
          className="text-sm leading-6"
        >
          {summary}
        </Text>

        <Text
          style={{ color: textTertiary }}
          className="pt-1 text-[11px] font-semibold uppercase tracking-[0.22em]"
        >
          Course detail
        </Text>
      </View>
    </Pressable>
  );
}
