import { GridColDef } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

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
    headerName: 'Tên cửa hàng',
    flex: 1,
    minWidth: 270,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={params.row.name}
        secondary="Tên cửa hàng"
        primaryTypographyProps={{
          typography: 'body2',
        }}
        secondaryTypographyProps={{
          typography: 'caption',
        }}
      />
    ),
  },
  {
    field: 'isActive',
    headerName: 'Trạng thái',
    headerAlign: 'center',
    align: 'center',
    hideable: false,
    filterable: false,
    flex: 1,
    minWidth: 160,
    renderCell: (params) => (
      <Label variant="soft" color={params.row.isActive ? 'success' : 'warning'}>
        {params.row.isActive ? 'Đang hoạt động' : 'Đã vô hiệu hoá'}
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
