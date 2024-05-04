// ----------------------------------------------------------------------

import { IQuestion } from './question';

export type IExamFilterValue = string | string[];

export type IExam = {
  id: number;
  name: string;
  code: string;
  duration: number;
  type: string;
  flag: boolean;
  subject: string;
  questions: IQuestion[];
  point: number;
  start: Date;
  end: Date;
  isLocked: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  assignedAt: Date;
  _count: any;
};

export type IChoiceAnswer = {
  questionId: number;
  answerId: number;
};
