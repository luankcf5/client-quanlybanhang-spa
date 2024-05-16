import { GridColDef } from '@mui/x-data-grid';

import { fDate, fDateTime } from 'src/utils/format-time';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export const baseColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    filterable: false,
  },
  {
    field: 'name',
    headerName: 'Tên phòng bàn',
    flex: 1,
    minWidth: 270,
    hideable: false,
    renderCell: (params) => params.row.name,
  },
  {
    field: 'isVip',
    type: 'boolean',
    headerName: 'Loại phòng',
    flex: 1,
    minWidth: 270,
    renderCell: (params) => (
      <Label color={params.row.isVip ? 'warning' : 'primary'}>
        {params.row.isVip ? 'Phòng bàn Vip' : 'Phòng bàn thường'}
      </Label>
    ),
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
