import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TextMaxLine from 'src/components/text-max-line';

import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

type Props = {
  products: any;
};

export default function ProductList({ products }: Props) {
  const { selectedBill, onAddProduct } = useSaleContext();

  return (
    <Scrollbar sx={{ height: 'calc(100vh - 280px)', position: 'relative' }}>
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
      <Box
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}
        gap={1}
      >
        {products.map((product: any) => (
          <CardActionArea key={product.id} onClick={() => onAddProduct(product)}>
            <Card sx={{ padding: 0.75 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar variant="square" src={product.image} sx={{ borderRadius: 0.5 }} />
                <Stack>
                  <TextMaxLine variant="body2" line={1}>
                    {product.name}
                  </TextMaxLine>

                  <Stack direction="row" spacing={0.5}>
                    <TextMaxLine
                      line={1}
                      color="primary"
                      variant="caption"
                      sx={{ textDecoration: product.discount > 0 ? 'line-through' : 'unset' }}
                    >
                      {fCurrency(product.price)}
                    </TextMaxLine>

                    {product.discount > 0 && (
                      <TextMaxLine line={1} color="error" variant="caption">
                        {fCurrency(product.price - product.discount)}
                      </TextMaxLine>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </CardActionArea>
        ))}
      </Box>
    </Scrollbar>
  );
}
