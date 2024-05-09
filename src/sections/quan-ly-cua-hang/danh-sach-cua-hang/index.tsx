'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { useGetStores } from 'src/api/store';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { mapper } from './functions';
import MultiForm from './multi-form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachCuaHang() {
  const { stores } = useGetStores();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: mapper(stores),
      table_column: baseColumns,
      table_selected: [],
      table_export_data: stores.map((store) => ({
        id: store.id,
        'Tên cửa hàng': store.name,
      })),
      table_config: {
        table_name: 'stores',
        add_data: true,
        add_multi_data: true,
        export_data: true,
        selected_data: true,
        delete_multi: true,
        change_status_multi: true,
        active_row: true,
        edit_row: true,
        delete_row: true,
      },
    });
  }, [stores]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
      <MultiForm />
    </RoleBasedGuard>
  );
}
