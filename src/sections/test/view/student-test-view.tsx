'use client';

import { useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';

import { useGetExams } from 'src/api/exam';
import { RoleBasedGuard } from 'src/auth/guard';

import { useSettingsContext } from 'src/components/settings';

import { IExam } from 'src/types/exam';

import ExamProGress from '../components/exam-progress';
import ExamListView from '../components/exam-list-view';

// ----------------------------------------------------------------------

export default function StudentTestView() {
  const settings = useSettingsContext();

  const { exams } = useGetExams();

  const [examData, setExamData] = useState<IExam[] | []>([]);

  const [examSelected, setExamSelected] = useState<IExam | null>(null);

  useEffect(() => {
    setExamData(exams);
  }, [exams]);

  const onUpdateExam = useCallback(
    (examId: number) => {
      const currentExams = [...examData];
      const newExams = currentExams.map((exam) => {
        if (exam.id === examId) {
          return { ...exam, isLocked: true };
        }
        return exam;
      });
      setExamData(newExams);
    },
    [examData, setExamData]
  );

  return (
    <RoleBasedGuard hasContent roles={['student']}>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        {!examSelected && <ExamListView setExamSelected={setExamSelected} exams={examData} />}

        {examSelected && (
          <ExamProGress
            exam={examSelected}
            setExamSelected={setExamSelected}
            onUpdateExam={onUpdateExam}
          />
        )}
      </Container>
    </RoleBasedGuard>
  );
}
