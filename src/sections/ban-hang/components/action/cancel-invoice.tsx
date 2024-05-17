import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';

import Button from '@mui/material/Button';

import { useBoolean } from 'src/hooks/use-boolean';

import { updateBill } from 'src/api/bill';

import { ConfirmDialog } from 'src/components/custom-dialog';

import { IBill } from 'src/types/bill';

import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

type Props = {
  bill: IBill | null;
};

export default function CancelInvoice({ bill }: Props) {
  const openConfirm = useBoolean();

  const { onGetBill } = useSaleContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleCancelBill = useCallback(() => {
    updateBill(bill?.id, {
      statusId: 3,
    });
    onGetBill(null);
    openConfirm.onFalse();
    enqueueSnackbar('Huỷ đơn hàng thành công !');
  }, [bill, openConfirm, updateBill, onGetBill, enqueueSnackbar]);
  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={openConfirm.onTrue}
        disabled={bill?.statusId !== 2}
      >
        Huỷ đơn
      </Button>

      <ConfirmDialog
        open={openConfirm.value}
        onClose={openConfirm.onFalse}
        title="Xác nhận huỷ đơn hàng"
        content="Bạn có chắc muốn huỷ đơn hàng này không ( đơn hàng bị huỷ sẽ không được tính vào doanh thu ) ?"
        action={
          <Button variant="contained" color="error" onClick={handleCancelBill}>
            Xác nhận huỷ
          </Button>
        }
      />
    </>
  );
}
