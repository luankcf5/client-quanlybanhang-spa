import React, { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { useGetProducts } from 'src/api/product';
import { useGetCategories } from 'src/api/category';

import { IProduct } from 'src/types/product';

import Action from '../action';
import ProductList from './product-list';
import ProductHeader from './product-header';

// ----------------------------------------------------------------------

export default function ProductContainer() {
  const { products } = useGetProducts();

  const { categories } = useGetCategories();

  const [filterName, setFilterName] = useState('');

  const [filterCategory, setFilterCategory] = useState<string[]>([]);

  const productData = applyFilter({
    inputData: products,
    filterName,
    filterCategory,
  });

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
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
