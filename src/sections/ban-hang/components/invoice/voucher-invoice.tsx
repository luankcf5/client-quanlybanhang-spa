import React, { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
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

import { fCurrency } from 'src/utils/format-number';

import { _customers } from 'src/_mock/_customers';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

export default function VoucherInvoice() {
  const popover = usePopover();

  const [tabView, setTabView] = useState('1');

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabView(newValue);
  };

  const [voucher, setVoucher] = useState('');
  const [discountPrice, setDiscoutPrice] = useState(0);
  const [customerPoint, setCustomerPoint] = useState(0);
  const [customerSubPoint, setCustomerSubPoint] = useState(0);

  const handleReset = useCallback(() => {
    setVoucher('');
    popover.onClose();
  }, [setVoucher, popover]);

  return (
    <>
      <IconButtonAnimate onClick={popover.onOpen}>
        <Badge variant="dot" color="error" invisible={!voucher}>
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
            <>
              <TextField
                size="small"
                placeholder="Mã giảm giá..."
                value={voucher}
                onChange={(event) => setVoucher(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Iconify icon="mdi:voucher" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button color="primary" sx={{ width: 'max-content' }}>
                Kiểm tra mã giảm giá
              </Button>
            </>
          )}

          {tabView === '2' && (
            <>
              <Typography variant="body2">Nhập số tiền giảm trực tiếp:</Typography>

              <TextField
                size="small"
                placeholder="Nhập số tiền giảm trực tiếp..."
                value={discountPrice}
                type="number"
                onChange={(event) => setDiscoutPrice(Number(event.target.value))}
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
              <FormControl fullWidth>
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
                      onClick={() => setCustomerPoint(Number(customer.point))}
                    >
                      {customer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="body2">
                Điểm tích luỹ hiện tại : <strong>{customerPoint} điểm</strong>
              </Typography>

              <Typography variant="body2">Nhập số điểm tích luỹ muốn trừ</Typography>

              <TextField
                size="small"
                placeholder="Nhập số điểm tích luỹ muốn trừ..."
                value={customerSubPoint}
                type="number"
                onChange={(event) => setCustomerSubPoint(Number(event.target.value))}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography variant="subtitle2">
                        = {fCurrency(customerSubPoint) || '0đ'}
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                error={customerSubPoint > customerPoint}
                helperText={
                  customerSubPoint > customerPoint ? 'Số điểm trừ vượt quá điểm tích luỹ !!' : null
                }
              />
            </>
          )}

          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button size="small" color="error" onClick={handleReset} disabled={!voucher}>
              Huỷ giảm giá
            </Button>

            <Button size="small" variant="contained" color="primary" disabled={!voucher}>
              Áp dụng
            </Button>
          </Stack>
        </Stack>
      </CustomPopover>
    </>
  );
}
