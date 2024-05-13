import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import CardActionArea from '@mui/material/CardActionArea';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Trang chủ',
    linkTo: '/',
  },
  {
    label: 'Cập nhật thông tin',
    linkTo: '/',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { user, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  const changePassword = useBoolean();

  const openPassword = useBoolean();

  const Schema = Yup.object().shape({
    password: Yup.string().required('Bạn chưa chọn loại tài khoản !'),
    newPassword: Yup.string().required('Tên đăng nhập là bắt buộc !'),
    rePassword: Yup.string().required('Mật khẩu là bắt buộc !'),
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: {
      password: '',
      newPassword: '',
      rePassword: '',
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.newPassword === data.rePassword) {
        await axios.patch(endpoints.auth.password, data);
        changePassword.onFalse();
        popover.onClose();
        reset();
        enqueueSnackbar('Đã cập nhật mật khẩu thành công !');
      } else {
        enqueueSnackbar('Mật khẩu nhập lại không đúng !', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Mật khẩu sai, vui lòng thử lại !', {
        variant: 'error',
      });
    }
  });

  return (
    <>
      <Card sx={{ borderRadius: 0 }} onClick={popover.onOpen}>
        <CardActionArea>
          <ListItem>
            <ListItemAvatar>
              <Badge variant="online" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Avatar
                  src="/assets/images/default_avatar.png"
                  alt={user?.displayName}
                  sx={{
                    width: 40,
                    height: 40,
                    border: (theme) => `solid 1px ${theme.palette.primary.light}`,
                  }}
                />
              </Badge>
            </ListItemAvatar>

            <ListItemText
              primary={user?.profile?.name || 'Người dùng'}
              secondary={user?.username}
              primaryTypographyProps={{
                typography: 'body2',
              }}
              secondaryTypographyProps={{
                typography: 'caption',
              }}
            />
          </ListItem>
        </CardActionArea>
      </Card>

      <CustomPopover
        arrow="left-top"
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={changePassword.onTrue} sx={{ m: 1 }}>
          Đổi mật khẩu
        </MenuItem>

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          Đăng xuất
        </MenuItem>
      </CustomPopover>

      <Dialog open={changePassword.value} onClose={changePassword.onFalse}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <DialogTitle>Thay đổi mật khẩu</DialogTitle>
          <DialogContent>
            <Typography variant="caption">
              Mật khẩu phải trên <strong>8 kí tự</strong>, có ít nhất{' '}
              <strong>1 chữ viết hoa</strong> và <strong>1 kí tự đặc biệt.</strong> Mật khẩu không
              được chứa tên đăng nhập, họ tên, số điện thoại, email... người dùng.
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
              <RHFTextField
                variant="filled"
                fullWidth
                name="password"
                label="Mật khẩu cũ..."
                type={openPassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={openPassword.onToggle} edge="end">
                        <Iconify
                          icon={openPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                variant="filled"
                fullWidth
                name="newPassword"
                label="Mật khẩu mới..."
                type={openPassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={openPassword.onToggle} edge="end">
                        <Iconify
                          icon={openPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <RHFTextField
                variant="filled"
                fullWidth
                name="rePassword"
                label="Nhập lại mật khẩu mới..."
                type={openPassword.value ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={openPassword.onToggle} edge="end">
                        <Iconify
                          icon={openPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={changePassword.onFalse} variant="outlined" color="inherit">
              Đóng
            </Button>

            <LoadingButton type="submit" variant="contained" loading={isSubmitting} color="primary">
              Thay đổi mật khẩu
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
