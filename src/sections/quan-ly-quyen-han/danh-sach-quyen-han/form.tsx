import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTableContext } from 'src/table/context';
import { createRole, updateRole } from 'src/api/role';
import { useGetPermissions } from 'src/api/permission';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { BlockItem, RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const { permissions } = useGetPermissions();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên cho quyền hạn !'),
    slug: Yup.string().required('Bạn chưa nhập mã cho quyền hạn'),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
      slug: table_selected_row?.slug || '',
    }),
    [table_selected_row]
  );

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, table_selected_row, defaultValues]);

  // ----------------------------------------------------------------------

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if (!isEdit) {
        const category = await createRole(data);
        onCreateNewRow(category);
        enqueueSnackbar('Đã thêm dữ liệu quyền hạn mới !');
      } else {
        const category = await updateRole(table_selected_row.id, data);
        onUpdateRow(category);
        enqueueSnackbar('Đã cập nhật dữ liệu quyền hạn !');
      }
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.message[0] || error.message || 'Đã có lỗi xảy ra !  Vui lòng thử lại !',
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
  }, [onForm, setValue, reset]);

  return (
    <Dialog fullWidth maxWidth="sm" open={table_open_form} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {isEdit ? 'Cập nhật dữ liệu quyền hạn' : 'Thêm dữ liệu quyền hạn mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <BlockItem label="Tên quyền hạn :" required>
              <RHFTextField
                name="name"
                label="Nhập tên quyền hạn"
                placeholder="Nhân viên thu ngân..."
              />
            </BlockItem>

            <BlockItem label="Mã quyền hạn :" required>
              <RHFTextField name="slug" label="Nhập mã quyền hạn..." placeholder="thu-ngan..." />
            </BlockItem>

            <BlockItem label="Quyền hạn nhân viên :" required>
              <RHFSelect name="roleId" label="Chọn quyền hạn cho nhân viên">
                {permissions.map((permission) => (
                  <MenuItem key={permission.id} value={permission.id}>
                    {permission.name}
                  </MenuItem>
                ))}
              </RHFSelect>
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
