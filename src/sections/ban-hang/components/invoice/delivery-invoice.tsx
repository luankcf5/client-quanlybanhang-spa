import React, { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import { _customers } from 'src/_mock/_customers';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

const defaultInfo = {
  name: '',
  address: '',
  phoneNumber: '',
  deliveryFee: '',
};

export default function DeliveryInvoice() {
  const popover = usePopover();

  const [deliveryInfo, setDeliveryInfo] = useState(defaultInfo);

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
    popover.onClose();
  }, [setDeliveryInfo, popover]);

  return (
    <>
      <IconButtonAnimate onClick={popover.onOpen}>
        <Badge variant="dot" color="error" invisible={!deliveryInfo.address}>
          <Iconify icon="iconamoon:delivery-fast-fill" />
        </Badge>
      </IconButtonAnimate>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="bottom-right">
        <Stack spacing={1} sx={{ padding: 1, width: 420 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle2">Thông tin giao hàng</Typography>

            <FormControl sx={{ width: 220 }}>
              <InputLabel size="small">Lựa chọn khách hàng</InputLabel>
              <Select
                size="small"
                label="Lựa chọn khách hàng"
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 320,
                    },
                  },
                }}
              >
                {_customers.map((customer) => (
                  <MenuItem
                    key={customer.id}
                    value={customer.id}
                    onClick={() =>
                      setDeliveryInfo({
                        name: customer.name,
                        address: customer.address,
                        phoneNumber: customer.phoneNumber,
                        deliveryFee: '',
                      })
                    }
                  >
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
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
            value={deliveryInfo.phoneNumber}
            onChange={(event) => handleChangeInfo('phoneNumber', event.target.value)}
          />

          <TextField
            size="small"
            placeholder="Phí giao hàng..."
            value={deliveryInfo.deliveryFee}
            onChange={(event) => handleChangeInfo('deliveryFee', event.target.value)}
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
