'use client';

import { useContext, createContext } from 'react';

// ----------------------------------------------------------------------

export const TableContext = createContext({} as TableContextProps);

export const useTableContext = () => {
  const context = useContext(TableContext);

  if (!context) throw new Error('useTableContext must be use inside TableProvider');

  return context;
};

type TableContextProps = {
  table_data: any;
  table_column: any;
  table_selected: any;
  table_export_data: any;
  table_config: {
    table_name: string;
    add_data: boolean;
    add_multi_data: boolean;
    export_data: boolean;
    selected_data: boolean;
    delete_multi: boolean;
    change_status_multi: boolean;
    active_row: boolean;
    edit_row: boolean;
    delete_row: boolean;
  };
  table_selected_row: any;
  table_open_form: boolean;
  table_open_multi_form: boolean;
  //
  setValue: any;
  setValues: any;
  onCreateNewRow: (newRow: any) => void;
  onCreateNewManyRow: (newRow: any) => void;
  onUpdateRow: (updatedRow: any) => void;
  onDeleteRow: (id: number) => void;
  onDeleteRows: (ids: number[]) => void;
  onForm: (table_open_form: boolean) => void;
  onMultiForm: (table_open_multi_form: boolean) => void;
};
