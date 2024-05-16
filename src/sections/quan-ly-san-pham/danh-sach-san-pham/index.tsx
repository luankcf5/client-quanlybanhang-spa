'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { RoleBasedGuard } from 'src/auth/guard';
import { useGetProducts } from 'src/api/product';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachSanPham() {
  const { products } = useGetProducts();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: products,
      table_column: baseColumns,
      table_selected: [],
      table_export_data: products.map((product) => ({
        id: product.id,
        'Tên sản phẩm': product.name,
      })),
      table_config: {
        table_name: 'products',
        add_data: true,
        add_multi_data: false,
        export_data: true,
        selected_data: true,
        delete_multi: true,
        change_status_multi: false,
        active_row: false,
        edit_row: true,
        delete_row: true,
      },
    });
  }, [products]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
    </RoleBasedGuard>
  );
}
