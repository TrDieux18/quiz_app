import { Colors } from "@/constants/theme";
import { useCourseDetailQuery } from "@/hooks/use-course";
import { stripHtml } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const getModuleIcon = (modname: string) => {
  const iconMap: Record<
    string,
    { icon: keyof typeof Ionicons.glyphMap; colorClass: string }
  > = {
    quiz: { icon: "document-text", colorClass: "primary" },
    assign: { icon: "clipboard", colorClass: "warning" },
    forum: { icon: "chatbubbles", colorClass: "success" },
    resource: { icon: "document-attach", colorClass: "secondary" },
    url: { icon: "link", colorClass: "primary" },
    page: { icon: "reader", colorClass: "secondary" },
    folder: { icon: "folder", colorClass: "warning" },
    label: { icon: "text", colorClass: "icon" },
    book: { icon: "book", colorClass: "error" },
    chat: { icon: "chatbubble-ellipses", colorClass: "success" },
    choice: { icon: "radio-button-on", colorClass: "secondary" },
    feedback: { icon: "star", colorClass: "warning" },
    glossary: { icon: "library", colorClass: "primary" },
    lesson: { icon: "school", colorClass: "error" },
    wiki: { icon: "globe", colorClass: "primary" },
    workshop: { icon: "construct", colorClass: "warning" },
  };
  return iconMap[modname] ?? { icon: "cube" as const, colorClass: "icon" };
};

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: currentCourse, isLoading: loading } = useCourseDetailQuery(
    id as string | undefined,
  );

  const themeColors = Colors.light;
  const {
    background,
    surface,
    text,
    textSecondary,
    textTertiary,
    border,
    surfaceVariant,
    primary,
    secondary,
    success,
    warning,
    error,
    icon,
  } = themeColors;

  if (loading || !currentCourse) {
    return;
  }

  const getColorByClass = (colorClass: string): string => {
    const colorMap: Record<string, string> = {
      primary,
      secondary,
      success,
      warning,
      error,
      icon,
    };
    return colorMap[colorClass] || icon;
  };

  return (
    <View style={{ backgroundColor: background }} className="flex-1">
      <View
        style={{
          backgroundColor: surface,
          borderBottomColor: border,
        }}
        className="px-6 pt-12 pb-4 flex-row items-center border-b"
      >
        <Pressable
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          style={{ backgroundColor: surfaceVariant }}
          className="w-10 h-10 items-center justify-center rounded-full"
        >
          <Ionicons name="chevron-back" size={24} color={text} />
        </Pressable>
        <Text
          style={{ color: text }}
          className="ml-4 text-xl font-bold flex-1"
          numberOfLines={1}
        >
          {currentCourse.fullname}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* course info card */}
        <View style={{ backgroundColor: surface }} className="p-6 mb-4">
          <Text
            style={{ color: textTertiary }}
            className="text-sm font-semibold mb-4"
          >
            {currentCourse.shortname}
          </Text>

          <View style={{ backgroundColor: border }} className="h-[1px] mb-4" />

          <Text
            style={{ color: textSecondary }}
            className="leading-6 font-medium text-[15px]"
          >
            {stripHtml(
              currentCourse.summary ||
                "No description provided for this course.",
            )}
          </Text>
        </View>

        {/* teachers */}
        {currentCourse.teachers.length > 0 ? (
          <View className="px-6 mb-4">
            <Text style={{ color: text }} className="text-lg font-bold mb-3">
              {"Instructors"}
            </Text>
            <View
              style={{
                backgroundColor: surface,
                borderColor: border,
              }}
              className="rounded-2xl border overflow-hidden "
            >
              {currentCourse.teachers.map((teacher, index) => {
                const initials =
                  (teacher.firstname?.[0] ?? "") +
                  (teacher.lastname?.[0] ?? "");
                const isEditingTeacher = teacher.role === "editingteacher";
                const badgeBg = isEditingTeacher ? primary : success;
                const badgeColor = isEditingTeacher
                  ? "rgba(79, 70, 229, 0.15)"
                  : "rgba(22, 163, 74, 0.15)";

                return (
                  <View
                    key={teacher.id}
                    style={{
                      borderBottomColor: border,
                      borderBottomWidth:
                        index < currentCourse.teachers.length - 1 ? 1 : 0,
                    }}
                    className="flex-row items-center p-4"
                  >
                    {/* avatar */}
                    <View
                      style={{
                        backgroundColor: badgeColor,
                      }}
                      className="w-11 h-11 rounded-full items-center justify-center"
                    >
                      <Text
                        style={{ color: badgeBg }}
                        className="text-sm font-bold"
                      >
                        {initials.toUpperCase()}
                      </Text>
                    </View>

                    <View className="ml-3 flex-1">
                      <Text
                        style={{ color: text }}
                        className="font-semibold text-[15px]"
                      >
                        {`${teacher.firstname} ${teacher.lastname}`}
                      </Text>
                      <Text
                        style={{ color: textTertiary }}
                        className="text-xs mt-0.5"
                      >
                        {teacher.email}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: badgeColor,
                      }}
                      className="px-2.5 py-1 rounded-full"
                    >
                      <Text
                        style={{ color: badgeBg }}
                        className="text-[10px] font-bold uppercase tracking-wider"
                      >
                        {isEditingTeacher ? "Editing teacher" : "Teacher"}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : null}

        {/* sections */}
        <View className="px-6 pb-12">
          <Text style={{ color: text }} className="text-lg font-bold mb-4">
            Content
          </Text>

          {currentCourse.sections.map((section) => (
            <View
              key={section.id}
              style={{
                backgroundColor: surface,
                borderColor: border,
              }}
              className="mb-4 rounded-2xl border overflow-hidden"
            >
              <View
                style={{
                  backgroundColor: surfaceVariant,
                  borderBottomColor: border,
                }}
                className="p-4 border-b"
              >
                <Text style={{ color: text }} className="font-bold">
                  {section.name || `Section ${section.section_number}`}
                </Text>
              </View>

              <View className="p-2 gap-y-1">
                {section.modules.length > 0 ? (
                  section.modules.map((module) => {
                    const iconInfo = getModuleIcon(module.modname);
                    const moduleColor = getColorByClass(iconInfo.colorClass);

                    return (
                      <Pressable
                        key={module.id}
                        style={{ backgroundColor: `${moduleColor}15` }}
                        className="flex-row items-center p-3 rounded-xl active:opacity-75"
                        onPress={() => {
                          if (module.modname === "quiz") {
                            router.push({
                              pathname: "/quiz/[id]",
                              params: { id: module.instance },
                            });
                          } else if (module.modname === "assign") {
                            router.push({
                              pathname: "/assignment/[id]",
                              params: { id: module.instance },
                            });
                          } else if (module.modname === "url") {
                            router.push({
                              pathname: "/url/[id]",
                              params: { id: module.instance },
                            });
                          }
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: `${moduleColor}20`,
                          }}
                          className="w-10 h-10 rounded-xl items-center justify-center"
                        >
                          <Ionicons
                            name={iconInfo.icon}
                            size={20}
                            color={moduleColor}
                          />
                        </View>
                        <View className="ml-3 flex-1">
                          <Text
                            style={{ color: text }}
                            className="font-medium text-[15px]"
                          >
                            {module.name}
                          </Text>
                          <Text
                            style={{ color: textTertiary }}
                            className="text-xs mt-0.5 uppercase font-bold tracking-wider"
                          >
                            {module.modname}
                          </Text>
                        </View>
                        <Ionicons
                          name="chevron-forward"
                          size={18}
                          color={textTertiary}
                        />
                      </Pressable>
                    );
                  })
                ) : (
                  <View className="p-4">
                    <Text
                      style={{ color: textTertiary }}
                      className="italic text-sm"
                    >
                      No modules in this section
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
