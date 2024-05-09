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
import { createStore, updateStore } from 'src/api/store';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { BlockItem, RHFSwitch, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên cho cửa hàng !'),
    isActive: Yup.boolean().required('Bạn chưa xác định tình trạng cửa hàng'),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
      isActive: table_selected_row?.isActive || true,
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
        const store = await createStore(data);
        onCreateNewRow(store);
        enqueueSnackbar('Đã thêm dữ liệu cửa hàng mới !');
      } else {
        const store = await updateStore(table_selected_row.id, {
          name: data.name,
          isActive: data.isActive,
        });
        onUpdateRow(store);
        enqueueSnackbar('Đã cập nhật dữ liệu cửa hàng !');
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
          {isEdit ? 'Cập nhật dữ liệu cửa hàng' : 'Thêm dữ liệu cửa hàng mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
              Ghi chú : Trạng thái cửa hàng mặc định là cho phép hoạt động...
            </Alert>

            <BlockItem label="Tên cửa hàng :" required>
              <RHFTextField name="name" label="Cửa hàng rau Kiên Liên..." />
            </BlockItem>

            <BlockItem label="Trạng thái hoạt động :" required>
              <RHFSwitch name="isActive" label="Cho phép hoạt động" />
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
