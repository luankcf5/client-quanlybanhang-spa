import { GridColDef } from '@mui/x-data-grid';

import { fCurrency } from 'src/utils/format-number';
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
    headerName: 'Tên sản phẩm',
    flex: 1,
    minWidth: 220,
    hideable: false,
    renderCell: (params) => params.row.name,
  },
  {
    field: 'code',
    headerName: 'Mã sản phẩm',
    flex: 1,
    minWidth: 220,
    renderCell: (params) => params.row.code,
  },
  {
    field: 'price',
    headerName: 'Giá gốc sản phẩm',
    flex: 1,
    minWidth: 220,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => fCurrency(params.row.price),
  },
  {
    field: 'discount',
    headerName: 'Giá khuyến mãi sản phẩm',
    flex: 1,
    minWidth: 220,
    headerAlign: 'center',
    align: 'center',

    renderCell: (params) => fCurrency(params.row.discount),
  },
  {
    field: 'amount',
    headerName: 'Số lượng tồn kho',
    flex: 1,
    minWidth: 220,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => params.row.amount,
  },
  {
    field: 'description',
    headerName: 'Mô tả sản phẩm',
    flex: 1,
    minWidth: 220,
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
