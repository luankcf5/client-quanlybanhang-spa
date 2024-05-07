'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import PrintOption from './print-option';
import SearchInvoice from './search-invoice';
import InvoiceChange from './invoice-change';
import KeyboardOption from './keyboard-option';

// ----------------------------------------------------------------------

export default function BanHangHeader() {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        bgcolor: 'primary.main',
        padding: 1,
      }}
    >
      <SearchInvoice />

      <InvoiceChange />

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row">
        <PrintOption />

        <KeyboardOption />

        {/* <KeyboardOption />

        <FullScreenOption /> */}
      </Stack>
    </Stack>
  );
}
