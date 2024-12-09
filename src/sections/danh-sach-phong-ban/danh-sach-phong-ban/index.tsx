'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { useGetRooms } from 'src/api/room';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function DanhSachPhongBan() {
  const { rooms } = useGetRooms();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: rooms,
      table_column: baseColumns,
      table_selected: [],
      table_export_data: rooms.map((room) => ({
        id: room.id,
        'Tên bàn': room.name,
      })),
      table_config: {
        table_name: 'rooms',
        add_data: false,
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
  }, [rooms]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
    </RoleBasedGuard>
  );
}
