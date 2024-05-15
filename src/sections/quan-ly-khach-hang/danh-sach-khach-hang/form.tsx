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
import { createCustomer, updateCustomer } from 'src/api/customer';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { BlockItem, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên cho khách hàng !'),
    phone: Yup.string().required('Bạn chưa nhập số điện thoại cho khách hàng !'),
    address: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
      phone: table_selected_row?.phone || '',
      address: table_selected_row?.address || '',
    }),
    [table_selected_row]
  );

  const methods = useForm({
    // @ts-ignore
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
        const category = await createCustomer(data);
        onCreateNewRow(category);
        enqueueSnackbar('Đã thêm dữ liệu khách hàng mới !');
      } else {
        const category = await updateCustomer(table_selected_row.id, data);
        onUpdateRow(category);
        enqueueSnackbar('Đã cập nhật dữ liệu khách hàng !');
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
          {isEdit ? 'Cập nhật dữ liệu khách hàng' : 'Thêm dữ liệu khách hàng mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <BlockItem label="Tên khách hàng :" required>
              <RHFTextField
                name="name"
                label="Nhập tên khách hàng"
                placeholder="Lê Thanh Tùng..."
              />
            </BlockItem>

            <BlockItem label="Số điện thoại khách hàng :" required>
              <RHFTextField
                name="phone"
                label="Nhập số điện thoại khách hàng"
                placeholder="0945 855 878..."
              />
            </BlockItem>

            <BlockItem label="Địa chỉ khách hàng :">
              <RHFTextField
                multiline
                rows={2}
                name="address"
                label="Nhập địa chỉ khách hàng..."
                placeholder="138 Mậu Thân, Ninh Kiều, Cần Thơ..."
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
