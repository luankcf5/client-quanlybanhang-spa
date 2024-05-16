'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useGetBills } from 'src/api/bill';

import { IBill } from 'src/types/bill';

import PrintOption from './print-option';
import SearchInvoice from './search-invoice';
import InvoiceChange from './invoice-change';
import KeyboardOption from './keyboard-option';

// ----------------------------------------------------------------------

export default function BanHangHeader() {
  const { bills } = useGetBills();

  const [billList, setBillList] = useState<IBill[]>([]);

  useEffect(() => {
    setBillList(bills);
  }, [bills]);

  const handleAddNewBill = useCallback(
    (bill: IBill) => {
      setBillList((pre) => [...pre, bill]);
    },
    [setBillList]
  );

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
