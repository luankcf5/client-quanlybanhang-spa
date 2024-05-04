'use client';

import { useState, useEffect } from 'react';

import TableData from 'src/table';
import { useGetClasses } from 'src/api/class';
import { RoleBasedGuard } from 'src/auth/guard';
import { useGetStudents } from 'src/api/student';
import { useTableContext } from 'src/table/context';

import { IClass } from 'src/types/class';

import Form from './form';
import MultiForm from './multi-form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function StudentView() {
  const { students } = useGetStudents();

  const { classes } = useGetClasses();

  const { setValues } = useTableContext();

  const [classData, setClassData] = useState<IClass[]>([]);

  useEffect(() => {
    setClassData(classes);
  }, [classes]);

  useEffect(() => {
    setValues({
      table_data: students,
      table_column: baseColumns,
      table_selected: [],
      table_import_data: null,
      table_export_data: students.map((student) => ({
        id: student.id,
      })),
      table_config: {
        table_name: 'students',
        add_data: true,
        add_multi_data: true,
        import_data: false,
        export_data: true,
        selected_data: true,
        delete_multi: true,
        active_row: true,
        edit_row: true,
        delete_row: true,
      },
    });
  }, [students]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form classData={classData} setClassData={setClassData} />
      <MultiForm classData={classData} />
    </RoleBasedGuard>
  );
}
