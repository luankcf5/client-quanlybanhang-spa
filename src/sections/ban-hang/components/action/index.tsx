import React from 'react';

import Stack from '@mui/material/Stack';

import { useGetBill } from 'src/api/bill';

import TempInvoice from './temp-invoice';
import PaymentAction from './payment-action';
import CancelInvoice from './cancel-invoice';
import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

export default function Action() {
  const { selectedBill, products } = useSaleContext();

  const { bill } = useGetBill(selectedBill?.id);

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ padding: 1 }}>
      <CancelInvoice bill={bill} />

      <Stack direction="row" spacing={0.5}>
        <TempInvoice bill={bill} products={products} />

        <PaymentAction bill={bill} />
      </Stack>
    </Stack>
  );
}
