import React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// ----------------------------------------------------------------------

export default function Action() {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ padding: 1 }}>
      <Button variant="contained" size="small" color="error">
        Huỷ đơn
      </Button>

      <Stack direction="row" spacing={0.5}>
        <Button variant="contained" size="small" color="warning">
          In lại
        </Button>

        <Button variant="contained" size="small" color="secondary">
          Cập nhật
        </Button>

        <Button variant="contained" size="small" color="primary">
          Thanh toán
        </Button>
      </Stack>
    </Stack>
  );
}
