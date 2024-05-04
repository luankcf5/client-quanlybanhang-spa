import { GridColDef } from '@mui/x-data-grid';
import ListItemText from '@mui/material/ListItemText';

// ----------------------------------------------------------------------

export const baseColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    filterable: false,
  },
  {
    field: 'student',
    headerName: 'Tên học sinh',
    flex: 1,
    minWidth: 120,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={params.row.student.name}
        secondary={`Thuộc lớp: ${params.row.student.class.name}`}
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
    field: 'exam',
    headerName: 'Tên bài thi',
    flex: 1,
    minWidth: 120,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={params.row.exam.name}
        secondary={`Thuộc môn: ${params.row.exam.subject}`}
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
        primary={`Mã bài thi: ${params.row.exam.code}`}
        secondary={`Thời gian làm bài: ${params.row.exam.duration} phút`}
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
        primary={`Tổng: ${params.row.exam._count.questions} câu hỏi`}
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
    field: 'point',
    headerName: 'Kết quả bài thi',
    flex: 1,
    minWidth: 120,
    renderCell: (params) => (
      <ListItemText
        primary={`Tổng điểm: ${params.row.point}`}
        secondary="Tổng số điểm thi"
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
