import { api } from "@/services/api";
import { AttemptData, Quiz, SubmitResult } from "@/types/quiz.types";

export interface SubmitQuizPayload {
  attemptNumber: number;
  answers: Array<{
    slot: number;
    answerId: number;
  }>;
}

export class QuizService {
  
  static async getQuiz(id: string): Promise<Quiz> {
    const res = await api.get(`/quiz/${id}`);
    return res.data;
  }


  static async startQuizAttempt(quizId: string): Promise<AttemptData> {
    const res = await api.post(`/quiz/${quizId}/start`);
    return res.data;
  }

 
  static async submitQuizAnswers(
    quizId: string,
    payload: SubmitQuizPayload,
  ): Promise<SubmitResult> {
    const res = await api.post(`/quiz/${quizId}/submit`, {
      attempt: payload.attemptNumber,
      answers: payload.answers,
    });
    return res.data;
  }
}
