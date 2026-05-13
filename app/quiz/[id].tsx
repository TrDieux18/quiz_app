import { QuizDetailsCard } from "@/components/quiz/QuizDetailsCard";
import { QuizHeroCard } from "@/components/quiz/QuizHeroCard";
import { useQuizStore } from "@/store/quiz.store";
import { cn } from "@/utils/cn";
import { decimalToNumber } from "@/utils/decimal";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function QuizDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getQuiz, quiz, loading } = useQuizStore();

  useEffect(() => {
    if (id) getQuiz(id as string);
  }, [id]);

  const handleStartQuiz = useCallback(() => {
    router.push({
      pathname: "/quiz/attempt/[id]",
      params: { id: id as string },
    });
  }, [id]);

  if (loading || !quiz) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const timelimitSec = Number(quiz.timelimit) || 0;
  const gradeValue = decimalToNumber(quiz.grade);
  const maxAttempts = quiz.attempts;
  const timeOpen = quiz.timeopen;
  const timeClose = quiz.timeclose;
  const isTimeOpen = Number(timeOpen) === 0;
  const isTimeClose = Number(timeClose) === 0;

  return (
    <View className="flex-1 bg-slate-50">
      {/* header */}
      <View className="bg-white px-6 pt-12 pb-4 flex-row items-center border-b border-slate-100">
        <Pressable
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 active:bg-slate-100"
        >
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </Pressable>
        <Text
          className="ml-4 text-xl font-bold text-slate-900 flex-1"
          numberOfLines={1}
        >
          {quiz.name}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <QuizHeroCard
          quiz={quiz}
          timelimitSec={timelimitSec}
          maxAttempts={maxAttempts}
          gradeValue={gradeValue}
        />

        <QuizDetailsCard
          isTimeOpen={isTimeOpen}
          isTimeClose={isTimeClose}
          timeOpen={timeOpen}
          timeClose={timeClose}
          timelimitSec={timelimitSec}
          maxAttempts={maxAttempts}
          gradeValue={gradeValue}
        />

        {/* start quiz button */}
        <View className="mx-6 mt-6 mb-12">
          <Pressable
            onPress={handleStartQuiz}
            className={cn(
              "bg-slate-900 py-4 rounded-2xl items-center justify-center flex-row shadow-sm active:bg-indigo-600",
            )}
          >
            <Text className="text-white font-bold text-base ml-2">Start</Text>
          </Pressable>

          <Text className="text-slate-400 text-xs text-center mt-3">
            {maxAttempts > 0
              ? `You have a maximum of ${maxAttempts} attempts for this quiz`
              : "Unlimited attempts allowed"}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
