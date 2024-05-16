'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { RoleBasedGuard } from 'src/auth/guard';
import { useGetVouchers } from 'src/api/voucher';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachGiamGia() {
  const { vouchers } = useGetVouchers();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: vouchers,
      table_column: baseColumns,
      table_selected: [],
      table_export_data: vouchers.map((voucher) => ({
        id: voucher.id,
        'Tên mã giảm giá': voucher.name,
      })),
      table_config: {
        table_name: 'vouchers',
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
  }, [vouchers]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
    </RoleBasedGuard>
  );
}
