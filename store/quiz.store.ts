import { api } from "@/services/api";
import { create } from "zustand";

// Prisma Decimal gets serialized as { s: sign, e: exponent, d: digits[] }
export type SerializedDecimal = {
  s: number;
  e: number;
  d: number[];
};

export type Quiz = {
  id: string;
  name: string;
  intro: string;
  introformat: number;
  sumgrades: SerializedDecimal;
  grade: SerializedDecimal;
  timeopen: string;
  timeclose: string;
  timelimit: string;
  attempts: number;
  allowofflineattempts: boolean;
  attemptonlast: number;
  timecreated: string;
  timemodified: string;
};

export type Answer = {
  id: string;
  answer: string;
};

export type Question = {
  id: string;
  name: string;
  questiontext: string;
  qtype: string;
  defaultmark: number;
  answers: Answer[];
};

export type QuestionSlot = {
  slot: string;
  question: Question | null;
};

export type AttemptData = {
  attemptId: string;
  attemptNumber: number;
  timestart: string;
  timelimit: string;
  questions: QuestionSlot[];
};

export type SubmitResult = {
  message: string;
  attemptId: string;
  sumgrades: number;
  timefinish: string;
};

type QuizState = {
  quiz: Quiz | null;
  loading: boolean;
  attempt: AttemptData | null;
  // Map of slot number -> selected answerId
  selectedAnswers: Record<string, string>;
  submitting: boolean;
  submitResult: SubmitResult | null;

  getQuiz: (id: string) => Promise<void>;
  startQuiz: (quizId: string) => Promise<AttemptData>;
  selectAnswer: (slot: string, answerId: string) => void;
  submitQuiz: (quizId: string) => Promise<void>;
  resetAttempt: () => void;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  quiz: null,
  loading: false,
  attempt: null,
  selectedAnswers: {},
  submitting: false,
  submitResult: null,

  getQuiz: async (id) => {
    set({ loading: true });
    try {
      const res = await api.get(`/quiz/${id}`);
      set({ quiz: res.data });
    } finally {
      set({ loading: false });
    }
  },

  startQuiz: async (quizId) => {
    set({ loading: true, selectedAnswers: {}, submitResult: null });
    try {
      const res = await api.post(`/quiz/${quizId}/start`);
      const attempt: AttemptData = res.data;
      set({ attempt });
      return attempt;
    } finally {
      set({ loading: false });
    }
  },

  selectAnswer: (slot, answerId) => {
    set((state) => ({
      selectedAnswers: { ...state.selectedAnswers, [slot]: answerId },
    }));
  },

  submitQuiz: async (quizId) => {
    const { attempt, selectedAnswers } = get();
    if (!attempt) {
      throw new Error("No active attempt");
    }

    set({ submitting: true });
    try {
      const answers = Object.entries(selectedAnswers).map(
        ([slot, answerId]) => ({
          slot: Number(slot),
          answerId: Number(answerId),
        }),
      );

      const res = await api.post(`/quiz/${quizId}/submit`, {
        attempt: attempt.attemptNumber,
        answers,
      });

      set({ submitResult: res.data });
    } finally {
      set({ submitting: false });
    }
  },

  resetAttempt: () => {
    set({ attempt: null, selectedAnswers: {}, submitResult: null });
  },
}));
