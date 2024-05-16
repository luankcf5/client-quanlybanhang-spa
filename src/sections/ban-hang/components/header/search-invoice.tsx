import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import axios from 'src/utils/axios';
import { fDateTime } from 'src/utils/format-time';

import { IBill } from 'src/types/bill';

import { useSaleContext } from '../../context';

// ----------------------------------------------------------------------

type Props = {
  bills: IBill[];
};

export default function SearchInvoice({ bills }: Props) {
  const { onGetBill } = useSaleContext();

  const handleAddNewSalesProduct = async (reason: any, value: any) => {
    if (value) {
      const response = await axios.get(`bills/${value.id}`);
      onGetBill(response.data);
    }
    if (reason === 'clear') {
      onGetBill(null);
    }
  };

  return (
    <Autocomplete
      size="small"
      options={bills}
      getOptionLabel={(option) => `Hoá đơn số ${option.id}`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField {...params} size="small" placeholder="Tìm kiếm hoá đơn..." margin="none" />
      )}
      onChange={(event, value, reason) => handleAddNewSalesProduct(reason, value)}
      renderOption={renderOption}
      sx={{
        bgcolor: 'background.default',
        borderRadius: 0.5,
        width: {
          xs: '100%',
          md: 350,
        },
      }}
    />
  );
}

// ----------------------------------------------------------------------

const renderOption = (props: any, option: any, { selected }: any) => (
  <Box component="li" {...props}>
    <Stack>
      <Typography variant="subtitle2" color="textPrimary">
        Hoá đơn số {option.id}
      </Typography>

      <Typography variant="caption">{fDateTime(option.createdAt)}</Typography>
    </Stack>
  </Box>
);
