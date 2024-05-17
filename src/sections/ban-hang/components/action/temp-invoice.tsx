import React from 'react';

import Button from '@mui/material/Button';

import { useBoolean } from 'src/hooks/use-boolean';

import { IBill } from 'src/types/bill';

import PrintInvoice from './print-invoice';

// ----------------------------------------------------------------------

type Props = {
  bill: IBill | null;
  products: any;
};

export default function TempInvoice({ bill, products }: Props) {
  const openPrint = useBoolean();
  return (
    <>
      <Button variant="contained" size="small" color="warning" onClick={openPrint.onTrue}>
        Tạm tính
      </Button>

      <PrintInvoice
        title="HOÁ ĐƠN TẠM TÍNH"
        invoice={bill}
        products={products}
        open={openPrint.value}
        onClose={openPrint.onFalse}
      />
    </>
  );
}
