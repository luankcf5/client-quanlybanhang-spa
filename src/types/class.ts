import { IExam } from './exam';

// ----------------------------------------------------------------------

export type IClass = {
  id: number;
  name: string;
  teacher: any;
  exams: IExam[];
  _count: {
    students: number;
    exams: number;
  };
  createdAt: Date;
  updatedAt: Date;
};
