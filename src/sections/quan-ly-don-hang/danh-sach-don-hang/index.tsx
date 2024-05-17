'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { useGetBills } from 'src/api/bill';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachDonHang() {
  const { bills } = useGetBills();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: bills,
      table_column: baseColumns,
      table_selected: [],
      table_export_data: bills.map((bill) => ({
        id: bill.id,
      })),
      table_config: {
        table_name: 'bills',
        add_data: false,
        add_multi_data: false,
        export_data: true,
        selected_data: true,
        delete_multi: false,
        change_status_multi: false,
        active_row: false,
        edit_row: false,
        delete_row: false,
      },
    });
  }, [bills]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
    </RoleBasedGuard>
  );
}
