'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { useGetClasses } from 'src/api/class';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function ClassView() {
  const { classes } = useGetClasses();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: classes,
      table_column: baseColumns,
      table_selected: [],
      table_export_data: classes.map((classroom) => ({
        id: classroom.id,
        'Tên lớp học': classroom.name,
        'Số học sinh': classroom._count.students,
        'Số bài thi': classroom._count.exams,
      })),
      table_config: {
        table_name: 'classes',
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
  }, [classes]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form />
    </RoleBasedGuard>
  );
}
