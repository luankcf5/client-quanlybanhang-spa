'use client';

import MyTranscriptView from './my-transcript/transcript-view';
import StudentTranscriptView from './student-transcript/transcript-view';

// ----------------------------------------------------------------------

export default function TranscriptView() {
  const role = sessionStorage.getItem('role');
  return <>{role === 'student' ? <MyTranscriptView /> : <StudentTranscriptView />}</>;
}
