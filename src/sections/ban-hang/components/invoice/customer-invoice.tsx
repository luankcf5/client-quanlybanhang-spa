import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import { useGetCustomers } from 'src/api/customer';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { ICustomer } from 'src/types/customer';

import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

export default function CustomerInvoice() {
  const popover = usePopover();

  const { customers } = useGetCustomers();

  const [customerSelected, setCustomerSelected] = useState<ICustomer | null>(null);

  const handleReset = useCallback(() => {
    setCustomerSelected(null);
    popover.onClose();
  }, [setCustomerSelected, popover]);

  const handleAddNote = useCallback(() => {
    popover.onClose();
  }, [setCustomerSelected, popover]);

  const handleAddNewSalesProduct = useCallback(
    (value: any) => {
      if (value) {
        setCustomerSelected(value);
      }
    },
    [setCustomerSelected]
  );

  return (
    <>
      <IconButtonAnimate onClick={popover.onOpen}>
        <Badge variant="dot" color="error" invisible={!customerSelected}>
          <Iconify icon="raphael:customer" />
        </Badge>
      </IconButtonAnimate>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="bottom-right">
        <Stack spacing={1} sx={{ padding: 1, width: 420 }}>
          <Autocomplete
            size="small"
            options={customers}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder="Tìm kiếm khách hàng..."
                margin="none"
              />
            )}
            onChange={(event, value) => handleAddNewSalesProduct(value)}
            renderOption={renderOption}
          />

          <Typography variant="body2">
            <strong>Thông tin khách hàng cho hoá đơn</strong>
          </Typography>

          <Typography variant="body2">
            <strong>Họ và tên :</strong> {customerSelected?.name || 'Chưa có'}
          </Typography>

          <Typography variant="body2">
            <strong>Số điện thoại :</strong> {customerSelected?.phone || 'Chưa có'}
          </Typography>

          <Typography variant="body2">
            <strong>Địa chỉ :</strong> {customerSelected?.address || 'Chưa có'}
          </Typography>

          <Typography variant="body2">
            <strong>Điểm tích luỹ :</strong> {`${customerSelected?.point || 0} điểm`}
          </Typography>

          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button size="small" color="error" onClick={handleReset} disabled={!customerSelected}>
              Huỷ
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleAddNote}
              disabled={!customerSelected}
            >
              Xác nhận
            </Button>
          </Stack>
        </Stack>
      </CustomPopover>
    </>
  );
}

// ----------------------------------------------------------------------

const renderOption = (props: any, option: any, { selected }: any) => (
  <Box component="li" {...props}>
    <Avatar variant="square" src={option.name} sx={{ borderRadius: 0.5, mr: 1.5 }} />

    <Stack>
      <Typography variant="subtitle2" color="textPrimary">
        {option.name}
      </Typography>

      <Typography variant="caption">{option.phone}</Typography>
    </Stack>
  </Box>
);
