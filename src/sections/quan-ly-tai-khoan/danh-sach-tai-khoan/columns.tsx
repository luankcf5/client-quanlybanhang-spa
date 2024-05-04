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
    field: 'full_name',
    headerName: 'Tên nhân viên',
    flex: 1,
    minWidth: 270,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={params.row.full_name}
        secondary={params.row.user_name}
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
    field: 'user_name',
    headerName: 'Tên tài khoản',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => params.row.user_name,
  },
  {
    field: 'date_of_birth',
    headerName: 'Ngày sinh',
    headerAlign: 'center',
    align: 'center',
    filterable: false,
    flex: 1,
    minWidth: 140,
    renderCell: (params) => fDate(params.row.date_of_birth),
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    headerAlign: 'center',
    align: 'center',
    filterable: false,
    flex: 1,
    minWidth: 140,
    renderCell: (params) => (params.row.gender ? 'Nam' : 'Nữ'),
  },
  {
    field: 'phone_number',
    headerName: 'Số điện thoại',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => params.row.phone_number,
  },
  {
    field: 'email',
    headerName: 'Địa chỉ email',
    flex: 1,
    minWidth: 240,
    renderCell: (params) => params.row.email,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ nhà',
    flex: 1,
    minWidth: 280,
    renderCell: (params) => params.row.address,
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
      <Label variant="soft" color={params.row.is_active ? 'success' : 'warning'}>
        {params.row.is_active ? 'Đang hoạt động' : 'Đã vô hiệu hoá'}
      </Label>
    ),
  },
  {
    type: 'dateTime',
    field: 'created_at',
    headerName: 'Thời gian tạo',
    headerAlign: 'center',
    align: 'center',
    filterable: false,
    flex: 1,
    minWidth: 200,
    renderCell: (params) => fDateTime(params.row.created_at),
  },
  {
    type: 'dateTime',
    field: 'updated_at',
    headerName: 'Cập nhật gần nhất',
    headerAlign: 'center',
    align: 'center',
    filterable: false,
    flex: 1,
    minWidth: 200,
    renderCell: (params) => fDateTime(params.row.updated_at),
  },
];
