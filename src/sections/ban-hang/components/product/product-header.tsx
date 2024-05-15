import React, { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CardActionArea from '@mui/material/CardActionArea';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { ICategory } from 'src/types/category';

// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  setFilterName: (name: string) => void;
  filterCategory: string[];
  setFilterCategory: (category: string[]) => void;
  categories: ICategory[];
};

export default function ProductHeader({
  categories,
  filterName,
  setFilterName,
  filterCategory,
  setFilterCategory,
}: Props) {
  const openCategory = usePopover();

  const onSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterName(event.target.value);
    },
    [setFilterName]
  );

  const onFilter = useCallback(
    (category: string) => {
      const checked = filterCategory.includes(category)
        ? filterCategory.filter((value) => value !== category)
        : [...filterCategory, category];

      setFilterCategory(checked);
    },
    [filterCategory, setFilterCategory]
  );

  const onReset = useCallback(() => {
    setFilterCategory([]);
  }, [filterCategory, setFilterCategory]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" p={1}>
      <TextField
        size="small"
        value={filterName}
        onChange={onSearch}
        placeholder="Tìm kiếm sản phẩm..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      <Badge color="error" variant="dot" invisible={!filterCategory.length}>
        <Button
          variant="contained"
          color="primary"
          endIcon={
            <Iconify icon={openCategory.open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
          }
          onClick={openCategory.onOpen}
        >
          Phân loại
        </Button>
      </Badge>

      <CustomPopover
        hiddenArrow
        open={openCategory.open}
        onClose={openCategory.onClose}
        sx={{ p: 1, width: 320 }}
      >
        <Stack spacing={1}>
          <Scrollbar sx={{ maxHeight: 350 }}>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(1, 1fr)' }}
              gap={1}
            >
              {categories.map((category) => {
                const selected = filterCategory.includes(category.name);

                return (
                  <CardActionArea
                    key={category.id}
                    onClick={() => onFilter(category.name)}
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      cursor: 'pointer',
                      color: 'text.secondary',
                      border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
                      ...(selected && {
                        color: 'text.primary',
                        bgcolor: 'action.selected',
                      }),
                    }}
                  >
                    <Stack spacing={1} direction="row">
                      <Typography variant="body2">{category.name}</Typography>
                    </Stack>
                  </CardActionArea>
                );
              })}
            </Box>
          </Scrollbar>

          <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end">
            <Button variant="outlined" color="inherit" onClick={onReset}>
              Làm mới
            </Button>

            <Button variant="contained" color="primary" onClick={openCategory.onClose}>
              Lọc dữ liệu
            </Button>
          </Stack>
        </Stack>
      </CustomPopover>
    </Stack>
  );
}
