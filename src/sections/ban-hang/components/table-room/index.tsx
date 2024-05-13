import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { fCurrency } from 'src/utils/format-number';

import { _table } from 'src/_mock/_table';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function TableRoom() {
  return (
    <Box sx={{ p: 1, height: '100%' }}>
      <Grid container spacing={2}>
        {_table.map((table, index) => (
          <Grid key={table.id} xs={6} md={2}>
            <CardActionArea>
              <Card sx={{ aspectRatio: '1/1', boxShadow: (theme) => theme.shadows[3] }}>
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingTop={1}
                  height="100%"
                  width="100%"
                >
                  <Typography variant="subtitle2">Phòng bàn {index}</Typography>
                  <Iconify
                    width={56}
                    color={table.isVip ? 'warning.main' : 'unset'}
                    icon={table.isVip ? 'tabler:vip' : 'ic:baseline-table-restaurant'}
                  />
                  <Button
                    fullWidth
                    color={table.isPayment ? 'info' : 'primary'}
                    variant="contained"
                    sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                  >
                    {table.isPayment ? fCurrency(table.totalPrice) : 'Gọi món'}
                  </Button>
                </Stack>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
