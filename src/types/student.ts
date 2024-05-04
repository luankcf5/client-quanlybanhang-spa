import { IClass } from './class';

export type IStudent = {
  id: number;
  class: IClass;
  username: string;
  password: string;
  name: string;
  teacher: any;
  submissions: any;
};
