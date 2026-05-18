import { QuestionCard } from "@/components/quiz/QuestionCard";
import { QuizTimer } from "@/components/quiz/QuizTimer";
import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Colors } from "@/constants/theme";
import {
  SubmitQuizParams,
  useStartQuizMutation,
  useSubmitQuizMutation,
} from "@/hooks/use-quiz";
import { AttemptData, SubmitResult } from "@/types/quiz.types";
import { formatScore } from "@/utils/decimal";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function QuizAttemptScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation<any>();

  const { mutate: startQuiz, isPending: loading } = useStartQuizMutation();
  const { mutate: submitQuizMutation, isPending: submitting } =
    useSubmitQuizMutation();

  const [attempt, setAttempt] = useState<AttemptData | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});

  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const themeColors = Colors.light;

  type ConfirmState = {
    visible: boolean;
    message: string;
    action?: () => void;
  };
  const [confirmDialog, setConfirmDialog] = useState<ConfirmState>({
    visible: false,
    message: "",
  });

  const hasStarted = useRef(false);

  const showConfirm = useCallback((message: string, onConfirm: () => void) => {
    setConfirmDialog({ visible: true, message, action: onConfirm });
  }, []);

  const hideConfirm = useCallback(() => {
    setConfirmDialog({ visible: false, message: "" });
  }, []);

  const selectAnswer = useCallback((slot: string, answerId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [slot]: answerId }));
  }, []);

  const resetAttempt = useCallback(() => {
    setAttempt(null);
    setSelectedAnswers({});
    setSubmitResult(null);
  }, []);

  useEffect(() => {
    if (id && !hasStarted.current) {
      hasStarted.current = true;
      startQuiz(id as string, {
        onSuccess: (data) => {
          setAttempt(data);
        },
        onError: (err: any) => {
          Alert.alert("Error", err?.response?.data?.message || err.message);
          if (navigation.canGoBack()) navigation.goBack();
        },
      });
    }
  }, [id, navigation, startQuiz]);

  const questions = attempt?.questions.filter((q) => q.question !== null) ?? [];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const quizId = Array.isArray(id) ? id[0] : id;

  const performSubmit = useCallback(
    (submitQuizId: string) => {
      if (!submitQuizId || !attempt) {
        Alert.alert("Error", "Quiz ID or attempt not found");
        return;
      }
      const answers = Object.entries(selectedAnswers).map(
        ([slot, answerId]) => ({
          slot: Number(slot),
          answerId: Number(answerId),
        }),
      );

      const payload: SubmitQuizParams = {
        quizId: submitQuizId,
        attemptNumber: attempt.attemptNumber,
        answers,
      };

      submitQuizMutation(payload, {
        onSuccess: (data) => {
          setSubmitResult(data);
        },
        onError: (err: any) => {
          Alert.alert(
            "Submission Error",
            err?.response?.data?.message || err.message,
          );
        },
      });
    },
    [attempt, selectedAnswers, submitQuizMutation],
  );

  const handleSubmit = useCallback(() => {
    if (!quizId) return;

    if (answeredCount < totalQuestions) {
      showConfirm(
        `You answered ${answeredCount} of ${totalQuestions} questions. Submit anyway?`,
        () => performSubmit(quizId),
      );
    } else {
      showConfirm("Are you sure you want to submit?", () =>
        performSubmit(quizId),
      );
    }
  }, [quizId, answeredCount, totalQuestions, performSubmit, showConfirm]);

  const handleTimeUp = useCallback(() => {
    showConfirm("Your quiz will be submitted automatically.", () => {
      if (quizId) {
        performSubmit(quizId);
      }
    });
  }, [quizId, performSubmit, showConfirm]);

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.background }}>
      {submitResult ? (
        <View className="flex-1 justify-center items-center px-6">
          <View
            style={{
              backgroundColor: themeColors.surface,
              borderColor: themeColors.border,
            }}
            className="rounded-3xl p-8 w-full items-center  border"
          >
            <View
              style={{ backgroundColor: themeColors.successBackground }}
              className="w-20 h-20 rounded-full items-center justify-center mb-5"
            >
              <Ionicons
                name="checkmark-circle"
                size={44}
                color={themeColors.success}
              />
            </View>

            <Text
              style={{ color: themeColors.text }}
              className="text-2xl font-bold mb-2"
            >
              {"Quiz Submitted!"}
            </Text>

            <Text
              style={{ color: themeColors.textTertiary }}
              className="text-center text-sm mb-6"
            >
              {"Your answers have been recorded successfully."}
            </Text>

            <View
              style={{ backgroundColor: themeColors.surfaceVariant }}
              className="rounded-2xl p-5 w-full mb-6"
            >
              <View className="flex-row justify-between mb-3">
                <Text
                  style={{ color: themeColors.textTertiary }}
                  className="text-sm"
                >
                  {"Score"}
                </Text>
                <Text
                  style={{ color: themeColors.text }}
                  className="font-bold text-sm"
                >
                  {formatScore(submitResult.sumgrades)}
                </Text>
              </View>
              <View className="flex-row justify-between">
                <Text
                  style={{ color: themeColors.textTertiary }}
                  className="text-sm"
                >
                  {"Questions"}
                </Text>
                <Text
                  style={{ color: themeColors.text }}
                  className="font-bold text-sm"
                >
                  {`${answeredCount}/${totalQuestions} answered`}
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => {
                resetAttempt();

                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.replace("/");
                }
              }}
              style={{ backgroundColor: themeColors.text }}
              className="py-3.5 rounded-2xl items-center w-full"
            >
              <Text className="text-white font-bold text-base">
                {"Back to Quiz"}
              </Text>
            </Pressable>
          </View>
        </View>
      ) : loading || !attempt ? (
        <View
          style={{ backgroundColor: themeColors.surface }}
          className="flex-1 justify-center items-center"
        >
          <ActivityIndicator size="large" color={themeColors.text} />
        </View>
      ) : (
        // 3. MÀN HÌNH LÀM BÀI
        <View className="flex-1">
          {/* header */}
          <View
            style={{
              backgroundColor: themeColors.surface,
              borderBottomColor: themeColors.border,
            }}
            className="px-6 pt-12 pb-3 flex-row items-center border-b"
          >
            <Pressable
              onPress={() => {
                showConfirm(
                  "Your progress will be saved. You can resume later.",
                  () => {
                    resetAttempt();
                    navigation.canGoBack()
                      ? navigation.goBack()
                      : navigation.replace("Home");
                  },
                );
              }}
              style={{ backgroundColor: themeColors.surfaceVariant }}
              className="w-10 h-10 items-center justify-center rounded-full"
            >
              <Ionicons name="close" size={22} color={themeColors.text} />
            </Pressable>

            <View className="ml-3 flex-1">
              <Text
                style={{ color: themeColors.text }}
                className="text-base font-bold"
                numberOfLines={1}
              >
                {`Attempt #${attempt.attemptNumber}`}
              </Text>
              <Text
                style={{ color: themeColors.textTertiary }}
                className="text-xs"
              >
                {`${answeredCount}/${totalQuestions} answered`}
              </Text>
            </View>

            <QuizTimer
              timelimitSec={Number(attempt.timelimit) || 0}
              timestartSec={Number(attempt.timestart) || 0}
              onTimeUp={handleTimeUp}
            />
          </View>

          {/* progress bar */}
          <View
            style={{ backgroundColor: themeColors.borderVariant }}
            className="h-1"
          >
            <View
              style={{
                backgroundColor: themeColors.primary,
                width:
                  totalQuestions > 0
                    ? `${(answeredCount / totalQuestions) * 100}%`
                    : "0%",
              }}
              className="h-1 rounded-r-full"
            />
          </View>

          {/* questions */}
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="pt-4 pb-6">
              {questions.map((q) =>
                q.question ? (
                  <QuestionCard
                    key={q.slot}
                    slotNumber={q.slot}
                    question={q.question}
                    selectedAnswerId={selectedAnswers[q.slot]}
                    onSelectAnswer={selectAnswer}
                    totalQuestions={totalQuestions}
                  />
                ) : null,
              )}
            </View>

            {/* submit button */}
            <View className="mx-6 mb-12">
              <Pressable
                onPress={handleSubmit}
                disabled={submitting}
                style={{
                  backgroundColor: submitting
                    ? themeColors.textDisabled
                    : themeColors.primary,
                }}
                className="py-4 rounded-2xl items-center justify-center flex-row "
              >
                {submitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white font-bold text-base ml-2">
                    {"Submit"}
                  </Text>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>
      )}

      <Dialog
        open={confirmDialog.visible}
        onOpenChange={hideConfirm}
        title="Confirm"
      >
        <DialogContent>
          <Text
            style={{ color: themeColors.text }}
            className="text-base leading-6"
          >
            {confirmDialog.message}
          </Text>
          <DialogFooter>
            <DialogAction variant="outline" onPress={hideConfirm}>
              Cancel
            </DialogAction>
            <DialogAction
              variant="default"
              onPress={() => {
                hideConfirm();
                confirmDialog.action?.();
              }}
            >
              Confirm
            </DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}
