'use client';

import ExamView from 'src/sections/exam/exam-view';

import StudentTestView from './student-test-view';

// ----------------------------------------------------------------------

export default function TestView() {
  const role = sessionStorage.getItem('role');
  return <>{role === 'student' ? <StudentTestView /> : <ExamView />}</>;
}
