import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTableContext } from 'src/table/context';
import { createRoom, updateRoom } from 'src/api/room';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { BlockItem, RHFSwitch, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên cho phòng bàn !'),
    isVip: Yup.boolean().required('Bạn chưa chọn loại phòng !'),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
      isVip: table_selected_row?.isVip || false,
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
        const table = await createRoom(data);
        onCreateNewRow(table);
        enqueueSnackbar('Đã thêm dữ liệu phòng bàn mới !');
      } else {
        const table = await updateRoom(table_selected_row.id, data);
        onUpdateRow(table);
        enqueueSnackbar('Đã cập nhật dữ liệu phòng bàn !');
      }
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error.message[0] || error.message || 'Đã có lỗi xảy ra ! Vui lòng thử lại !',
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
          {isEdit ? 'Cập nhật dữ liệu phòng bàn' : 'Thêm dữ liệu phòng bàn mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <BlockItem label="Tên phòng bàn :" required>
              <RHFTextField name="name" label="Nhập tên phòng bàn" placeholder="Bàn số 01..." />
            </BlockItem>

            <BlockItem label="Loại phòng :" required>
              <RHFSwitch name="isVip" label="Phòng cao cấp / phòng Vip" />
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
