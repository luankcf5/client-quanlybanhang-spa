import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import PaymentAction from './payment-action';

// ----------------------------------------------------------------------

export default function Action() {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ padding: 1 }}>
      <Button variant="contained" size="small" color="error">
        Huỷ đơn
      </Button>

      <Stack direction="row" spacing={0.5}>
        <Button variant="contained" size="small" color="warning">
          Trả hàng
        </Button>

        <Button variant="contained" size="small" color="secondary">
          Tạm tính
        </Button>

        <PaymentAction />
      </Stack>
    </Stack>
  );
}
