import { GridColDef } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

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
    headerName: 'Tên học sinh',
    flex: 1,
    minWidth: 120,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={`${params.row.name}`}
        secondary="Họ và tên"
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
    field: 'usename',
    headerName: 'Tài khoản',
    flex: 1,
    minWidth: 280,
    renderCell: (params) => (
      <ListItemText
        primary={`Tên đăng nhập: ${params.row.username}`}
        secondary="Mật khẩu: *********"
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
    field: 'class',
    headerName: 'Lớp học',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Thuộc lớp: ${params.row.class.name}`}
        secondary={`Tổng: ${params.row.class._count.students} học sinh`}
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
    field: 'submission',
    headerName: 'Bài kiểm tra',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Số lượng: ${params.row.submissions.length}`}
        secondary="Tổng bài kiểm tra"
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
    type: 'boolean',
    field: 'isActive',
    headerName: 'Hoạt động',
    flex: 1,
    minWidth: 120,

    renderCell: (params) => (
      <Label variant="soft" color={params.row.isActive ? 'success' : 'warning'}>
        {params.row.isActive ? 'Đang hoạt động' : 'Đã tạm ngưng'}
      </Label>
    ),
  },
];
