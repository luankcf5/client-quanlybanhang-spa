import { IExam } from './exam';
import { IStudent } from './student';

export type ISubmission = {
  point: number;
  isLocked: boolean;
  studentId: number;
  examId: number;
  choices: {
    answerId: number;
    examId: number;
    questionId: number;
    studentId: number;
  }[];
  student: IStudent;
  exam: IExam;
};
