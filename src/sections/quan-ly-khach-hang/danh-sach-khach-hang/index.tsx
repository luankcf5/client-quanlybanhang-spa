'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { RoleBasedGuard } from 'src/auth/guard';
import { useGetCustomers } from 'src/api/customer';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { mapper } from './functions';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachKhachHang() {
  const { customers } = useGetCustomers();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: mapper(customers),
      table_column: baseColumns,
      table_selected: [],
      table_export_data: customers.map((customer) => ({
        id: customer.id,
        'Tên khách hàng': customer.name,
      })),
      table_config: {
        table_name: 'customers',
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
  }, [customers]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
    </RoleBasedGuard>
  );
}
