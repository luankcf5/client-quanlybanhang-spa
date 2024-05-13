'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';
import { useGetCategories } from 'src/api/category';

import Form from './form';
import { mapper } from './functions';
import MultiForm from './multi-form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhMucSanPham() {
  const { categories } = useGetCategories();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: mapper(categories),
      table_column: baseColumns,
      table_selected: [],
      table_export_data: categories.map((category) => ({
        id: category.id,
        'Tên danh mục': category.name,
      })),
      table_config: {
        table_name: 'categories',
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
  }, [categories]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
      <MultiForm />
    </RoleBasedGuard>
  );
}
