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
import { createCategory, updateCategory } from 'src/api/category';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { BlockItem, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên cho danh mục !'),
    description: Yup.string().required('Bạn chưa nhập mô tả cho danh mục'),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
      description: table_selected_row?.description || '',
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
        const category = await createCategory({ ...data, tags: [] });
        onCreateNewRow(category);
        enqueueSnackbar('Đã thêm dữ liệu danh mục mới !');
      } else {
        const category = await updateCategory(table_selected_row.id, { ...data, tags: [] });
        onUpdateRow(category);
        enqueueSnackbar('Đã cập nhật dữ liệu danh mục !');
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
          {isEdit ? 'Cập nhật dữ liệu danh mục' : 'Thêm dữ liệu danh mục mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <BlockItem label="Tên danh mục :" required>
              <RHFTextField name="name" label="Nhập tên danh mục" placeholder="Đồ gia dụng..." />
            </BlockItem>

            <BlockItem label="Mô tả danh mục :" required>
              <RHFTextField
                multiline
                rows={4}
                name="description"
                label="Nhập mô tả danh mục..."
                placeholder="Đây là danh mục cho các mặt hàng đồ gia dụng..."
              />
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
