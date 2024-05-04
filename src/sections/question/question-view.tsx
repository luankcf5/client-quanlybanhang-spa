'use client';

import { useEffect } from 'react';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import { RoleBasedGuard } from 'src/auth/guard';
import { useGetQuestions } from 'src/api/question';
import { useTableContext } from 'src/table/context';

import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function QuestionView() {
  const { questions } = useGetQuestions();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: questions,
      table_column: baseColumns,
      table_selected: [],
      table_import_data: null,
      table_export_data: questions.map((question) => ({
        'Nội dung câu hỏi': question.content,
        'Thuộc môn học': question.subject,
        'Số đáp án': question.answers.length,
        'Điểm câu hỏi': question.point,
      })),
      table_config: {
        table_name: 'questions',
        add_data: true,
        add_multi_data: false,
        import_data: false,
        export_data: true,
        selected_data: true,
        delete_multi: true,
        change_status_multi: false,
        active_row: false,
        edit_row: true,
        delete_row: true,
      },
    });
  }, [questions]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <Container maxWidth={false}>
        <Card>Tính năng đang được phát triển, vui lòng quay lại sau...</Card>
      </Container>
    </RoleBasedGuard>
  );
}
