import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import CardActionArea from '@mui/material/CardActionArea';

import { fCurrency } from 'src/utils/format-number';

import { _product } from 'src/_mock/_products';

import Scrollbar from 'src/components/scrollbar';
import TextMaxLine from 'src/components/text-max-line';

import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

export default function ProductList() {
  const { onAddProduct } = useSaleContext();

  return (
    <Scrollbar sx={{ maxHeight: 'calc(100vh - 280px)' }}>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}
        gap={1}
      >
        {_product.map((product) => (
          <CardActionArea key={product.id} onClick={() => onAddProduct(product)}>
            <Card sx={{ padding: 0.75 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar variant="square" src={product.image} sx={{ borderRadius: 0.5 }} />
                <Stack>
                  <TextMaxLine variant="body2" line={1}>
                    {product.name}
                  </TextMaxLine>

                  <TextMaxLine variant="caption" line={1} color="primary">
                    {fCurrency(product.price)}
                  </TextMaxLine>
                </Stack>
              </Stack>
            </Card>
          </CardActionArea>
        ))}
      </Box>
    </Scrollbar>
  );
}
