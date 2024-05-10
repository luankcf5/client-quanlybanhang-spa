import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children }: Props) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  return (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        height: '100vh',
        position: 'relative',
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
      }}
    >
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          top: 16,
          left: 16,
        }}
      />

      <Paper
        elevation={3}
        sx={{
          width: 1,
          mx: 'auto',
          maxWidth: { xs: 'auto', md: 920 },
          minWidth: { xs: 'auto', md: 920 },
          p: { xs: 4, md: 8 },
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          gap={5}
        >
          {mdUp && <Image src="/assets/images/sale_hero.png" />}

          {children}
        </Box>
      </Paper>

      <Typography
        variant="subtitle2"
        component="div"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        © 2024 Bản quyền thuộc về
        <Link href="https://iit.vn" target="_blank">
          {' '}
          công ty cổ phần IIT{' '}
        </Link>
      </Typography>
    </Stack>
  );
}
