import React, { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CardActionArea from '@mui/material/CardActionArea';

import { _category } from 'src/_mock/_category';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ProductHeader() {
  const openCategory = usePopover();

  const [filterValue, setFilterValue] = useState<string[]>([]);

  const [searchValue, setSearchValue] = useState('');

  const onSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const onFilter = useCallback(
    (category: string) => {
      const checked = filterValue.includes(category)
        ? filterValue.filter((value) => value !== category)
        : [...filterValue, category];

      setFilterValue(checked);
    },
    [filterValue, setFilterValue]
  );

  const onReset = useCallback(() => {
    setFilterValue([]);
  }, [setFilterValue]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" p={1}>
      <TextField
        size="small"
        value={searchValue}
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

      <Badge color="error" variant="dot" invisible={!filterValue.length}>
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
              {_category.map((category) => {
                const selected = filterValue.includes(category.name);

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
