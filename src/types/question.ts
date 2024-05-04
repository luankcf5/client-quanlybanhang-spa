export type IQuestion = {
  id: number;
  content: string;
  point: string;
  subject: string;
  answers: IAnswer[];
};

export type IAnswer = {
  id: number;
  content: string;
  isCorrect: boolean;
};
