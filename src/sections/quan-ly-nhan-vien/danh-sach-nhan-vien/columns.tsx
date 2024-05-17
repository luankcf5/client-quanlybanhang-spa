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
    headerName: 'Tên nhân viên',
    flex: 1,
    minWidth: 270,
    hideable: false,
    renderCell: (params) => params.row.name,
  },
  {
    field: 'username',
    headerName: 'Tên tài khoản',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => params.row.username,
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => (params.row.gender.id === 1 ? 'Nam' : 'Nữ'),
  },
  {
    field: 'phone',
    headerName: 'Số liên hệ',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => params.row.phone,
  },
  {
    field: 'roles',
    headerName: 'Quyền hạn',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => params.row.roles[0]?.name,
  },

  {
    field: 'statusId',
    headerName: 'Trạng thái',
    headerAlign: 'center',
    align: 'center',
    hideable: false,
    filterable: false,
    flex: 1,
    minWidth: 160,
    renderCell: (params) => (
      <Label variant="soft" color={params.row.statusId === 1 ? 'success' : 'warning'}>
        {params.row.statusId === 1 ? 'Đang hoạt động' : 'Đã vô hiệu hoá'}
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
