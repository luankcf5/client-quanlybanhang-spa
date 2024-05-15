import { ICategory } from './category';

export type IProduct = {
  id: number;
  code: string;
  name: string;
  category: ICategory;
  description: string;
  price: number;
  discount: number;
  amount: number;
  image: string;
  createdAt: Date;
  updateAt: Date;
};
