import { sumBy } from 'lodash';
import React, { useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import { updateBill } from 'src/api/bill';
import { useGetCustomers } from 'src/api/customer';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { ICustomer } from 'src/types/customer';

import { useSaleContext } from '../../context';
import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

type Props = {
  customerSelected: ICustomer | null;
  setCustomerSelected: (customer: ICustomer | null | undefined) => void;
};

export default function CustomerInvoice({ customerSelected, setCustomerSelected }: Props) {
  const popover = usePopover();

  const { customers } = useGetCustomers();

  const { products, selectedBill } = useSaleContext();

  useEffect(() => {
    setCustomerSelected(selectedBill?.customer);
  }, [selectedBill]);

  const totalPrice = sumBy(
    products,
    (prod: any) => prod.amount * (prod.product.price - prod.product.discount)
  );

  const handleReset = useCallback(() => {
    setCustomerSelected(null);
    popover.onClose();
    updateBill(selectedBill?.id, {
      customerId: null,
    });
  }, [setCustomerSelected, popover, updateBill, selectedBill]);

  const handleAddCustomer = useCallback(() => {
    popover.onClose();
    updateBill(selectedBill?.id, {
      customerId: customerSelected?.id,
    });
  }, [popover, updateBill, selectedBill, customerSelected]);

  const handleAddNewSalesProduct = useCallback(
    (value: any, reason: any) => {
      if (value) {
        setCustomerSelected(value);
      }
      if (reason === 'clear') {
        setCustomerSelected(null);
      }
    },
    [setCustomerSelected]
  );

  return (
    <>
      <IconButtonAnimate onClick={popover.onOpen} disabled={!selectedBill}>
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
            value={customerSelected}
            onChange={(event, value, reason) => handleAddNewSalesProduct(value, reason)}
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
            <strong>Tổng điểm tích luỹ :</strong> {`${customerSelected?.point || 0} điểm`}
          </Typography>

          <Typography variant="body2">
            <strong>Tích điểm từ đơn hàng :</strong> {`${Math.round(totalPrice / 100)} điểm`}
          </Typography>

          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button size="small" color="error" onClick={handleReset} disabled={!customerSelected}>
              Huỷ khách hàng
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleAddCustomer}
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
