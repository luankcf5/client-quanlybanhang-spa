import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { createBill } from 'src/api/bill';

import { useSnackbar } from 'src/components/snackbar';

import { IBill } from 'src/types/bill';

import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

type Props = {
  onAddNewBill: (bill: IBill) => void;
};

export default function InvoiceChange({ onAddNewBill }: Props) {
  const { onGetBill } = useSaleContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleNewBill = useCallback(async () => {
    try {
      const bill = await createBill({
        statusId: 1,
        regularPrice: 0,
        discountPrice: 0,
        totalPrice: 0,
      });
      onAddNewBill(bill);
      onGetBill(bill);
      enqueueSnackbar('Đã thêm hoá đơn mới !');
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.message || error.message[0] || 'Đã có lỗi xảy ra ! Vui lòng thử lại !',
        {
          variant: 'error',
        }
      );
    }
  }, [onAddNewBill, onGetBill, enqueueSnackbar]);
  return (
    <Stack>
      <Button variant="contained" color="secondary" onClick={handleNewBill} disabled>
        Hoá đơn mới
      </Button>
    </Stack>
  );
}
