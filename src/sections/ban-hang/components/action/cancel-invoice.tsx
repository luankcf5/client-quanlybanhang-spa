import { useSnackbar } from 'notistack';
import React, { useCallback } from 'react';

import Button from '@mui/material/Button';

import { useBoolean } from 'src/hooks/use-boolean';

import { updateBill } from 'src/api/bill';

import { ConfirmDialog } from 'src/components/custom-dialog';

import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

export default function CancelInvoice() {
  const { selectedBill } = useSaleContext();

  const openConfirm = useBoolean();

  const { onGetBill } = useSaleContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleCancelBill = useCallback(() => {
    updateBill(selectedBill?.id, {
      statusId: 3,
    });
    onGetBill(null);
    openConfirm.onFalse();
    enqueueSnackbar('Huỷ đơn hàng thành công !');
  }, [selectedBill, openConfirm, updateBill, onGetBill, enqueueSnackbar]);
  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={openConfirm.onTrue}
        disabled={selectedBill?.statusId !== 2}
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
