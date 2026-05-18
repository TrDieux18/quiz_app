import CourseCard from "@/components/course";
import { HelloWave } from "@/components/hello-wave";
import { Colors } from "@/constants/theme";
import { useCoursesQuery } from "@/hooks/use-course";
import { useAuthStore } from "@/store/auth.store";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

function getInitials(firstname?: string, lastname?: string) {
  return [firstname, lastname]
    .filter(Boolean)
    .map((part) => part?.trim().charAt(0))
    .join("")
    .toUpperCase();
}

export default function HomeScreen() {
  const { user } = useAuthStore();
  const { data: courses = [], isLoading: loading } = useCoursesQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(
    (course) =>
      course.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortname.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const themeColors = Colors.light;
  const {
    background,
    surface,
    text,
    textTertiary,
    border,
    surfaceVariant,
    icon,
    primary,
  } = themeColors;

  const avatarUri = user?.picture?.startsWith("http") ? user.picture : null;
  const initials = getInitials(user?.firstname, user?.lastname) || "U";

  if (loading) {
    return (
      <View
        style={{ backgroundColor: background }}
        className="flex-1 items-center justify-center"
      >
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: background }}
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerClassName="px-5 pb-28 pt-14"
    >
      <View
        style={{
          backgroundColor: surface,
          borderColor: border,
        }}
        className="rounded-[32px] border p-5"
      >
        <View className="flex-row items-center gap-3">
          <View
            style={{ backgroundColor: surfaceVariant }}
            className="h-14 w-14 items-center justify-center overflow-hidden rounded-2xl"
          >
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            ) : (
              <Text style={{ color: text }} className="text-lg font-bold">
                {initials}
              </Text>
            )}
          </View>

          <View className="flex-1">
            <Text style={{ color: textTertiary }} className="text-sm">
              Hi,{" "}
            </Text>
            <View className="flex flex-row gap-x-1">
              <Text
                style={{ color: text }}
                className="text-xl font-bold"
                numberOfLines={1}
              >
                {user?.lastname}
              </Text>
              <HelloWave />
            </View>
            <Text
              style={{ color: textTertiary }}
              className="text-sm"
              numberOfLines={1}
            >
              {user?.email}
            </Text>
          </View>
        </View>

        <View className="mt-5 flex-row gap-3">
          <View
            style={{ backgroundColor: surfaceVariant }}
            className="flex-1 rounded-2xl p-4"
          >
            <Text
              style={{ color: textTertiary }}
              className="text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Courses
            </Text>
            <Text style={{ color: text }} className="mt-2 text-2xl font-bold">
              {courses.length}
            </Text>
          </View>

          <View
            style={{ backgroundColor: surfaceVariant }}
            className="flex-1 rounded-2xl p-4"
          >
            <Text
              style={{ color: textTertiary }}
              className="text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Favorites
            </Text>
            <Text style={{ color: text }} className="mt-2 text-2xl font-bold">
              08
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          backgroundColor: surface,
          borderColor: border,
        }}
        className="mt-5 rounded-2xl border px-4 py-3 flex-row items-center gap-3"
      >
        <Ionicons name="search" size={20} color={icon} />
        <TextInput
          placeholder="Search courses"
          placeholderTextColor={textTertiary}
          style={{ color: text }}
          className="flex-1 text-base h-full font-medium focus:outline-none"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View className="mt-6 flex-row items-end justify-between">
        <View>
          <Text style={{ color: text }} className="text-lg font-bold">
            Your courses
          </Text>
          <Text style={{ color: textTertiary }} className="mt-1 text-sm">
            Tap a course to view details.
          </Text>
        </View>
        <Text style={{ color: textTertiary }} className="text-sm font-semibold">
          {courses.length} items
        </Text>
      </View>

      <View className="mt-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <View
            style={{
              backgroundColor: surface,
              borderColor: border,
            }}
            className="rounded-3xl border border-dashed p-6"
          >
            <View
              style={{ backgroundColor: surfaceVariant }}
              className="h-12 w-12 items-center justify-center rounded-2xl"
            >
              <Ionicons name="library-outline" size={22} color={icon} />
            </View>
            <Text style={{ color: text }} className="mt-4 text-lg font-bold">
              No courses yet
            </Text>
            <Text
              style={{ color: textTertiary }}
              className="mt-2 text-sm leading-6"
            >
              When courses are available, they will appear here.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
