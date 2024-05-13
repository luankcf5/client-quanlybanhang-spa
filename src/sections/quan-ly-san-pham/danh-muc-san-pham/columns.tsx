import { GridColDef } from '@mui/x-data-grid';

import { fDate, fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export const baseColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    filterable: false,
  },
  {
    field: 'name',
    headerName: 'Tên danh mục',
    flex: 1,
    minWidth: 270,
    hideable: false,
    renderCell: (params) => params.row.name,
  },
  {
    field: 'description',
    headerName: 'Mô tả danh mục',
    flex: 1,
    minWidth: 270,
    renderCell: (params) => params.row.description,
  },
  {
    type: 'date',
    field: 'createdAt',
    headerName: 'Thời gian tạo',
    headerAlign: 'center',
    align: 'center',
    filterable: false,
    flex: 1,
    minWidth: 200,
    valueFormatter: (params) => fDate(params.value.createdAt),
    renderCell: (params) => fDateTime(params.row.createdAt),
  },
  {
    type: 'date',
    field: 'updatedAt',
    headerName: 'Cập nhật gần nhất',
    headerAlign: 'center',
    align: 'center',
    filterable: false,
    flex: 1,
    minWidth: 200,
    valueFormatter: (params) => fDate(params.value.updatedAt),
    renderCell: (params) => fDateTime(params.row.updatedAt),
  },
];
