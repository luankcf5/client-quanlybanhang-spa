import { sumBy } from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { fCurrency } from 'src/utils/format-number';

import { updateBill } from 'src/api/bill';
import { useGetVouchers } from 'src/api/voucher';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { ICustomer } from 'src/types/customer';

import { useSaleContext } from '../../context';
import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

type Props = {
  discountPrice: number;
  customerSelected: ICustomer | null;
  setDiscountPrice: (price: number) => void;
};

export default function VoucherInvoice({
  discountPrice,
  customerSelected,
  setDiscountPrice,
}: Props) {
  const popover = usePopover();

  const { vouchers } = useGetVouchers();

  const [tabView, setTabView] = useState('1');

  const { products, selectedBill } = useSaleContext();

  const totalPrice = sumBy(
    products,
    (prod: any) => prod.amount * (prod.product.price - prod.product.discount)
  );

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabView(newValue);
  };

  const [voucher, setVoucher] = useState<any>(null);

  const [customerSubPoint, setCustomerSubPoint] = useState(0);

  useEffect(() => {
    setVoucher(selectedBill?.voucher);
    setDiscountPrice(selectedBill?.discountPrice || 0);
  }, [selectedBill]);

  const handleReset = useCallback(() => {
    setVoucher(null);
    setDiscountPrice(0);
    popover.onClose();
    updateBill(selectedBill?.id, {
      voucherId: null,
      discountPrice: 0,
    });
  }, [setVoucher, popover, updateBill, selectedBill]);

  const handleAddVoucher = useCallback(
    (value: any, reason: any) => {
      if (value) {
        setVoucher(value);
        setDiscountPrice(value?.price ? value.price : totalPrice * (value.percent / 100));
      }
      if (reason === 'clear') {
        setVoucher(null);
        setDiscountPrice(0);
      }
    },
    [setVoucher, voucher, totalPrice, setDiscountPrice]
  );

  const handleChangeDiscountPrice = useCallback(
    (event: any) => {
      setVoucher(null);
      setDiscountPrice(Number(event.target.value));
    },
    [setDiscountPrice]
  );

  const handleChangeCustomerSubPoint = useCallback(
    (event: any) => {
      setCustomerSubPoint(Number(event.target.value));
      setDiscountPrice(Number(event.target.value));
    },
    [setCustomerSubPoint, setDiscountPrice]
  );

  const handleAddDiscount = useCallback(() => {
    if (voucher) {
      updateBill(selectedBill?.id, {
        voucherId: voucher.id,
        discountPrice: voucher?.price ? voucher.price : totalPrice * (voucher.percent / 100),
      });
    } else {
      updateBill(selectedBill?.id, {
        voucherId: null,
        discountPrice: Number(customerSelected?.point) > 0 ? customerSubPoint : discountPrice,
      });
    }
    popover.onClose();
  }, [voucher, updateBill, selectedBill, popover, customerSelected]);

  return (
    <>
      <IconButtonAnimate onClick={popover.onOpen} disabled>
        <Badge variant="dot" color="error" invisible={discountPrice <= 0}>
          <Iconify icon="mdi:voucher" />
        </Badge>
      </IconButtonAnimate>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="bottom-right">
        <Stack spacing={1} sx={{ padding: 1, width: 420 }}>
          <Typography variant="subtitle2">Thông tin giảm giá</Typography>

          <Tabs value={tabView} onChange={handleChangeTab} variant="fullWidth" sx={{ mb: 0.5 }}>
            <Tab label="Mã giảm giá" value="1" />
            <Tab label="Giảm trực tiếp" value="2" />
            <Tab label="Trừ tích điểm" value="3" />
          </Tabs>

          {tabView === '1' && (
            <Autocomplete
              size="small"
              options={vouchers}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Tìm kiếm mã giảm giá..."
                  margin="none"
                />
              )}
              value={voucher}
              onChange={(event, value, reason) => handleAddVoucher(value, reason)}
              renderOption={renderOption}
            />
          )}

          {tabView === '2' && (
            <>
              <Typography variant="body2">Nhập số tiền giảm trực tiếp:</Typography>

              <TextField
                size="small"
                placeholder="Nhập số tiền giảm trực tiếp..."
                value={discountPrice}
                type="number"
                onChange={(event) => handleChangeDiscountPrice(event)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="subtitle2">VNĐ</Typography>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}

          {tabView === '3' && (
            <>
              {!customerSelected ? (
                <Typography variant="subtitle2">Chưa chọn khách hàng tích điểm !</Typography>
              ) : (
                <Stack>
                  <Typography variant="body2">
                    Khách hàng : <strong>{customerSelected?.name}</strong>
                  </Typography>

                  <Typography variant="body2">
                    Điểm tích luỹ hiện tại : <strong>{Number(customerSelected?.point)} điểm</strong>
                  </Typography>
                </Stack>
              )}

              <Typography variant="body2">Nhập số điểm tích luỹ muốn trừ</Typography>

              <TextField
                disabled={!customerSelected}
                size="small"
                placeholder="Nhập số điểm tích luỹ muốn trừ..."
                value={customerSubPoint}
                type="number"
                onChange={(event) => handleChangeCustomerSubPoint(event)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="subtitle2">
                        = {fCurrency(customerSubPoint) || '0đ'}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                error={customerSubPoint > Number(customerSelected?.point)}
                helperText={
                  customerSubPoint > Number(customerSelected?.point)
                    ? 'Số điểm trừ vượt quá điểm tích luỹ !!'
                    : null
                }
              />
            </>
          )}

          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button size="small" color="error" onClick={handleReset} disabled={discountPrice <= 0}>
              Huỷ giảm giá
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              disabled={discountPrice <= 0}
              onClick={handleAddDiscount}
            >
              Áp dụng
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
    <Stack>
      <Typography variant="subtitle2" color="textPrimary">
        {option.name}
      </Typography>

      <Typography variant="caption">
        Giảm {option.price ? fCurrency(option.price) : `${option.percent}%`}
      </Typography>
    </Stack>
  </Box>
);
