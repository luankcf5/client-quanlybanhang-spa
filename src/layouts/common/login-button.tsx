import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Theme, SxProps } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { PATH_AFTER_LOGIN } from 'src/config-global';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Stack direction="row" spacing={0.5}>
      <Button
        component={RouterLink}
        href={PATH_AFTER_LOGIN}
        variant="contained"
        color="primary"
        sx={{ mr: 1, ...sx }}
      >
        Đăng nhập tài khoản
      </Button>
    </Stack>
  );
}
