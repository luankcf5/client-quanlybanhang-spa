'use client';

import { useMemo, useState, useCallback } from 'react';

import { TableContext } from './table-context';

// ----------------------------------------------------------------------

const initialState = {
  table_data: [],
  table_column: [],
  table_selected: [],
  table_export_data: [],
  table_config: {
    table_name: '',
    add_data: false,
    add_multi_data: false,
    export_data: false,
    selected_data: false,
    delete_multi: false,
    change_status_multi: false,
    active_row: false,
    edit_row: false,
    delete_row: false,
  },
  table_selected_row: null,
  table_open_form: false,
  table_open_multi_form: false,
};

type Props = {
  children: React.ReactNode;
};

export function TableProvider({ children }: Props) {
  const [values, setValues] = useState(initialState);

  // cập nhật state
  const setValue = useCallback(
    (name: string, value: any) => {
      setValues((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setValues]
  );

  // thêm dữ liệu mới vào bảng
  const onCreateNewRow = useCallback(
    (newRow: any) => {
      // @ts-ignore
      setValue('table_data', [newRow, ...values.table_data]);
    },
    [setValue, values.table_data]
  );

  // thêm nhiều dữ liệu mới vào bảng
  const onCreateNewManyRow = useCallback(
    (newRows: any) => {
      // @ts-ignore
      setValue('table_data', [...newRows, ...values.table_data]);
    },
    [setValue, values.table_data]
  );

  // cập nhật dữ liệu trong bảng
  const onUpdateRow = useCallback(
    (updateRow: any) => {
      // @ts-ignore
      const updated = values.table_data.map((item: any) => {
        if (item.id === updateRow.id) {
          return updateRow;
        }
        return item;
      });
      setValue('table_data', updated);
    },
    [setValue, values.table_data]
  );

  // xoá một dữ liệu trong bảng
  const onDeleteRow = useCallback(
    (id: number) => {
      const updated = values.table_data.filter((item: any) => item.id !== id);
      setValue('table_data', updated);
    },
    [setValue, values.table_data]
  );

  // xoá nhiều dữ liệu trong bảng
  const onDeleteRows = useCallback(
    (ids: number[]) => {
      const updated = values.table_data.filter((item: any) => !ids.includes(item.id));
      setValue('table_data', updated);
    },
    [setValue, values.table_data]
  );

  // đóng mở form
  const onForm = useCallback(
    (table_open_form: boolean) => {
      setValue('table_open_form', table_open_form);
    },
    [setValue]
  );

  // đóng mở form
  const onMultiForm = useCallback(
    (table_open_multi_form: boolean) => {
      setValue('table_open_multi_form', table_open_multi_form);
    },
    [setValue]
  );

  const memoizedValue = useMemo(
    () => ({
      ...values,
      setValue,
      setValues,
      onCreateNewRow,
      onCreateNewManyRow,
      onUpdateRow,
      onDeleteRow,
      onDeleteRows,
      onForm,
      onMultiForm,
    }),
    [
      values,
      setValue,
      setValues,
      onCreateNewRow,
      onCreateNewManyRow,
      onUpdateRow,
      onDeleteRow,
      onDeleteRows,
      onForm,
      onMultiForm,
    ]
  );

  return <TableContext.Provider value={memoizedValue}>{children}</TableContext.Provider>;
}
