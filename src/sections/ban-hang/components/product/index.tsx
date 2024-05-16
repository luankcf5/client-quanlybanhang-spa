import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useGetProducts } from 'src/api/product';
import { useGetCategories } from 'src/api/category';

import Iconify from 'src/components/iconify';

import { IProduct } from 'src/types/product';

import Action from '../action';
import ProductList from './product-list';
import ProductHeader from './product-header';
import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

export default function ProductContainer() {
  const { products } = useGetProducts();

  const { selectedBill } = useSaleContext();

  const { categories } = useGetCategories();

  const [filterName, setFilterName] = useState('');

  const [filterCategory, setFilterCategory] = useState<string[]>([]);

  const productData = applyFilter({
    inputData: products,
    filterName,
    filterCategory,
  });

  return (
    <Card sx={{ height: '100%', width: '100%', position: 'relative' }}>
      {!selectedBill && (
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
          <Typography variant="body2">Bạn chưa chọn hoá đơn</Typography>
        </Stack>
      )}
      <Stack sx={{ height: '100%' }}>
        <ProductHeader
          categories={categories}
          filterName={filterName}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          setFilterName={setFilterName}
        />
        <ProductList products={productData} />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Action />
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filterName,
  filterCategory,
}: {
  inputData: IProduct[];
  filterName: string;
  filterCategory: string[];
}) {
  if (filterName) {
    inputData = inputData.filter(
      (data) => data?.name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }
  if (filterCategory.length) {
    inputData = inputData.filter((data) => filterCategory.includes(data.category.name));
  }

  return inputData;
}
