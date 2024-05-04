import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { generate } from 'generate-password';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useBoolean } from 'src/hooks/use-boolean';

import { createClass } from 'src/api/class';
import { useTableContext } from 'src/table/context';
import { createStudent, updateStudent } from 'src/api/student';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import FormProvider, {
  BlockItem,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
} from 'src/components/hook-form';

import { IClass } from 'src/types/class';

// ----------------------------------------------------------------------

type Props = {
  classData: IClass[];
  setClassData: (classes: IClass[]) => void;
};

export default function Form({ classData, setClassData }: Props) {
  const { table_selected_row, table_open_form, setValue, onForm, onCreateNewRow, onUpdateRow } =
    useTableContext();

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
      .required('Bạn chưa nhập tên đăng nhập học sinh !')
      .min(8, 'Tên đăng nhập phải từ 8 kí tự trở lên !'),
    password: Yup.string()
      .required('Bạn chưa nhập mật khẩu cho học sinh !')
      .min(8, 'Mật khẩu phải từ 8 kí tự trở lên !'),
    name: Yup.string()
      .required('Bạn chưa nhập họ tên cho học sinh !')
      .min(8, 'Họ và tên phải từ 8 kí tự trở lên !'),
    class: Yup.string().required('Bạn chưa nhập lớp cho học sinh !'),
    isActive: Yup.boolean().required('Bạn chưa xác định tình trạng học sinh'),
  });

  const defaultValues = useMemo(
    () => ({
      username: table_selected_row?.username || '',
      password: table_selected_row?.password || '',
      name: table_selected_row?.name || '',
      class: table_selected_row?.class.id || '',
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
    setValue: setFormValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, table_selected_row, defaultValues]);

  // ----------------------------------------------------------------------

  const classPopover = usePopover();
  const classLoading = useBoolean();

  const [className, setClassName] = useState('');

  const onCreateClass = useCallback(async () => {
    classLoading.onTrue();
    try {
      const classroom = await createClass({
        name: className,
      });
      const currentClassData = [...classData];
      const newClassData = [classroom, ...currentClassData];
      setClassData(newClassData);
      setFormValue('class', classroom.id);
      classPopover.onClose();
      classLoading.onFalse();
      setClassName('');
      enqueueSnackbar('Đã thêm dữ liệu lớp học mới !');
    } catch (error) {
      console.log(error);
      classLoading.onFalse();
      classPopover.onClose();
      enqueueSnackbar(
        error.message || error.message[0] || 'Đã có lỗi xảy ra !  Vui lòng thử lại !',
        {
          variant: 'error',
        }
      );
    }
  }, [classData, setClassData, className, setClassName, setFormValue, enqueueSnackbar]);

  // ----------------------------------------------------------------------

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if (!isEdit) {
        const student = await createStudent({ ...data, classId: +data.class });
        onCreateNewRow(student);
        enqueueSnackbar('Đã thêm dữ liệu học sinh mới !');
      } else {
        const student = await updateStudent(table_selected_row.id, {
          name: data.name,
          isActive: data.isActive,
          classId: +data.class,
        });
        onUpdateRow(student);
        enqueueSnackbar('Đã cập nhật dữ liệu học sinh !');
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
          {isEdit ? 'Cập nhật dữ liệu học sinh' : 'Thêm dữ liệu học sinh mới'}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2}>
            <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
              Ghi chú : Tài khoản và mật khẩu dùng cho học sinh đăng nhập vào hệ thống...
            </Alert>

            {!isEdit && (
              <Stack direction="row" spacing={2}>
                <BlockItem label="Tên đăng nhập học sinh :" required>
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

            <BlockItem label="Họ và tên học sinh :" required>
              <RHFTextField name="name" placeholder="Lê Thanh Tùng..." />
            </BlockItem>

            <BlockItem
              label="Lớp học của học sinh :"
              required
              button={
                <>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={classPopover.onOpen}
                  >
                    Thêm lớp mới
                  </Button>

                  <CustomPopover
                    hiddenArrow
                    open={classPopover.open}
                    onClose={classPopover.onClose}
                  >
                    <Stack spacing={2} sx={{ p: 1, width: 260 }}>
                      <BlockItem label="Tên lớp học :" required>
                        <TextField
                          size="small"
                          fullWidth
                          placeholder="Nhập tên lớp học..."
                          onChange={(event) => setClassName(event.target.value)}
                        />
                      </BlockItem>

                      <LoadingButton
                        variant="contained"
                        color="primary"
                        onClick={onCreateClass}
                        loading={classLoading.value}
                      >
                        Thêm lớp học
                      </LoadingButton>
                    </Stack>
                  </CustomPopover>
                </>
              }
            >
              <RHFSelect name="class" label="Lựa chọn lớp học :">
                {classData.map((classroom) => (
                  <MenuItem value={classroom.id}>{classroom.name}</MenuItem>
                ))}
              </RHFSelect>
            </BlockItem>

            <BlockItem label="Họ và tên học sinh :" required>
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
