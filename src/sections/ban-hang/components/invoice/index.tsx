import React from 'react';
import { sumBy } from 'lodash';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
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
import DeliveryInvoice from './delivery-invoice';
import IconButtonAnimate from './icon-button-animate';
import IncrementerButton from '../../common/incrementer-button';

// ----------------------------------------------------------------------

export default function Invoice() {
  const { products, onChangeQuantity, onRemoveProduct } = useSaleContext();

  return (
    <Stack justifyContent="space-between">
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
            <Card key={product.id} sx={{ padding: 0.75 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar variant="square" src={product.image} sx={{ borderRadius: 0.5 }} />

                  <Stack>
                    <TextMaxLine variant="body2" line={1}>
                      {product.name}
                    </TextMaxLine>

                    <TextMaxLine variant="caption" line={1} color="primary">
                      {`${fCurrency(product.price)} x${product.quantity} = ${fCurrency(
                        product.price * product.quantity
                      )}`}
                    </TextMaxLine>
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <IncrementerButton
                    name="quantity"
                    quantity={product.quantity}
                    disabledDecrease={product.quantity <= 1}
                    disabledIncrease={product.quantity >= 99}
                    onIncrease={() => onChangeQuantity(product.id, product.quantity + 1)}
                    onDecrease={() => onChangeQuantity(product.id, product.quantity - 1)}
                  />

                  <Stack direction="row">
                    <NoteProduct productId={product.id} note={product.note} />

                    <IconButtonAnimate color="error" onClick={() => onRemoveProduct(product.id)}>
                      <Iconify icon="material-symbols:delete" />
                    </IconButtonAnimate>
                  </Stack>
                </Stack>
              </Stack>

              {product.note && (
                <Typography variant="caption" fontStyle="italic">
                  <strong>Ghi chú: </strong> {product.note}
                </Typography>
              )}
            </Card>
          ))}
        </Stack>
      </Scrollbar>

      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 1 }}>
        <Typography variant="subtitle2" fontWeight="bold">
          Tổng tiền: {fCurrency(sumBy(products, (prod: any) => prod.quantity * prod.price)) || '0đ'}
        </Typography>

        <Stack direction="row" spacing={0.5}>
          <DeliveryInvoice />

          <VoucherInvoice />

          <NoteInvoice />

          <IconButtonAnimate>
            <Iconify icon="raphael:customer" />
          </IconButtonAnimate>
        </Stack>
      </Stack>
    </Stack>
  );
}
