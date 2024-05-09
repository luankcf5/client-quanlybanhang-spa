export type IProduct = {
  id: number;
  code: string;
  label: string;
  amount: number;
  image: string;
  attr: IAttr[];
  brand: IBrand;
  createdAt: Date;
  updateAt: Date;
};

type IAttr = {
  id: number;
  key: string;
  values: string[];
};

type IBrand = {
  id: number;
  name: string;
};
