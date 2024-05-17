'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { useGetUsers } from 'src/api/user';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { mapper } from './functions';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachNhanVien() {
  const { users } = useGetUsers();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: mapper(users),
      table_column: baseColumns,
      table_selected: [],
      table_export_data: users.map((account) => ({
        id: account.id,
        'Tên đăng nhập': account.username,
      })),
      table_config: {
        table_name: 'users',
        add_data: true,
        add_multi_data: false,
        export_data: true,
        selected_data: true,
        delete_multi: false,
        change_status_multi: true,
        active_row: true,
        edit_row: true,
        delete_row: false,
      },
    });
  }, [users]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
    </RoleBasedGuard>
  );
}
