import Box, { BoxProps } from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// ----------------------------------------------------------------------

export default function LoadingScreen({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        width: 1,
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...other}
    >
      <LinearProgress color="primary" sx={{ width: 1, maxWidth: '100%' }} />
    </Box>
  );
}
