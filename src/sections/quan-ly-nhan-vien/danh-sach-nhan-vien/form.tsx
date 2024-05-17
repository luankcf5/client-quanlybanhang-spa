import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { generate } from 'generate-password';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useGetRoles } from 'src/api/role';
import { useTableContext } from 'src/table/context';
import { createUser, updateUser } from 'src/api/user';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { usePopover } from 'src/components/custom-popover';
import FormProvider, {
  BlockItem,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const { roles } = useGetRoles();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const randomPassword = generate({
    length: 10,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
  });

  const Schema = Yup.object().shape({
    username: Yup.string()
      .required('Bạn chưa nhập tên đăng nhập nhân viên !')
      .min(8, 'Tên đăng nhập phải từ 8 kí tự trở lên !'),
    password: Yup.string()
      .required('Bạn chưa nhập mật khẩu cho nhân viên !')
      .min(8, 'Mật khẩu phải từ 8 kí tự trở lên !'),
    name: Yup.string()
      .required('Bạn chưa nhập họ tên cho nhân viên !')
      .min(8, 'Họ và tên phải từ 8 kí tự trở lên !'),
    statusId: Yup.boolean().required('Bạn chưa xác định tình trạng nhân viên !'),
    roleId: Yup.string().required('Bạn chưa chọn quyền hạn cho nhân viên !'),
  });

  const defaultValues = useMemo(
    () => ({
      username: table_selected_row?.username || '',
      password: table_selected_row?.password || '',
      name: table_selected_row?.name || '',
      statusId: table_selected_row?.statusId || true,
      roleId: table_selected_row?.roles[0]?.id || '',
    }),
    [table_selected_row]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    setValue: setFormValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, table_selected_row, defaultValues]);

  // ----------------------------------------------------------------------

  const classPopover = usePopover();

  // ----------------------------------------------------------------------

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if (!isEdit) {
        const user = await createUser({
          ...data,
          statusId: data.statusId ? 1 : 2,
          roleIds: [Number(data.roleId)],
        });
        onCreateNewRow(user);
        enqueueSnackbar('Đã thêm dữ liệu nhân viên mới !');
      } else {
        const user = await updateUser(table_selected_row.id, {
          ...data,
          statusId: data.statusId ? 1 : 2,
          roleIds: [Number(data.roleId)],
        });
        onUpdateRow(user);
        enqueueSnackbar('Đã cập nhật dữ liệu nhân viên !');
      }
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.message || error.message[0] || 'Đã có lỗi xảy ra !  Vui lòng thử lại !',
        {
          variant: 'error',
        }
      );
    }
  });

  const handleClose = useCallback(() => {
    setValue('table_selected_row', null);
    onForm(false);
    reset();
    classPopover.onClose();
  }, [onForm, setValue, reset, classPopover]);

  return (
    <Dialog fullWidth maxWidth="sm" open={table_open_form} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {isEdit ? 'Cập nhật dữ liệu nhân viên' : 'Thêm dữ liệu nhân viên mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            {!isEdit && (
              <Stack direction="row" spacing={2}>
                <BlockItem label="Tên đăng nhập nhân viên :" required>
                  <RHFTextField name="username" label="lethanhtung..." />
                </BlockItem>

                <BlockItem label="Mật khẩu đăng nhập :" required>
                  <RHFTextField
                    name="password"
                    placeholder="TungLe@123456..."
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Tooltip title="Mật khẩu ngẫu nhiên">
                            <IconButton
                              edge="end"
                              color="primary"
                              onClick={() =>
                                setFormValue('password', randomPassword, { shouldValidate: true })
                              }
                            >
                              <Iconify icon="game-icons:perspective-dice-six-faces-random" />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />
                </BlockItem>
              </Stack>
            )}

            <BlockItem label="Họ và tên nhân viên :" required>
              <RHFTextField name="name" placeholder="Lê Thanh Tùng..." />
            </BlockItem>

            <BlockItem label="Quyền hạn nhân viên :" required>
              <RHFSelect name="roleId" label="Chọn quyền hạn cho nhân viên">
                {roles.map((role) => (
                  <MenuItem key={role.id} value={role.id}>
                    {role.name}
                  </MenuItem>
                ))}
              </RHFSelect>
            </BlockItem>

            <BlockItem label="Tình trạng nhân viên :" required>
              <RHFSwitch name="statusId" label="Cho phép nhân viên hoạt động" />
            </BlockItem>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Huỷ bỏ
          </Button>

          <LoadingButton type="submit" color="primary" variant="contained" loading={isSubmitting}>
            {isEdit ? 'Cập nhật dữ liệu' : 'Thêm dữ liệu mới'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
