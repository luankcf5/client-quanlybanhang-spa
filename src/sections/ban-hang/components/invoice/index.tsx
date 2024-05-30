import { sumBy } from 'lodash';
import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TextMaxLine from 'src/components/text-max-line';
import { varSlide, MotionContainer } from 'src/components/animate';

import NoteProduct from './note-product';
import NoteInvoice from './note-invoice';
import { useSaleContext } from '../../context';
import VoucherInvoice from './voucher-invoice';
import CustomerInvoice from './customer-invoice';
import IconButtonAnimate from './icon-button-animate';
import IncrementerButton from '../../common/incrementer-button';

// ----------------------------------------------------------------------

export default function Invoice() {
  const { products, selectedBill, onChangeQuantity, onRemoveProduct } = useSaleContext();

  const [discountPrice, setDiscountPrice] = useState(0);

  const [customerSelected, setCustomerSelected] = useState<any>(null);

  return (
    <Stack justifyContent="space-between" sx={{ position: 'relative' }}>
      {selectedBill?.statusId === 2 && (
        <Stack
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 9999,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.68),
          }}
        >
          <Iconify width={40} icon="ic:round-lock" />
          <Typography variant="body2">Hoá đơn này đã thanh toán</Typography>
        </Stack>
      )}

      {selectedBill?.statusId === 3 && (
        <Stack
          spacing={1}
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 9999,
            bgcolor: (theme) => alpha(theme.palette.background.paper, 0.68),
          }}
        >
          <Iconify width={40} icon="ic:round-lock" />
          <Typography variant="body2">Hoá đơn này đã bị huỷ</Typography>
        </Stack>
      )}

      <Scrollbar
        sx={{ height: 'calc(100vh - 232px)', backgroundColor: (theme) => theme.palette.grey[100] }}
      >
        <Stack
          component={MotionContainer}
          variants={varSlide().inDown}
          spacing={1}
          sx={{ padding: 1, height: '100%' }}
        >
          {products.map((product: any) => (
            <Card key={product.product.id} sx={{ padding: 0.75 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar
                    variant="square"
                    src={product.product?.image}
                    sx={{ borderRadius: 0.5 }}
                  />

                  <Stack>
                    <TextMaxLine variant="body2" line={1}>
                      {product.product.name}
                    </TextMaxLine>

                    <TextMaxLine
                      variant="caption"
                      line={1}
                      color={product.product.discount > 0 ? 'error' : 'primary'}
                    >
                      {`${fCurrency(product.product.price - product.product.discount)} x${
                        product.amount
                      } = ${fCurrency(
                        (product.product.price - product.product.discount) * product.amount
                      )}`}
                    </TextMaxLine>
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <IncrementerButton
                    name="amount"
                    quantity={product.amount}
                    disabledDecrease={product.amount <= 1}
                    disabledIncrease={product.amount >= 99}
                    onIncrease={() => onChangeQuantity(product.product.id, product.amount + 1)}
                    onDecrease={() => onChangeQuantity(product.product.id, product.amount - 1)}
                  />

                  <Stack direction="row">
                    <NoteProduct productId={product.product.id} note={product.note} />

                    <IconButtonAnimate
                      color="error"
                      onClick={() => onRemoveProduct(product.product.id)}
                    >
                      <Iconify icon="material-symbols:delete" />
                    </IconButtonAnimate>
                  </Stack>
                </Stack>
              </Stack>

              {product.note && (
                <Typography variant="caption" fontStyle="italic">
                  <strong>Kỹ thuật viên: </strong> {product.note}
                </Typography>
              )}
            </Card>
          ))}
        </Stack>
      </Scrollbar>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" fontWeight="bold">
            Tổng tiền:{' '}
            {fCurrency(
              sumBy(
                products,
                (prod: any) => prod.amount * (prod.product.price - prod.product.discount)
              ) - discountPrice
            ) || '0đ'}
          </Typography>

          {discountPrice > 0 && (
            <Typography variant="subtitle2" color="error">
              ( - {fCurrency(discountPrice || 0)} )
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={0.5}>
          {/* <DeliveryInvoice customerSelected={customerSelected} /> */}

          <VoucherInvoice
            discountPrice={discountPrice}
            setDiscountPrice={setDiscountPrice}
            customerSelected={customerSelected}
          />

          <NoteInvoice />

          <CustomerInvoice
            customerSelected={customerSelected}
            setCustomerSelected={setCustomerSelected}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
