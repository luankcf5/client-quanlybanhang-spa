'use client';

import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { useGetPublicClasses } from 'src/api/class';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const { classes } = useGetPublicClasses();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    type: Yup.string().required('Bạn chưa chọn loại tài khoản !'),
    username: Yup.string().required('Tên đăng nhập là bắt buộc !'),
    password: Yup.string().required('Mật khẩu là bắt buộc !'),
    classId: Yup.string().required('Bạn chưa chọn lớp học !'),
  });

  const defaultValues = {
    type: 'student',
    username: '',
    password: '',
    classId: '0',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.username, data.password, data.type, data.classId);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      setErrorMsg('Tên đăng nhập, mật khẩu hoặc lớp không đúng !');
    }
  });

  const renderHead = (
    <Stack spacing={2} alignItems="center" sx={{ mb: 5 }}>
      <Typography variant="h4">Đăng nhập tài khoản</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
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

      <RHFSelect name="type" label="Loại tài khoản">
        {[
          { label: 'Giáo viên', value: 'teacher' },
          { label: 'Học sinh', value: 'student' },
        ].map((type) => (
          <MenuItem key={type.value} value={type.value}>
            {type.label}
          </MenuItem>
        ))}
      </RHFSelect>

      {values.type === 'student' && (
        <RHFSelect name="classId" label="Thuộc lớp học">
          {classes.map((classroom) => (
            <MenuItem key={classroom.id} value={classroom.id}>
              {classroom.teacher.name} - Lớp {classroom.name}
            </MenuItem>
          ))}
        </RHFSelect>
      )}

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Đăng nhập tài khoản
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
