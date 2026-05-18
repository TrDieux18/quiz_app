import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

import type { Quiz } from "@/types/quiz.types";
import { formatDuration, stripHtml } from "@/utils/format";

type QuizHeroCardProps = {
  quiz: Quiz;
  timelimitSec: number;
  maxAttempts: number;
  gradeValue: number;
};

export function QuizHeroCard({
  quiz,
  timelimitSec,
  maxAttempts,
  gradeValue,
}: QuizHeroCardProps) {
  return (
    <View className="mx-6 mt-6 rounded-3xl overflow-hidden bg-slate-800 shadow-lg">
      <View className="p-6">
        <View className="flex-row items-center mb-3">
          <View className="w-10 h-10 rounded-2xl bg-white/20 items-center justify-center">
            <Ionicons name="document-text" size={22} color="#fff" />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-white/70 text-xs font-bold uppercase tracking-wider">
              {"Quiz"}
            </Text>
            <Text className="text-white text-lg font-bold " numberOfLines={2}>
              {quiz.name}
            </Text>
          </View>
        </View>

        {/* description */}
        <View className="bg-white/10 rounded-2xl p-4 mt-1">
          <Text className="text-white/90 text-sm leading-5 font-medium">
            {stripHtml(quiz.intro) || "No description provided."}
          </Text>
        </View>

        <View className="flex-row mt-5 justify-between">
          <View className="items-center flex-1">
            <View className="w-10 h-10 rounded-full bg-white/15 items-center justify-center mb-1.5">
              <Ionicons name="timer-outline" size={20} color="#fff" />
            </View>
            <Text className="text-white font-bold text-sm">
              {formatDuration(timelimitSec)}
            </Text>
            <Text className="text-white/60 text-xs mt-0.5">{"Time limit"}</Text>
          </View>

          <View className="w-[1px] bg-white/15 mx-2" />

          <View className="items-center flex-1">
            <View className="w-10 h-10 rounded-full bg-white/15 items-center justify-center mb-1.5">
              <Ionicons name="refresh-outline" size={20} color="#fff" />
            </View>
            <Text className="text-white font-bold text-sm">
              {maxAttempts > 0 ? `${maxAttempts}` : "∞"}
            </Text>
            <Text className="text-white/60 text-xs mt-0.5">{"Attempts"}</Text>
          </View>

          <View className="w-[1px] bg-white/15 mx-2" />

          <View className="items-center flex-1">
            <View className="w-10 h-10 rounded-full bg-white/15 items-center justify-center mb-1.5">
              <Ionicons name="trophy-outline" size={20} color="#fff" />
            </View>
            <Text className="text-white font-bold text-sm">
              {`${gradeValue}`}
            </Text>
            <Text className="text-white/60 text-xs mt-0.5">{"Max grade"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
