'use client';

import { useState, useEffect } from 'react';

import TableData from 'src/table';
import { useGetClasses } from 'src/api/class';
import { _account } from 'src/_mock/_account';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';

import { IClass } from 'src/types/class';

import Form from './form';
import { mapper } from './functions';
import MultiForm from './multi-form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachTaiKhoan() {
  const { classes } = useGetClasses();

  const { setValues } = useTableContext();

  const [classData, setClassData] = useState<IClass[]>([]);

  useEffect(() => {
    setClassData(classes);
  }, [classes]);

  useEffect(() => {
    setValues({
      table_data: mapper(_account),
      table_column: baseColumns,
      table_selected: [],
      table_export_data: _account.map((account) => ({
        id: account.id,
        'Tên đăng nhập': account.user_name,
      })),
      table_config: {
        table_name: 'account',
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
  }, [_account]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form classData={classData} setClassData={setClassData} />
      <MultiForm classData={classData} />
    </RoleBasedGuard>
  );
}
