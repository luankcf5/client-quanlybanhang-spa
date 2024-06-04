import axios from 'axios';
import { sumBy } from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { updateCustomer } from 'src/api/customer';
import { getBill, updateBill } from 'src/api/bill';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TextMaxLine from 'src/components/text-max-line';

import { IBill } from 'src/types/bill';

import PrintInvoice from './print-invoice';
import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

export default function PaymentAction() {
  const { selectedBill, products, onGetBill } = useSaleContext();

  const [bill, setBill] = useState<IBill | null>(null);

  const confirmAction = useBoolean();

  const openPrint = useBoolean();

  const totalPrice = sumBy(
    products,
    (prod: any) => prod.amount * (prod.product.price - prod.product.discount)
  );

  const [moneyPay, setMoneyPay] = useState(0);

  useEffect(() => {
    setMoneyPay(totalPrice - Number(bill?.discountPrice));
  }, [totalPrice, bill]);

  const handleTelegramNotification = useCallback(async () => {
    const CHANNEL_ID = '@phanmembanhangspa';
    const TELEGRAM_BOT_TOKEN = '7041679216:AAHca7dv6I9pQLi_nS0UdjYrF3jrRw9U1Qs';
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
      await axios.post(TELEGRAM_API_URL, {
        chat_id: CHANNEL_ID,
        text: `ĐƠN HÀNG THANH TOÁN THÀNH CÔNG\nMã số đơn hàng: Đơn hàng số ${bill?.id}\n${products.map(
          (product: any, index) =>
            `${index + 1}. ${product.product.name} x ${product.amount} = ${fCurrency(
              (product.product.price - product.product.discount) * product.amount
            )}\n`
        )}Kỹ thuật viên: ${bill?.note || 'Không có'}\nTổng tiền: ${fCurrency(
          totalPrice
        )}\nGiảm giá: ${fCurrency(bill?.discountPrice || 0)}\nThành tiền: ${fCurrency(
          totalPrice - (bill?.discountPrice || 0)
        )}\nTên khách hàng: ${bill?.customer?.name || 'Khách hàng'}\nSố điện thoại: ${
          bill?.customer?.phone || 'Không có'
        }\nĐịa chỉ: ${bill?.customer?.address || 'Không có'}\nNơi giao hàng: ${
          bill?.address || 'Không có'
        }\nSố điện thoại người nhận: ${bill?.phone || 'Không có'}\nNgười nhận hàng: ${
          bill?.address || 'Không có'
        }\nPhí giao hàng: ${fCurrency(bill?.fee || 0)}`,
      });
    } catch (error) {
      console.log(error);
    }
  }, [bill, products]);

  const handlePayment = useCallback(async () => {
    const currentBill = await getBill(selectedBill?.id);
    setBill(currentBill);
    confirmAction.onTrue();
  }, [getBill, selectedBill, setBill, confirmAction]);

  const handleOpenPrint = useCallback(() => {
    openPrint.onTrue();
    updateBill(bill?.id, {
      statusId: 2,
      roomId: null,
    });
    if (bill?.customer) {
      updateCustomer(bill?.customer.id, {
        point: bill.customer.point + Math.round(totalPrice / 100),
      });
    }
    handleTelegramNotification();
  }, [
    totalPrice,
    openPrint,
    selectedBill,
    getBill,
    updateBill,
    updateCustomer,
    handleTelegramNotification,
  ]);

  const handlePrintClose = useCallback(() => {
    confirmAction.onFalse();
    openPrint.onFalse();
    onGetBill(null);
  }, [confirmAction, openPrint, onGetBill]);

  console.log(moneyPay - (totalPrice - Number(bill?.discountPrice)));

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handlePayment}
        disabled={selectedBill?.statusId !== 1 || products.length === 0}
      >
        Thanh toán
      </Button>

      <Drawer open={confirmAction.value} onClose={confirmAction.onFalse} anchor="right">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{
            paddingY: 2,
            paddingX: 3,
            height: '100%',
            width: {
              xs: 320,
              md: 550,
            },
          }}
        >
          <Grid container spacing={1}>
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" align="right">
                  {fDateTime(bill?.createdAt)}
                </Typography>

                <IconButton onClick={confirmAction.onFalse}>
                  <Iconify icon="ep:close-bold" />
                </IconButton>
              </Stack>
            </Grid>

            <Grid xs={12}>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </Grid>

            <Grid xs={12}>
              <Typography variant="h6" textTransform="uppercase" textAlign="center" sx={{ py: 1 }}>
                Hoá đơn số {bill?.id}
              </Typography>
            </Grid>

            <Grid xs={12}>
              <Typography variant="body2">
                Khách hàng : <strong>{bill?.customer?.name || 'Khách hàng'}</strong>
              </Typography>
            </Grid>

            <Grid xs={12}>
              <Stack direction="row">
                <Typography variant="subtitle2" sx={{ width: '25%' }}>
                  Tên mặt hàng
                </Typography>
                <Typography variant="subtitle2" sx={{ width: '25%' }}>
                  Số lượng
                </Typography>
                <Typography variant="subtitle2" sx={{ width: '25%' }}>
                  Đơn giá
                </Typography>
                <Typography variant="subtitle2" sx={{ width: '25%' }}>
                  Thành tiền
                </Typography>
              </Stack>
              <Scrollbar
                sx={{
                  height: 'calc(100vh - 400px)',
                }}
              >
                {products.map((product: any, index: number) => (
                  <Grid xs={12}>
                    <Stack direction="row">
                      <TextMaxLine variant="body2" line={1} sx={{ width: '25%' }}>
                        {index + 1}. {product.product.name}
                      </TextMaxLine>

                      <TextMaxLine variant="body2" line={1} sx={{ width: '25%' }}>
                        {product.amount}
                      </TextMaxLine>

                      <TextMaxLine variant="body2" line={1} sx={{ width: '25%' }}>
                        {fCurrency(product.product.price)}
                      </TextMaxLine>

                      <TextMaxLine variant="body2" line={1} sx={{ width: '25%' }}>
                        {fCurrency(Number(product.product.price) * Number(product.amount))}
                      </TextMaxLine>
                    </Stack>

                    {product.note && (
                      <Typography variant="caption">Kỹ thuật viên : {product.note}</Typography>
                    )}
                  </Grid>
                ))}
              </Scrollbar>
            </Grid>

            <Grid xs={6} />

            <Grid xs={6}>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </Grid>

            {bill?.note && (
              <>
                <Grid xs={6}>
                  <Typography variant="body2">Kỹ thuật viên :</Typography>
                </Grid>
                <Grid xs={6}>
                  <Typography variant="body2" align="right">
                    {bill?.note}
                  </Typography>
                </Grid>
              </>
            )}

            <Grid xs={6}>
              <Typography variant="body2">Giảm giá :</Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2" align="right">
                {fCurrency(Number(bill?.discountPrice)) || '0đ'}
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2">Tổng tiền:</Typography>
            </Grid>

            <Grid xs={6}>
              <Typography align="right">
                <Typography variant="h6">
                  {fCurrency(totalPrice - Number(bill?.discountPrice)) || '0đ'}
                </Typography>
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2">Tiền khách đưa :</Typography>
            </Grid>

            <Grid xs={6}>
              <TextField
                fullWidth
                size="small"
                value={moneyPay}
                onChange={(event) => setMoneyPay(Number(event.target.value))}
              />
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2">Tiền thối :</Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2" align="right">
                {fCurrency(Number(moneyPay - (totalPrice - Number(bill?.discountPrice)))) || '0đ'}
              </Typography>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleOpenPrint}
          >
            Xác nhận thanh toán
          </Button>
        </Stack>
      </Drawer>

      <PrintInvoice
        title="HOÁ ĐƠN THANH TOÁN"
        invoice={bill}
        products={products}
        open={openPrint.value}
        onClose={handlePrintClose}
        moneyPay={moneyPay}
      />
    </>
  );
}
