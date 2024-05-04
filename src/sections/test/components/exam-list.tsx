import Box from '@mui/material/Box';

import { IExam } from 'src/types/exam';

import ExamItem from './exam-item';

// ----------------------------------------------------------------------

type Props = {
  exams: IExam[];
  setExamSelected: (exam: IExam) => void;
};

export default function ExamList({ exams, setExamSelected }: Props) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {exams.map((exam) => (
        <ExamItem key={exam.id} exam={exam} setExamSelected={setExamSelected} />
      ))}
    </Box>
  );
}
