import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useTableContext } from 'src/table/context';
import { createVoucher, updateVoucher } from 'src/api/voucher';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { BlockItem, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Form() {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const isEdit = !!table_selected_row;

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên cho mã giảm giá !'),
    percent: Yup.string(),
    price: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
      percent: table_selected_row?.percent || '',
      price: table_selected_row?.price || '',
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
    setValue: setFormValue,
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
        const category = await createVoucher({ ...data });
        onCreateNewRow(category);
        enqueueSnackbar('Đã thêm dữ liệu mã giảm giá mới !');
      } else {
        const category = await updateVoucher(table_selected_row.id, { ...data });
        onUpdateRow(category);
        enqueueSnackbar('Đã cập nhật dữ liệu mã giảm giá !');
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

  const [currentTab, setCurrentTab] = useState('price');

  const handleChangeTab = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      setFormValue('price', '');
      setFormValue('percent', '');
      setCurrentTab(newValue);
    },
    [setFormValue]
  );

  return (
    <Dialog fullWidth maxWidth="sm" open={table_open_form} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {isEdit ? 'Cập nhật dữ liệu mã giảm giá' : 'Thêm dữ liệu mã giảm giá mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <BlockItem label="Tên mã giảm giá :" required>
              <RHFTextField name="name" label="Nhập tên mã giảm giá" placeholder="VOUCHER01..." />
            </BlockItem>

            <Tabs value={currentTab} onChange={handleChangeTab}>
              <Tab label="Giảm giá trực tiếp" value="price" />
              <Tab label="Giảm giá theo phần trăm" value="percent" />
            </Tabs>

            {currentTab === 'price' && (
              <BlockItem label="Nhập giá giảm :" required>
                <RHFTextField
                  name="price"
                  type="number"
                  label="Nhập giá giảm"
                  placeholder="100000..."
                  onChange={(event) =>
                    setFormValue('price', event.target.value, { shouldValidate: true })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Typography variant="subtitle2">VNĐ</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </BlockItem>
            )}

            {currentTab === 'percent' && (
              <BlockItem label="Nhập phần trăm giảm :" required>
                <RHFTextField
                  name="percent"
                  type="number"
                  label="Nhập phần trăm giảm"
                  placeholder="100000..."
                  onChange={(event) =>
                    setFormValue('percent', event.target.value, { shouldValidate: true })
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        <Typography variant="subtitle2">%</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </BlockItem>
            )}
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
