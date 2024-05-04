import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { createSubmission } from 'src/api/submission';

import Markdown from 'src/components/markdown';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';

import { IChoiceAnswer } from 'src/types/exam';
import { IQuestion } from 'src/types/question';

import useQuestionsScroll from '../hooks/use-questions-scroll';

// ----------------------------------------------------------------------

const BoxQuestion = styled(Box)(({ theme }) => ({
  padding: 12,
  marginBottom: 12,
  marginRight: 12,
  borderRadius: 8,
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

type Props = {
  examId: number | string;
  questions: IQuestion[];
  selectedQuestion: number;
  answers: IChoiceAnswer[];
  setAnswers: any;
};

// ----------------------------------------------------------------------

export default function ExamQuestions({
  examId,
  questions,
  selectedQuestion,
  answers,
  setAnswers,
}: Props) {
  const { questionsScrollRef } = useQuestionsScroll(selectedQuestion);

  const { enqueueSnackbar } = useSnackbar();

  const handleChangeChoice = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => {
      try {
        const currentAnswers = [...answers].filter((answer) => answer.questionId !== questionId);
        const newAnswer = { questionId, answerId: event.target.value };
        setAnswers([...currentAnswers, newAnswer]);

        await createSubmission({
          examId,
          questionId,
          answerId: +event.target.value,
        });
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Đã có lỗi xảy ra ! Vui lòng thử lại !', { variant: 'error' });
      }
    },
    [answers, setAnswers]
  );

  return (
    <Scrollbar ref={questionsScrollRef} sx={{ maxHeight: '81vh' }}>
      {questions.slice(selectedQuestion - 1, selectedQuestion + 4).map((question, index) => (
        <BoxQuestion>
          <Stack>
            <Typography variant="body2">
              <strong>
                Câu số {selectedQuestion + index} : ( {question.point} điểm )
              </strong>
            </Typography>

            <Markdown children={question.content} />
          </Stack>

          <RadioGroup onChange={(event) => handleChangeChoice(event, question.id)}>
            {question.answers.map((answer, inx) => (
              <FormControlLabel
                key={inx}
                value={answer.id}
                checked={answers.map((ans: any) => +ans.answerId).includes(answer.id)}
                control={<Radio />}
                label={<Markdown children={answer.content} />}
              />
            ))}
          </RadioGroup>
        </BoxQuestion>
      ))}
    </Scrollbar>
  );
}
