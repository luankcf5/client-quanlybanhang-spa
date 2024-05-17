import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { updateBill } from 'src/api/bill';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { useSaleContext } from '../../context';
import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

type Props = {
  customerSelected: any;
};

const defaultInfo = {
  name: '',
  address: '',
  phone: '',
  fee: '',
};

export default function DeliveryInvoice({ customerSelected }: Props) {
  const popover = usePopover();

  const { selectedBill } = useSaleContext();

  const [deliveryInfo, setDeliveryInfo] = useState(defaultInfo);

  useEffect(() => {
    setDeliveryInfo({
      name: selectedBill?.name || customerSelected?.name || '',
      address: selectedBill?.address || customerSelected?.address || '',
      phone: selectedBill?.phone || customerSelected?.phone || '',
      fee: selectedBill?.fee || customerSelected?.fee || 0,
    });
  }, [customerSelected]);

  const handleChangeInfo = useCallback(
    (name: string, value: string) => {
      const currentInfo = { ...deliveryInfo };
      const newInfo = { ...currentInfo, [name]: value };
      setDeliveryInfo(newInfo);
    },
    [deliveryInfo, setDeliveryInfo]
  );

  const handleReset = useCallback(() => {
    setDeliveryInfo(defaultInfo);
    popover.onClose();
  }, [setDeliveryInfo, popover]);

  const handleAddDeliveryInfo = useCallback(() => {
    updateBill(selectedBill?.id, deliveryInfo);
    popover.onClose();
  }, [setDeliveryInfo, updateBill, selectedBill, popover]);

  return (
    <>
      <IconButtonAnimate onClick={popover.onOpen} disabled={!selectedBill}>
        <Badge variant="dot" color="error" invisible={!deliveryInfo.address}>
          <Iconify icon="iconamoon:delivery-fast-fill" />
        </Badge>
      </IconButtonAnimate>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="bottom-right">
        <Stack spacing={1} sx={{ padding: 1, width: 420 }}>
          <Typography variant="subtitle2">Thông tin giao hàng</Typography>

          <TextField
            multiline
            rows={3}
            size="small"
            placeholder="Địa chỉ nơi giao hàng..."
            value={deliveryInfo.address}
            onChange={(event) => handleChangeInfo('address', event.target.value)}
          />

          <TextField
            size="small"
            placeholder="Tên người nhận..."
            value={deliveryInfo.name}
            onChange={(event) => handleChangeInfo('name', event.target.value)}
          />

          <TextField
            size="small"
            placeholder="Số điện thoại người nhận..."
            value={deliveryInfo.phone}
            onChange={(event) => handleChangeInfo('phone', event.target.value)}
          />

          <TextField
            size="small"
            placeholder="Phí giao hàng..."
            value={deliveryInfo.fee}
            onChange={(event) => handleChangeInfo('fee', event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="body2">VNĐ</Typography>
                </InputAdornment>
              ),
            }}
          />

          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button
              size="small"
              color="error"
              onClick={handleReset}
              disabled={!deliveryInfo.address}
            >
              Huỷ giao hàng
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleAddDeliveryInfo}
              disabled={!deliveryInfo.address}
            >
              Xác nhận
            </Button>
          </Stack>
        </Stack>
      </CustomPopover>
    </>
  );
}
