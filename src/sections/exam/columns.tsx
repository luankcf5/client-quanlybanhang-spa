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
    field: 'name',
    headerName: 'Tên bài thi',
    flex: 1,
    minWidth: 120,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={params.row.name}
        secondary={`Thuộc môn: ${params.row.subject}`}
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
    field: 'password',
    headerName: 'Mật khẩu',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={params.row.password}
        secondary="Mật khẩu truy cập"
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
    field: 'code',
    headerName: 'Mã bài thi',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Mã bài thi: ${params.row.code}`}
        secondary={`Thời gian làm bài: ${params.row.duration} phút`}
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
    field: 'questions',
    headerName: 'Câu hỏi',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Tổng: ${params.row.questions.length} câu hỏi`}
        secondary="Câu hỏi trắc nghiệm 100%"
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
    field: 'startExam',
    headerName: 'Thời gian',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Bắt đầu: ${fDateTime(params.row.start)}`}
        secondary={`Hết hạn: ${fDateTime(params.row.end)}`}
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
