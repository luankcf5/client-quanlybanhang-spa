'use client';

import orderBy from 'lodash/orderBy';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { IExam } from 'src/types/exam';

import ExamList from './exam-list';
import ExamSort from './exam-sort';
import ExamSearch from './exam-search';

// ----------------------------------------------------------------------

const JOB_SORT_OPTIONS = [
  { value: 'Ngày mới nhất', label: 'Ngày mới nhất' },
  { value: 'Ngày cũ nhất', label: 'Ngày cũ nhất' },
];

// ----------------------------------------------------------------------

type Props = {
  exams: IExam[];
  setExamSelected: (exam: IExam) => void;
};

export default function ExamListView({ exams, setExamSelected }: Props) {
  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState('Ngày mới nhất');

  const [search, setSearch] = useState<string>('');

  const dataFiltered = applyFilter({
    inputData: exams,
    searchBy: search,
    sortBy,
  });

  const notFound = !dataFiltered.length;

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <ExamSearch search={search} onSearch={handleSearch} />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <ExamSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}
      </Stack>

      {notFound && <EmptyContent filled title="Không có bài thi" sx={{ py: 10 }} />}

      <ExamList exams={dataFiltered} setExamSelected={setExamSelected} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  searchBy,
  sortBy,
}: {
  inputData: IExam[];
  searchBy: string;
  sortBy: string;
}) => {
  if (searchBy) {
    inputData = inputData.filter(
      (exam) => exam.name.toLowerCase().indexOf(searchBy.toLowerCase()) !== -1
    );
  }

  if (sortBy === 'Ngày mới nhất') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'Ngày cũ nhất') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  return inputData;
};
