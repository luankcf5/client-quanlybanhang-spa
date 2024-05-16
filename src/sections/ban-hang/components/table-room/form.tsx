import * as Yup from 'yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { createRoom } from 'src/api/room';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { BlockItem, RHFSwitch, RHFTextField } from 'src/components/hook-form';

import { IRoom } from 'src/types/room';

// ----------------------------------------------------------------------
type Props = {
  open: boolean;
  onClose: VoidFunction;
  onAddRoom: (room: IRoom) => void;
};

export default function Form({ open, onClose, onAddRoom }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên cho mã phòng bàn !'),
    isVip: Yup.boolean().required('Bạn chưa chọn loại phòng !'),
  });

  const defaultValues = {
    name: '',
    isVip: false,
  };

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // ----------------------------------------------------------------------

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const table = await createRoom(data);
      onAddRoom(table);
      enqueueSnackbar('Đã thêm dữ liệu mã phòng bàn mới !');
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
    reset();
    onClose();
  }, [reset, onClose]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Thêm dữ liệu phòng bàn mới</DialogTitle>

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
            Thêm dữ liệu mới
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
