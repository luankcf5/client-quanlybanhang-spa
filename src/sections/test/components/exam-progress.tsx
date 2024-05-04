import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/system/Unstable_Grid/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import LinearProgress from '@mui/material/LinearProgress';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useCountdownDate } from 'src/hooks/use-countdown';

import { lockSubmission, useGetSubmissionByExamId } from 'src/api/submission';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { IExam, IChoiceAnswer } from 'src/types/exam';

import ExamQuestions from './exam-questions';

// ----------------------------------------------------------------------

const BoxAction = styled(Box)(({ theme }) => ({
  padding: 16,
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: theme.palette.primary.main,
}));

const BoxQuestion = styled(Box)<{ isSelected: boolean; isChecked: boolean }>(
  ({ theme, isSelected, isChecked }) => ({
    padding: 5,
    width: '100%',
    height: '100%',
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    borderRadius: 4,
    backgroundColor: isSelected
      ? theme.palette.primary.light
      : theme.palette.grey[isChecked ? 400 : 200],
    '&:hover': {
      backgroundColor: isSelected ? theme.palette.primary.light : theme.palette.grey[300],
    },
  })
);

// ----------------------------------------------------------------------

type Props = {
  exam: IExam;
  setExamSelected: (exam: IExam | null) => void;
  onUpdateExam: (examId: number) => void;
};

// ----------------------------------------------------------------------

export default function ExamProGress({ exam, setExamSelected, onUpdateExam }: Props) {
  const { submission } = useGetSubmissionByExamId(exam.id);

  const confirmFishish = useBoolean();

  const { push } = useRouter();

  const [selectedQuestion, setSelectedQuestion] = useState(1);

  const [flags, setFlags] = useState<number[]>([]);

  const [page, setPage] = useState(5);

  const [answers, setAnswers] = useState<IChoiceAnswer[]>([]);

  const isFisnish = useBoolean();

  const endAt = new Date(exam.assignedAt).setMinutes(
    new Date(exam.assignedAt).getMinutes() + exam.duration
  );

  const { hours, minutes, seconds } = useCountdownDate(new Date(endAt));

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (submission) {
      setAnswers(
        submission.choices.map((choice) => ({
          answerId: choice.answerId,
          questionId: choice.questionId,
        }))
      );
    }
  }, [submission]);

  useEffect(() => {
    if (Number(minutes) < 0) {
      handleFisnish();
    }
  }, [minutes]);

  const handleSelectedQuestion = useCallback((numberQuestion: number) => {
    setSelectedQuestion(numberQuestion);
    const pageNumber = (Math.floor((numberQuestion - 1) / 5) + Number(!!(numberQuestion / 5))) * 5;
    setPage(pageNumber);
  }, []);

  const handleRightClick = useCallback(
    (event: any, numberQuestion: number) => {
      event.preventDefault();

      const current = [...flags];

      const isExisted = current.includes(numberQuestion);

      const newFlags = isExisted
        ? current.filter((num) => num !== numberQuestion)
        : [...current, numberQuestion];
      setFlags(newFlags);
    },
    [flags, setFlags]
  );

  const handleFisnish = useCallback(async () => {
    try {
      isFisnish.onTrue();
      await lockSubmission({
        examId: exam.id,
        isLocked: true,
      });
      onUpdateExam(exam.id);
      isFisnish.onFalse();
      setExamSelected(null);
      enqueueSnackbar('Đã hoàn thành bài làm !!');
      push(paths.dashboard.transcript.root);
    } catch (error) {
      console.log(error);
      isFisnish.onFalse();
      enqueueSnackbar('Đã có lỗi xảy ra ! Vui lòng thử lại !', { variant: 'error' });
    }
  }, [isFisnish, lockSubmission, onUpdateExam, push, paths]);

  const handleChangePage = useCallback((value: number) => {
    setPage(value * 5);
    setSelectedQuestion((value - 1) * 5 + 1);
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <BoxAction>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2">Danh sách câu hỏi :</Typography>

              <Tooltip title="Bấm chuột phải vào câu hỏi để gắn cờ">
                <Iconify icon="fluent-emoji-flat:triangular-flag" />
              </Tooltip>
            </Stack>

            <Box gap={1} display="grid" gridTemplateColumns="repeat(7, 1fr)" sx={{ mt: 2 }}>
              {exam.questions.map((question, index) => (
                <BoxQuestion
                  key={index}
                  isSelected={selectedQuestion === index + 1}
                  isChecked={answers.map((answer) => answer.questionId).includes(question.id)}
                  onClick={() => handleSelectedQuestion(index + 1)}
                  onContextMenu={(event) => handleRightClick(event, index + 1)}
                >
                  {flags.includes(index + 1) && (
                    <Iconify
                      icon="fluent-emoji-flat:triangular-flag"
                      width={12}
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}
                    />
                  )}

                  <Typography variant="body2">{index + 1}</Typography>
                </BoxQuestion>
              ))}
            </Box>

            <LinearProgress
              variant="determinate"
              value={Math.round((answers.length / exam.questions.length) * 100)}
              sx={{ mt: 2 }}
            />

            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              Thời gian :{' '}
              <Typography
                variant="caption"
                sx={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: Number(minutes) <= 1 ? 'error.main' : 'primary.main',
                }}
              >
                {hours} giờ : {minutes} phút : {seconds} giây
              </Typography>
            </Typography>

            <Pagination
              page={page / 5}
              color="primary"
              shape="rounded"
              variant="outlined"
              onChange={(event, value) => handleChangePage(value)}
              count={Math.floor(exam.questions.length / 5) + Number(!!(exam.questions.length % 5))}
              sx={{
                mt: 2,
                [`& .${paginationClasses.ul}`]: {
                  justifyContent: 'center',
                },
              }}
            />

            <LoadingButton
              fullWidth
              sx={{ mt: 2 }}
              variant="contained"
              color="primary"
              loading={isFisnish.value}
              onClick={confirmFishish.onTrue}
            >
              Hoàn thành bài làm
            </LoadingButton>
          </BoxAction>
        </Grid>

        <Grid xs={12} md={8}>
          <ExamQuestions
            examId={exam.id}
            questions={exam.questions}
            selectedQuestion={selectedQuestion}
            answers={answers}
            setAnswers={setAnswers}
          />
        </Grid>
      </Grid>

      <ConfirmDialog
        open={confirmFishish.value}
        onClose={confirmFishish.onFalse}
        title="Xác nhận kết thúc bài thi"
        content={`Bạn đã hoàn thành trả lời ${answers.length}/${exam._count.questions} câu hỏi ! Bạn có chắc muốn kết thúc bài thi ?`}
        action={
          <LoadingButton
            variant="contained"
            color="primary"
            loading={isFisnish.value}
            onClick={handleFisnish}
          >
            Kết thúc bài thi
          </LoadingButton>
        }
      />
    </>
  );
}
