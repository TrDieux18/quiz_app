import { InfoRow } from "@/components/ui/info-row";
import { formatDate, formatDuration } from "@/utils/format";
import { Text, View } from "react-native";

type QuizDetailsCardProps = {
  isTimeOpen: boolean;
  isTimeClose: boolean;
  timeOpen: string;
  timeClose: string;
  timelimitSec: number;
  maxAttempts: number;
  gradeValue: number;
};

export function QuizDetailsCard({
  isTimeOpen,
  isTimeClose,
  timeOpen,
  timeClose,
  timelimitSec,
  maxAttempts,
  gradeValue,
}: QuizDetailsCardProps) {
  return (
    <View className="mx-6 mt-4 bg-white rounded-2xl border border-slate-100  overflow-hidden">
      <View className="px-5 pt-4 pb-2">
        <Text className="text-base font-bold text-slate-900 mb-1">
          {"Details"}
        </Text>
      </View>

      <View className="px-5">
        <InfoRow
          icon="calendar-outline"
          iconColor="#6366f1"
          iconBg="#eef2ff"
          label="Opens"
          value={isTimeOpen ? "Always open" : formatDate(timeOpen)}
        />

        <View className="h-[1px] bg-slate-50" />

        <InfoRow
          icon="calendar-outline"
          iconColor="#f43f5e"
          iconBg="#fff1f2"
          label="Closes"
          value={isTimeClose ? "No deadline" : formatDate(timeClose)}
        />

        <View className="h-[1px] bg-slate-50" />

        <InfoRow
          icon="timer-outline"
          iconColor="#f59e0b"
          iconBg="#fffbeb"
          label="Time limit"
          value={formatDuration(timelimitSec)}
        />

        <View className="h-[1px] bg-slate-50" />

        <InfoRow
          icon="refresh-outline"
          iconColor="#10b981"
          iconBg="#ecfdf5"
          label="Max attempts"
          value={maxAttempts > 0 ? `${maxAttempts} attempts` : "Unlimited"}
        />

        <View className="h-[1px] bg-slate-50" />

        <InfoRow
          icon="trophy-outline"
          iconColor="#8b5cf6"
          iconBg="#f5f3ff"
          label="Grade to pass"
          value={`${gradeValue} pts`}
        />
      </View>
    </View>
  );
}
