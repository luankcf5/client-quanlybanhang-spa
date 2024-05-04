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
    field: 'name',
    headerName: 'Tên lớp học',
    flex: 1,
    minWidth: 120,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={`Lớp : ${params.row.name}`}
        secondary="Tên lớp học"
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
    field: 'student',
    headerName: 'Học sinh',
    flex: 1,
    minWidth: 120,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={`Có ${params.row._count.students} học sinh`}
        secondary="Số lượng học sinh"
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
    headerName: 'Bài thi',
    flex: 1,
    minWidth: 120,
    hideable: false,
    renderCell: (params) => (
      <ListItemText
        primary={`Có ${params.row._count.exams} bài thi`}
        secondary="Số lượng bài thi"
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
