import React, { useState, useCallback } from 'react';

import Button from '@mui/material/Button';

import { useBoolean } from 'src/hooks/use-boolean';

import { getBill } from 'src/api/bill';

import { IBill } from 'src/types/bill';

import PrintInvoice from './print-invoice';
import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

export default function TempInvoice() {
  const openPrint = useBoolean();

  const { selectedBill, products } = useSaleContext();

  const [bill, setBill] = useState<IBill | null>(null);

  const handleOpenTemp = useCallback(async () => {
    const currentBill = await getBill(selectedBill?.id);
    setBill(currentBill);
    openPrint.onTrue();
  }, [getBill, selectedBill, setBill, openPrint]);
  return (
    <>
      <Button variant="contained" size="small" color="warning" onClick={handleOpenTemp} disabled>
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
