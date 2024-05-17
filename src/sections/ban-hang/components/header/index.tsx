'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { IBill } from 'src/types/bill';

import PrintOption from './print-option';
import SearchInvoice from './search-invoice';
import InvoiceChange from './invoice-change';
import KeyboardOption from './keyboard-option';

// ----------------------------------------------------------------------

type Props = {
  billList: IBill[];
  handleAddNewBill: (bill: IBill) => void;
};

export default function BanHangHeader({ billList, handleAddNewBill }: Props) {
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
      <SearchInvoice bills={billList} />

      <InvoiceChange onAddNewBill={handleAddNewBill} />

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
