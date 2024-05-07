import React from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import Action from '../action';
import ProductList from './product-list';
import ProductHeader from './product-header';

// ----------------------------------------------------------------------

export default function ProductContainer() {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <Stack>
        <ProductHeader />
        <ProductList />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Action />
      </Stack>
    </Card>
  );
}
