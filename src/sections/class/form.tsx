import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTableContext } from 'src/table/context';
import { createClass, updateClass } from 'src/api/class';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { BlockItem, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string()
      .required('Bạn chưa nhập tên lớp học !')
      .min(3, 'Tên lớp học phải từ 3 kí tự trở lên !'),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
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

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if (!isEdit) {
        const classroom = await createClass(data);
        onCreateNewRow(classroom);
        enqueueSnackbar('Đã thêm dữ liệu lớp học mới !');
      } else {
        const classroom = await updateClass(table_selected_row.id, data);
        onUpdateRow(classroom);
        enqueueSnackbar('Đã cập nhật dữ liệu lớp học !');
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
  }, [onForm, setValue, reset]);

  return (
    <Dialog fullWidth maxWidth="sm" open={table_open_form} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {isEdit ? 'Cập nhật dữ liệu lớp học' : 'Thêm dữ liệu lớp học mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
              Ghi chú : Tên lớp học gồm tiền tố khối lớp và hậu tố mã lớp, VD: 1A3, 10B2...
            </Alert>

            <BlockItem label="Tên lớp học :" required>
              <RHFTextField name="name" label="3A1..." />
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
