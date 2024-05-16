import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { useGetRooms } from 'src/api/room';

import Iconify from 'src/components/iconify';

import { IRoom } from 'src/types/room';

import Form from './form';

// ----------------------------------------------------------------------

export default function TableRoom() {
  const { rooms } = useGetRooms();

  const openForm = useBoolean();

  const [roomList, setRoomList] = useState<IRoom[]>([]);

  useEffect(() => {
    setRoomList(rooms);
  }, [rooms]);

  const handleAddRoom = useCallback(
    (newRoom: IRoom) => {
      setRoomList((pre) => [...pre, newRoom]);
    },
    [setRoomList]
  );

  return (
    <>
      <Box sx={{ p: 1, height: '100%' }}>
        <Grid container spacing={2}>
          {roomList.map((room, index) => (
            <Grid key={room.id} xs={6} md={2}>
              <CardActionArea>
                <Card sx={{ aspectRatio: '1/1', boxShadow: (theme) => theme.shadows[3] }}>
                  <Stack
                    justifyContent="space-between"
                    alignItems="center"
                    paddingTop={1}
                    height="100%"
                    width="100%"
                  >
                    <Typography variant="subtitle2">{room.name}</Typography>
                    <Iconify
                      width={56}
                      color={room.isVip ? 'warning.main' : 'unset'}
                      icon={room.isVip ? 'tabler:vip' : 'ic:baseline-table-restaurant'}
                    />
                    <Button
                      fullWidth
                      color={room.isVip ? 'warning' : 'primary'}
                      variant="contained"
                      sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    >
                      {room.isVip ? fCurrency(200000) : 'Gọi món'}
                    </Button>
                  </Stack>
                </Card>
              </CardActionArea>
            </Grid>
          ))}

          <Grid xs={6} md={2}>
            <CardActionArea onClick={openForm.onTrue}>
              <Card sx={{ aspectRatio: '1/1', boxShadow: (theme) => theme.shadows[3] }}>
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  paddingTop={1}
                  height="100%"
                  width="100%"
                >
                  <Typography variant="subtitle2">Bàn mới</Typography>
                  <Iconify width={56} icon="ic:baseline-table-restaurant" />
                  <Button
                    fullWidth
                    color="secondary"
                    variant="contained"
                    sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                  >
                    Thêm bàn
                  </Button>
                </Stack>
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
      </Box>

      <Form open={openForm.value} onClose={openForm.onFalse} onAddRoom={handleAddRoom} />
    </>
  );
}
