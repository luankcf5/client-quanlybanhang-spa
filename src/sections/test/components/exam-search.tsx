import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  search: string;
  onSearch: (search: string) => void;
};

export default function ExamSearch({ search, onSearch }: Props) {
  return (
    <TextField
      value={search}
      placeholder="Tìm kiếm bài thi..."
      onChange={(event) => onSearch(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
      sx={{ minWidth: 320 }}
    />
  );
}
