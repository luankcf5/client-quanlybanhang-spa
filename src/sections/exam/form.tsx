import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTableContext } from 'src/table/context';
import { createExam, updateExam } from 'src/api/exam';

import Markdown from 'src/components/markdown';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  BlockItem,
  RHFSelect,
  RHFTextField,
  RHFMultiSelect,
  RHFMultiCheckbox,
} from 'src/components/hook-form';

import { IClass } from 'src/types/class';
import { IQuestion } from 'src/types/question';

import { SUBJECTS, EXAM_FORM_TABS } from './constants';

// ----------------------------------------------------------------------

type Props = {
  classes: IClass[];
  questions: IQuestion[];
};

export default function ExamForm({ classes, questions }: Props) {
  const { table_selected_row, table_open_form, onForm, setValue, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const isEdit = !!table_selected_row;

  const [currentTab, setCurrentTab] = useState('exam');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    name: Yup.string().required('Bạn chưa nhập tên bài thi !'),
    code: Yup.string().required('Bạn chưa mập mã số bài thi !'),
    password: Yup.string().required('Bạn chưa nhập mật khẩu cho bài thi !'),
    duration: Yup.string().required('Bạn chưa nhập thời gian làm bài !'),
    subject: Yup.string().required('Bạn chưa chọn môn học của bài thi !'),
    start: Yup.date().required('Bạn chưa chọn thời gian bắt đầu cho bài thi !'),
    end: Yup.date().required('Bạn chưa chọn thời gian hết hạn của bài thi !'),
    classes: Yup.array().min(1, 'Bạn cần chọn ít nhất một lớp áp dụng bài thi !'),
    questions: Yup.array().min(1, 'Bạn chưa chọn ít nhất 1 câu hỏi cho bài thi !'),
  });

  const defaultValues = useMemo(
    () => ({
      name: table_selected_row?.name || '',
      code: table_selected_row?.code || '',
      password: table_selected_row?.password || '',
      duration: table_selected_row?.duration || 0,
      subject: table_selected_row?.subject || '',
      start: new Date(table_selected_row?.start) || new Date(),
      end: new Date(table_selected_row?.end) || new Date(),
      classes: table_selected_row?.classes.map((classroom: IClass) => classroom.id) || [],
      questions: [],
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
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, table_selected_row, defaultValues]);

  const onSubmit = handleSubmit(async (data: any) => {
    const form = {
      ...data,
      isPublish: true,
      classIds: data.classes.map((classroom: number) => +classroom),
      questionIds: data.questions.map((question: IQuestion) => +question),
    };
    try {
      if (!isEdit) {
        const exam = await createExam(form);
        onCreateNewRow(exam);
        enqueueSnackbar('Đã thêm dữ liệu bài thi mới !');
      } else {
        const exam = await updateExam(table_selected_row.id, form);
        onUpdateRow(exam);
        enqueueSnackbar('Đã cập nhật dữ liệu bài thi !');
      }
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Đã có lỗi xảy ra ! Vui lòng thử lại !', { variant: 'error' });
    }
  });

  const handleClose = useCallback(() => {
    setValue('table_selected_row', null);
    setCurrentTab('exam');
    onForm(false);
  }, [setValue, onForm, setCurrentTab]);

  return (
    <Dialog fullWidth maxWidth="md" open={table_open_form} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {isEdit ? 'Cập nhật dữ liệu bài thi' : 'Thêm dữ liệu bài thi mới'}
        </DialogTitle>

        <DialogContent>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            {EXAM_FORM_TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          {currentTab === 'exam' && (
            <Stack spacing={2}>
              <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
                Ghi chú : Bài thi cần áp dụng ít nhất cho 1 lớp và có tối thiểu 1 câu hỏi...
              </Alert>

              <Stack direction="row" spacing={2}>
                <BlockItem label="Tên bài thi :" required>
                  <RHFTextField name="name" label="Nhập tên bài thi..." />
                </BlockItem>

                <BlockItem label="Mã bài thi :" required>
                  <RHFTextField name="code" label="Nhập mã bài thi..." />
                </BlockItem>
              </Stack>

              <Stack direction="row" spacing={2}>
                <BlockItem label="Mật khẩu bài thi :" required>
                  <RHFTextField name="password" label="Nhập mật khẩu bài thi..." />
                </BlockItem>

                <BlockItem label="Lựa chọn môn học :" required>
                  <RHFSelect name="subject" label="Lựa chọn môn học">
                    {SUBJECTS.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                </BlockItem>
              </Stack>

              <Stack direction="row" spacing={2}>
                <BlockItem label="Thời gian làm bài :" required>
                  <RHFTextField name="duration" label="Nhập thời gian làm bài..." />
                </BlockItem>

                <BlockItem label="Lớp học áp dụng :" required>
                  <RHFMultiSelect
                    fullWidth
                    chip
                    checkbox
                    name="classes"
                    label="Chọn lớp học áp dụng"
                    options={classes.map((classroom) => ({
                      label: classroom.name,
                      value: classroom.id.toString(),
                    }))}
                  />
                </BlockItem>
              </Stack>

              <Stack direction="row" spacing={2}>
                <BlockItem label="Thời gian bắt đầu :" required>
                  <Controller
                    name="start"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        label="Thời gian bắt đầu"
                        format="dd/MM/yyyy"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />
                </BlockItem>

                <BlockItem label="Thời gian hết hạn :" required>
                  <Controller
                    name="end"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        {...field}
                        label="Thời gian hết hạn"
                        format="dd/MM/yyyy"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            error: !!error,
                            helperText: error?.message,
                          },
                        }}
                      />
                    )}
                  />
                </BlockItem>
              </Stack>
            </Stack>
          )}

          {currentTab === 'question' && (
            <RHFMultiCheckbox
              name="questions"
              spacing={2}
              options={questions.map((question) => ({
                value: question.id.toString(),
                label: <Markdown children={question.content} />,
              }))}
            />
          )}
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
