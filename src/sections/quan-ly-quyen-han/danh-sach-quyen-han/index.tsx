'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { useGetRoles } from 'src/api/role';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachQuyenHan() {
  const { roles } = useGetRoles();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: roles,
      table_column: baseColumns,
      table_selected: [],
      table_export_data: roles.map((role) => ({
        id: role.id,
        'Tên quyền hạn': role.name,
      })),
      table_config: {
        table_name: 'roles',
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
  }, [roles]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
    </RoleBasedGuard>
  );
}
