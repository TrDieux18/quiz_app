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
