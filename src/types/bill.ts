import { IVoucher } from './voucher';
import { IProduct } from './product';
import { ICustomer } from './customer';

// ----------------------------------------------------------------------

export type IBill = {
  id: number;
  note: string;
  regularPrice: number;
  discountPrice: number;
  totalPrice: number;
  customer: ICustomer;
  status: {
    id: number;
    name: string;
  };
  statusId: number;
  phone: string;
  address: string;
  name: string;
  fee: number;
  voucher: IVoucher;
  products: {
    product: IProduct;
    amount: number;
    note: string;
  };
  createdAt: Date;
  updateAt: Date;
};
