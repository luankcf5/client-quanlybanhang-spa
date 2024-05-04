import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTableContext } from 'src/table/context';
import { createQuestion, updateQuestion } from 'src/api/question';

import Editor from 'src/components/editor';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  BlockItem,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';

import { IAnswer } from 'src/types/question';

import { SUBJECTS, QUESTION_FORM_TABS, QUESTION_ENUM_INDEX } from '../../constants/question';

// ----------------------------------------------------------------------

const DEFAULT_ANSWERS = [
  {
    id: 1,
    content: '',
    isCorrect: true,
  },
  { id: 2, content: '', isCorrect: false },
  { id: 3, content: '', isCorrect: false },
  { id: 4, content: '', isCorrect: false },
];

export default function QuestionForm() {
  const { table_selected_row, table_open_form, onForm, setValue, onCreateNewRow, onUpdateRow } =
    useTableContext();

  const isEdit = !!table_selected_row;

  const [answers, setAnswers] = useState<IAnswer[]>(DEFAULT_ANSWERS);

  const [currentTab, setCurrentTab] = useState('question');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  useEffect(() => {
    if (table_selected_row) {
      setAnswers(table_selected_row.answers);
    }
  }, [table_selected_row]);

  const { enqueueSnackbar } = useSnackbar();

  const Schema = Yup.object().shape({
    content: Yup.string().required('Bạn chưa nhập nội dung cho câu hỏi !'),
    subject: Yup.string().required('Bạn chưa chọn môn học của câu hỏi !'),
    point: Yup.number()
      .typeError('Điểm là phải là dạng số !')
      .required('Bạn chưa nhập số điểm cho câu hỏi !'),
  });

  const defaultValues = useMemo(
    () => ({
      content: table_selected_row?.content || '',
      subject: table_selected_row?.subject || '',
      point: table_selected_row?.point || 0,
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
        const question = await createQuestion({
          ...data,
          point: +data.point,
          answers,
        });
        onCreateNewRow(question);
        enqueueSnackbar('Đã thêm dữ liệu câu hỏi mới !');
      } else {
        const question = await updateQuestion(table_selected_row.id, {
          ...data,
          point: +data.point,
          answers,
        });
        onUpdateRow(question);
        enqueueSnackbar('Đã cập nhật dữ liệu câu hỏi !');
      }
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Đã có lỗi xảy ra ! Vui lòng thử lại !', { variant: 'error' });
    }
  });

  const handleChangeAnswer = useCallback(
    ({ value, index }: { value: string; index: number }) => {
      const newAnswers = [...answers];
      newAnswers[index].content = value;
      setAnswers(newAnswers);
    },
    [answers, setAnswers]
  );

  const handleChangeCorrect = useCallback(
    ({ checked, index }: { checked: boolean; index: number }) => {
      const currentAnswers = [...answers];

      const newAnswers = currentAnswers.map((answer, inx) => ({
        ...answer,
        isCorrect: index === inx,
      }));
      setAnswers(newAnswers);
    },
    [answers, setAnswers]
  );

  const handleNewAnswer = () => {
    if (answers.length >= 6) {
      enqueueSnackbar('Tối đa có 6 đáp án cho 1 câu hỏi !', { variant: 'error' });
    } else {
      setAnswers((pre: any) => [...pre, { content: '', isCorrect: false }]);
    }
  };

  const handleDeleteAnswer = useCallback(
    (index: number) => {
      if (answers.length > 2) {
        const newAnswers = [...answers];
        newAnswers.splice(index, 1);
        setAnswers(newAnswers);
      } else {
        enqueueSnackbar('Tối thiểu 2 đáp án cho 1 câu hỏi !', { variant: 'error' });
      }
    },
    [answers, setAnswers]
  );

  const handleClose = useCallback(() => {
    setValue('table_selected_row', null);
    setCurrentTab('question');
    setAnswers(DEFAULT_ANSWERS);
    onForm(false);
  }, [setValue, onForm, setAnswers, setCurrentTab]);

  return (
    <Dialog fullWidth maxWidth="md" open={table_open_form} onClose={handleClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>
          {isEdit ? 'Cập nhật dữ liệu câu hỏi' : 'Thêm dữ liệu câu hỏi mới'}
        </DialogTitle>

        <DialogContent>
          <Tabs value={currentTab} onChange={handleChangeTab}>
            {QUESTION_FORM_TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          {currentTab === 'question' && (
            <Stack spacing={2}>
              <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
                Ghi chú : Câu hỏi trắc nghiệm cần ít nhất 2 đáp án...
              </Alert>

              <Stack direction="row" spacing={2}>
                <BlockItem label="Điểm của câu hỏi :" required>
                  <RHFTextField name="point" label="Nhập điểm câu hỏi..." />
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

              <BlockItem label="Nội dung câu hỏi :" required>
                <RHFEditor simple name="content" sx={{ width: '100%' }} />
              </BlockItem>
            </Stack>
          )}

          {currentTab === 'answer' && (
            <Stack spacing={2}>
              <Alert variant="outlined" severity="info" sx={{ mt: 2 }}>
                Ghi chú : Lựa chọn một đáp án đúng trong các câu trả lời...
              </Alert>

              <BlockItem label="Các đáp án :" required>
                {answers?.map((answer: any, index: number) => (
                  <Grid
                    key={index}
                    container
                    spacing={1}
                    sx={{
                      typography: 'subtitle2',
                    }}
                  >
                    <Grid item xs={1}>
                      <Stack alignItems="center">
                        <Typography>{QUESTION_ENUM_INDEX[index]}</Typography>

                        <Tooltip title="Đây là đáp án đúng">
                          <Checkbox
                            checked={answer.isCorrect}
                            onChange={(event) =>
                              handleChangeCorrect({ checked: event.target.checked, index })
                            }
                          />
                        </Tooltip>
                      </Stack>
                    </Grid>

                    <Grid item xs={10}>
                      <Editor
                        id={`editor-${index}`}
                        simple
                        value={answer.content}
                        onChange={(value: any) => handleChangeAnswer({ value, index })}
                      />
                    </Grid>

                    <Grid item xs={1}>
                      <IconButton color="error" onClick={() => handleDeleteAnswer(index)}>
                        <Iconify icon="mingcute:delete-back-fill" />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}

                <Stack paddingX={1}>
                  <Button variant="contained" color="primary" onClick={handleNewAnswer}>
                    Thêm đáp án mới
                  </Button>
                </Stack>
              </BlockItem>
            </Stack>
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
