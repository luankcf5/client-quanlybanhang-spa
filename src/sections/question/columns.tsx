import { GridColDef } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export const baseColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    filterable: false,
  },
  {
    field: 'content',
    headerName: 'Câu hỏi',
    flex: 1,
    minWidth: 120,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={params.row.content}
        secondary="Xem chi tiết ở chỉnh sửa"
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
    field: 'subject',
    headerName: 'Môn học',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Môn: ${params.row.subject}`}
        secondary="Thuộc môn học"
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
    field: 'answers',
    headerName: 'Các đáp án',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Có tổng ${params.row.answers.length} đáp án`}
        secondary={`Đáp án đúng được ${params.row.point} điểm`}
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
    field: 'teacher',
    headerName: 'Người tạo',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={params.row.teacher.name}
        secondary="Chức vụ: Giáo viên"
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
    type: 'dateTime',
    field: 'createTime',
    headerName: 'Thời gian',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Tạo lúc: ${fDateTime(params.row.createdAt)}`}
        secondary={`Cập nhật: ${fDateTime(params.row.updatedAt)}`}
        primaryTypographyProps={{
          typography: 'body2',
        }}
        secondaryTypographyProps={{
          typography: 'caption',
        }}
      />
    ),
  },
];
