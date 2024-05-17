import { IBill } from './bill';

export type IRoom = {
  id: number;
  name: string;
  billId: number;
  currentBill: IBill;
  isVip: boolean;
  createdAt: Date;
  updatedAt: Date;
};
