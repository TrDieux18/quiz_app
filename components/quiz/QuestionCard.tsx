import { Colors } from "@/constants/theme";
import type { Question } from "@/types/quiz.types";
import { stripHtml } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { memo, useCallback } from "react";
import { Pressable, Text, View } from "react-native";

type QuestionCardProps = {
  slotNumber: string;
  question: Question;
  selectedAnswerId: string | undefined;
  onSelectAnswer: (slot: string, answerId: string) => void;
  totalQuestions: number;
};

function QuestionCardComponent({
  slotNumber,
  question,
  selectedAnswerId,
  onSelectAnswer,
  totalQuestions,
}: QuestionCardProps) {
  // Theme colors - use light theme explicitly
  const themeColors = Colors.light;
  const {
    surface,
    text,
    textSecondary,
    textTertiary,
    primary,
    border,
    borderVariant,
    surfaceVariant,
  } = themeColors;

  const handleSelect = useCallback(
    (answerId: string) => {
      onSelectAnswer(slotNumber, answerId);
    },
    [slotNumber, onSelectAnswer],
  );

  return (
    <View
      style={{
        borderColor: border,
      }}
      className="mx-6 mb-4 rounded-2xl border  overflow-hidden"
    >
      {/* question header */}
      <View
        style={{
          borderBottomColor: borderVariant,
        }}
        className="px-5 pt-4 pb-3 border-b"
      >
        <Text
          style={{ color: text }}
          className="text-[15px] leading-6 font-medium"
        >
          <Text>{`Câu ${slotNumber}: `}</Text>
          {stripHtml(question.questiontext)}
        </Text>
      </View>

      {/* answers */}
      <View className="p-3">
        {question.answers.map((answer, index) => {
          const isSelected = selectedAnswerId === answer.id;
          const letter = String.fromCharCode(65 + index); // A, B, C, D...

          return (
            <Pressable
              key={answer.id}
              onPress={() => handleSelect(answer.id)}
              style={{
                backgroundColor: isSelected ? `${primary}15` : surfaceVariant,
                borderColor: isSelected ? primary : "transparent",
              }}
              className="flex-row items-center p-3.5 rounded-xl mb-1.5 border"
            >
              <View
                style={{
                  backgroundColor: isSelected ? primary : surface,
                  borderColor: isSelected ? primary : border,
                }}
                className="w-8 h-8 rounded-full items-center justify-center border"
              >
                {isSelected ? (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                ) : (
                  <Text
                    style={{ color: textTertiary }}
                    className="text-xs font-bold"
                  >
                    {letter}
                  </Text>
                )}
              </View>
              <Text
                style={{
                  color: isSelected ? primary : textSecondary,
                  fontWeight: isSelected ? "600" : "400",
                }}
                className="ml-3 flex-1 text-sm leading-5"
              >
                {stripHtml(answer.answer)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export const QuestionCard = memo(QuestionCardComponent);
