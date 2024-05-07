import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import { _product } from 'src/_mock/_products';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function SearchInvoice() {
  const handleAddNewSalesProduct = (value: any) => {
    if (value) {
      console.log(value);
    }
  };

  return (
    <Autocomplete
      size="small"
      options={_product}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField {...params} size="small" placeholder="Tìm kiếm hoá đơn..." margin="none" />
      )}
      onChange={(event, value) => handleAddNewSalesProduct(value)}
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
  <Box
    component="li"
    sx={{
      p: '12px !important',
    }}
    {...props}
  >
    <Box
      sx={{
        mr: 1.5,
        width: 32,
        height: 32,
        overflow: 'hidden',
        borderRadius: '50%',
        position: 'relative',
      }}
    >
      <Avatar alt={option.name} src={option.image} />

      <Box
        sx={{
          top: 0,
          opacity: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
          transition: (theme) =>
            theme.transitions.create('opacity', {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.shorter,
            }),
          ...(selected && {
            opacity: 1,
            color: 'primary.main',
          }),
        }}
      >
        <Iconify icon="eva:checkmark-fill" />
      </Box>
    </Box>

    <Stack>
      <Typography variant="subtitle2" color="textPrimary">
        {option.name}
      </Typography>

      <Typography variant="caption">{option.type}</Typography>
    </Stack>
  </Box>
);
