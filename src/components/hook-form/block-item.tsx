import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label?: string;
  required?: boolean;
  button?: any;
};

export default function BlockItem({ label, required, children, sx, button, ...other }: BlockProps) {
  return (
    <Stack
      spacing={1}
      sx={{
        width: '100%',
        overflow: 'hidden',
        ...sx,
      }}
      {...other}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box component="span" sx={{ typography: 'subtitle2' }}>
          {label}{' '}
          {required && (
            <Typography component="span" color="error.main">
              *
            </Typography>
          )}
        </Box>

        {button}
      </Stack>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
