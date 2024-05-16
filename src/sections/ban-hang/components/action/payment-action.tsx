import { sumBy } from 'lodash';
import React, { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TextMaxLine from 'src/components/text-max-line';

import PrintInvoice from './print-invoice';
import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

export default function PaymentAction() {
  const { selectedBill, products } = useSaleContext();

  const confirmAction = useBoolean();

  const openPrint = useBoolean();

  const totalPrice = sumBy(
    products,
    (prod: any) => prod.amount * (prod.product.price - prod.product.discount)
  );

  const handleOpenPrint = useCallback(() => {
    openPrint.onTrue();
  }, []);
  return (
    <>
      <Button variant="contained" size="small" color="primary" onClick={confirmAction.onTrue}>
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
              md: 630,
            },
          }}
        >
          <Grid container spacing={1}>
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" align="right">
                  {fDateTime(selectedBill?.createdAt)}
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
                Hoá đơn số {selectedBill?.id}
              </Typography>
            </Grid>

            <Grid xs={12}>
              <Typography variant="body2">
                Khách hàng : <strong>{selectedBill?.customer?.name || 'Khách hàng'}</strong>
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
                  height: 'calc(100vh - 420px)',
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
                  </Grid>
                ))}
              </Scrollbar>
            </Grid>

            <Grid xs={6} />

            <Grid xs={6}>
              <Divider sx={{ borderStyle: 'dashed' }} />
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2">Giảm giá :</Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2" align="right" color="error.main">
                30%
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2">Sử dụng điểm :</Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2" align="right" color="error.main">
                -1000 điểm
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2">Giao hàng :</Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2" align="right" color="error.main">
                <Typography>-{fCurrency(20000)}</Typography>
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2">Tích điểm từ đơn hàng :</Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2" align="right">
                {totalPrice / 100} điểm
              </Typography>
            </Grid>

            <Grid xs={6}>
              <Typography variant="body2">Tổng tiền:</Typography>
            </Grid>

            <Grid xs={6}>
              <Typography align="right">
                <Typography variant="h6">{fCurrency(totalPrice) || '0đ'}</Typography>
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
        invoice={selectedBill}
        products={products}
        open={openPrint.value}
        onClose={openPrint.onFalse}
      />
    </>
  );
}
