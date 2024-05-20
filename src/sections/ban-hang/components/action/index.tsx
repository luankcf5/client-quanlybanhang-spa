import React from 'react';

import Stack from '@mui/material/Stack';

import TempInvoice from './temp-invoice';
import PaymentAction from './payment-action';
import CancelInvoice from './cancel-invoice';

// ----------------------------------------------------------------------

export default function Action() {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ padding: 1 }}>
      <CancelInvoice />

      <Stack direction="row" spacing={0.5}>
        <TempInvoice />

        <PaymentAction />
      </Stack>
    </Stack>
  );
}
