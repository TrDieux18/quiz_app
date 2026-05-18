import { QuizService } from "@/services/quiz.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface SubmitQuizParams {
  quizId: string;
  attemptNumber: number;
  answers: Array<{
    slot: number;
    answerId: number;
  }>;
}

export function useQuizQuery(id: string) {
  return useQuery({
    queryKey: ["quizzes", id],
    queryFn: () => QuizService.getQuiz(id),
    enabled: !!id,
  });
}

export function useStartQuizMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (quizId: string) => QuizService.startQuizAttempt(quizId),
    onSuccess: (data, quizId) => {
      queryClient.invalidateQueries({
        queryKey: ["quizzes", quizId],
      });
    },
  });
}

export function useSubmitQuizMutation() {
  return useMutation({
    mutationFn: ({ quizId, attemptNumber, answers }: SubmitQuizParams) =>
      QuizService.submitQuizAnswers(quizId, {
        attemptNumber,
        answers,
      }),
  });
}
