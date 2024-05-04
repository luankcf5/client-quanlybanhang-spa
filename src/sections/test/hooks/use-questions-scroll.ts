import { useRef, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

export default function useQuestionsScroll(selectedQuestion: number) {
  const questionsScrollRef = useRef<HTMLDivElement>(null);

  const scrollMessagesToBottom = useCallback(() => {
    if (!selectedQuestion) {
      return;
    }

    if (!questionsScrollRef.current) {
      return;
    }

    if (questionsScrollRef.current) {
      questionsScrollRef.current.scrollTop = 0;
    }
  }, [selectedQuestion]);

  useEffect(() => {
    scrollMessagesToBottom();
  }, [selectedQuestion]);

  return {
    questionsScrollRef,
  };
}
