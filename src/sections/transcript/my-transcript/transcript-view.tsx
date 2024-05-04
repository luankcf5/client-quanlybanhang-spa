'use client';

import { useEffect } from 'react';

import TableData from 'src/table';
import { RoleBasedGuard } from 'src/auth/guard';
import { useTableContext } from 'src/table/context';
import { useGetMySubmission } from 'src/api/submission';

import { baseColumns } from './columns';

// ----------------------------------------------------------------------

export default function MyTranscriptView() {
  const { submissions } = useGetMySubmission();

  const { setValues } = useTableContext();

  useEffect(() => {
    setValues({
      table_data: submissions
        .filter((sub) => sub.isLocked)
        .map((submission, index) => ({ ...submission, id: index + 1 })),
      table_column: baseColumns,
      table_selected: [],
      table_import_data: null,
      table_export_data: submissions.map((submission) => ({
        'Tên bài thi': submission.exam.name,
        'Bài thi thuộc môn': submission.exam.subject,
        'Mã bài thi': submission.exam.code,
        'Thời gian làm bài': `${submission.exam.duration} phút`,
        'Số câu hỏi': `${submission.exam._count.questions} câu hỏi`,
        'Kết quả điểm': `${submission.point} điểm`,
      })),
      table_config: {
        table_name: 'submissions',
        add_data: false,
        add_multi_data: false,
        import_data: false,
        export_data: true,
        selected_data: false,
        delete_multi: false,
        active_row: false,
        edit_row: false,
        delete_row: false,
      },
    });
  }, [submissions]);

  return (
    <RoleBasedGuard hasContent roles={['student']}>
      <TableData />
    </RoleBasedGuard>
  );
}
