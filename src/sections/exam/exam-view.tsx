'use client';

import { useEffect } from 'react';

import { fDateTime } from 'src/utils/format-time';

import TableData from 'src/table';
import { useGetExams } from 'src/api/exam';
import { useGetClasses } from 'src/api/class';
import { RoleBasedGuard } from 'src/auth/guard';
import { useGetQuestions } from 'src/api/question';
import { useTableContext } from 'src/table/context';

import Form from './form';
import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function ExamView() {
  const { exams } = useGetExams();

  const { classes } = useGetClasses();

  const { questions } = useGetQuestions();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: exams,
      table_column: baseColumns,
      table_selected: [],
      table_import_data: null,
      table_export_data: exams.map((exam) => ({
        'Tên bài thi': exam.name,
        'Mã bài thi': exam.code,
        'Mật mã bài thi': exam.password,
        'Thuộc môn': exam.subject,
        'Thời gian làm bài': `${exam.duration} phút`,
        'Tổng câu hỏi': `${exam.questions.length} câu hỏi`,
        'Thời gian bắt đầu': fDateTime(exam.start),
        'Thời gian kết thúc': fDateTime(exam.end),
      })),
      table_config: {
        table_name: 'exams',
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
  }, [exams]);

  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <TableData />
      <Form classes={classes} questions={questions} />
    </RoleBasedGuard>
  );
}
