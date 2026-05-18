import { Card } from "@/components/ui/card";
import ErrorScreen from "@/components/ui/error-screen";
import { InfoRow } from "@/components/ui/info-row";
import { Colors } from "@/constants/theme";
import { useAssignmentDetail } from "@/hooks/use-assigment-detail";
import { formatDate, stripHtml } from "@/utils/format";
import {
  getPluginByName,
  getPluginValue,
  isPluginEnabled,
} from "@/utils/plugin";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const themeColors = Colors.light;
  const {
    background,
    surface,
    text,
    textSecondary,
    border,
    surfaceVariant,
    primary,
    success,
    warning,
  } = themeColors;

  const { data, isLoading, isError, error, refetch } = useAssignmentDetail(id);

  const assignment = data?.assignment;
  const plugins = data?.plugins;

  const submissionPlugins = useMemo(() => {
    if (!plugins) return {};
    const result: Record<string, any> = {};
    plugins.forEach((plugin) => {
      if (plugin.subtype === "assignsubmission") {
        const key = `${plugin.plugin}:${plugin.name}`;
        result[key] = plugin;
      }
    });
    return result;
  }, [plugins]);

  const feedbackPlugins = useMemo(() => {
    if (!plugins) return {};
    const result: Record<string, any> = {};
    plugins.forEach((plugin) => {
      if (plugin.subtype === "assignfeedback") {
        const key = `${plugin.plugin}:${plugin.name}`;
        result[key] = plugin;
      }
    });
    return result;
  }, [plugins]);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );

  if (isError) return <ErrorScreen message={error.message} onRetry={refetch} />;

  if (!assignment) return null;

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
          {assignment.name}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-6 bg-[#ffffff] mb-4">
          <Text className="text-[15px] text-slate-700 font-medium  leading-6 ">
            {stripHtml(
              assignment?.intro ||
                "No description provided for this Assignment.",
            )}
          </Text>
        </View>
        <View className="px-6">
          <Card className="mb-4 ">
            <Text style={{ color: text }} className="text-base font-bold mb-3">
              <Ionicons name="calendar" size={16} color={primary} /> Các Ngày
              Quan Trọng
            </Text>

            <InfoRow
              icon="time-outline"
              iconColor={primary}
              iconBg={`${primary}15`}
              label="Mở nhận bài"
              value={formatDate(assignment.allowsubmissionsfromdate)}
            />

            <View
              style={{ backgroundColor: border, height: 1 }}
              className="my-2"
            />

            <InfoRow
              icon="alarm-outline"
              iconColor={warning}
              iconBg={`${warning}15`}
              label="Hạn chót"
              value={formatDate(assignment.duedate)}
            />

            <View
              style={{ backgroundColor: border, height: 1 }}
              className="my-2"
            />

            <InfoRow
              icon="close-circle-outline"
              iconColor="red"
              iconBg="#ff000015"
              label="Cutoff"
              value={formatDate(assignment.cutoffdate)}
            />

            <View
              style={{ backgroundColor: border, height: 1 }}
              className="my-2"
            />

            <InfoRow
              icon="checkmark-done-outline"
              iconColor={success}
              iconBg={`${success}15`}
              label="Chấm điểm"
              value={formatDate(assignment.gradingduedate)}
            />
          </Card>
          {/* Submission Methods */}
          <Card className="mb-4 ">
            <Text style={{ color: text }} className="text-base font-bold mb-3">
              <Ionicons
                name="document-text-outline"
                size={16}
                color={primary}
              />{" "}
              Phương Thức Nộp Bài
            </Text>

            {isPluginEnabled(
              getPluginByName(submissionPlugins, "file", "enabled"),
            ) && (
              <View className="mb-3">
                <Text style={{ color: text }} className="font-semibold text-sm">
                  <Ionicons name="link-outline" size={16} color={primary} /> Nộp
                  File
                </Text>
                <Text style={{ color: textSecondary }} className="text-xs mt-1">
                  Tối đa{" "}
                  {getPluginValue(
                    submissionPlugins,
                    "file",
                    "maxfilesubmissions",
                  ) || 0}{" "}
                  file
                </Text>
                {getPluginValue(submissionPlugins, "file", "filetypeslist") && (
                  <Text
                    style={{ color: textSecondary }}
                    className="text-xs mt-1"
                  >
                    Loại:{" "}
                    {getPluginValue(submissionPlugins, "file", "filetypeslist")}
                  </Text>
                )}
              </View>
            )}

            {isPluginEnabled(
              getPluginByName(submissionPlugins, "onlinetext", "enabled"),
            ) && (
              <View>
                <Text style={{ color: text }} className="font-semibold text-sm">
                  Viết Trực Tiếp
                </Text>
              </View>
            )}

            {!isPluginEnabled(
              getPluginByName(submissionPlugins, "file", "enabled"),
            ) &&
              !isPluginEnabled(
                getPluginByName(submissionPlugins, "onlinetext", "enabled"),
              ) && (
                <Text style={{ color: textSecondary }} className="text-xs">
                  Không có phương thức nộp bài được kích hoạt
                </Text>
              )}
          </Card>
          {isPluginEnabled(
            getPluginByName(submissionPlugins, "comments", "enabled"),
          ) && (
            <Card className="mb-4">
              <Text
                style={{ color: text }}
                className="text-base font-bold mb-2"
              >
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={16}
                  color={primary}
                />{" "}
                Nhận Xét
              </Text>
              <Text style={{ color: textSecondary }} className="text-xs">
                Bạn có thể gửi nhận xét cho bài nộp
              </Text>
            </Card>
          )}
          {/* Feedback Methods */}
          <Card className="mb-6">
            <Text style={{ color: text }} className="text-base font-bold mb-3">
              <Ionicons
                name="chatbox-outline"
                size={16}
                color={primary}
                className="font-medium"
              />{" "}
              Phản Hồi
            </Text>

            {isPluginEnabled(
              getPluginByName(feedbackPlugins, "comments", "enabled"),
            ) && (
              <View className="mb-3">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color={success} />
                  <Text
                    style={{ color: text }}
                    className="ml-2 font-semibold text-sm"
                  >
                    Nhận Xét Bằng Lời
                  </Text>
                </View>
                {getPluginValue(
                  feedbackPlugins,
                  "comments",
                  "commentinline",
                ) === "1" && (
                  <Text
                    style={{ color: textSecondary }}
                    className="text-xs mt-1"
                  >
                    Bao gồm nhận xét trong nội dung
                  </Text>
                )}
              </View>
            )}

            {isPluginEnabled(
              getPluginByName(feedbackPlugins, "file", "enabled"),
            ) && (
              <View className="mb-3">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color={success} />
                  <Text
                    style={{ color: text }}
                    className="ml-2 font-semibold text-sm"
                  >
                    Phản Hồi Bằng File
                  </Text>
                </View>
              </View>
            )}

            {isPluginEnabled(
              getPluginByName(feedbackPlugins, "editpdf", "enabled"),
            ) && (
              <View className="mb-3">
                <View className="flex-row items-center">
                  <Ionicons name="checkmark-circle" size={16} color={success} />
                  <Text
                    style={{ color: text }}
                    className="ml-2 font-semibold text-sm"
                  >
                    Chỉnh Sửa PDF
                  </Text>
                </View>
              </View>
            )}

            {!isPluginEnabled(
              getPluginByName(feedbackPlugins, "comments", "enabled"),
            ) &&
              !isPluginEnabled(
                getPluginByName(feedbackPlugins, "file", "enabled"),
              ) &&
              !isPluginEnabled(
                getPluginByName(feedbackPlugins, "editpdf", "enabled"),
              ) && (
                <Text style={{ color: textSecondary }} className="text-xs">
                  Không có phương thức phản hồi được kích hoạt
                </Text>
              )}
          </Card>
          <Pressable
            style={{
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 12,
              marginBottom: 24,
            }}
            className="flex-row bg-slate-900 items-center justify-center"
          >
            <Ionicons name="cloud-upload-outline" size={20} color="white" />
            <Text className="ml-2 text-white font-bold">Nộp Bài</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
