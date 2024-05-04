'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const openSuccess = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập họ và tên !'),
    username: Yup.string().required('Bạn chưa nhập tên tài khoản !'),
    password: Yup.string().required('Bạn chưa nhập mật khẩu !'),
  });

  const defaultValues = {
    name: '',
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.username, data.password, data.name, 'teacher');
      openSuccess.onTrue();
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Đăng ký tài khoản</Typography>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        mt: 2.5,
        textAlign: 'center',
        typography: 'caption',
        color: 'text.secondary',
      }}
    >
      {'Bằng cách đăng ký, bạn đồng ý với '}
      <Link underline="always" color="text.primary">
        Điều khoản
      </Link>
      {' và '}
      <Link underline="always" color="text.primary">
        Chính sách
      </Link>
      {' của chúng tôi.'}
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="name" label="Họ và tên..." />
      </Stack>

      <RHFTextField name="username" label="Tên đăng nhập..." />

      <RHFTextField
        name="password"
        label="Mật khẩu..."
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Tạo tài khoản mới
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>

      {renderTerms}

      <ConfirmDialog
        open={openSuccess.value}
        onClose={openSuccess.onFalse}
        title="Tạo tài khoản thành công !"
        content={
          <Typography variant="subtitle2" component="div">
            Vui lòng truy cập{' '}
            <Link href="https://thitructuyen.iit.vn" target="_blank">
              {' '}
              https://thitructuyen.iit.vn
            </Link>{' '}
            và đăng nhập để sử dụng tính năng thi trực tuyến.
          </Typography>
        }
        action={
          <Button variant="contained" color="primary" onClick={openSuccess.onFalse}>
            Xác nhận
          </Button>
        }
      />
    </>
  );
}
