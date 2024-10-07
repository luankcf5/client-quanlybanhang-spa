import React, { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { updateBill } from 'src/api/bill';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { useSaleContext } from '../../context';
import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

export default function NoteInvoice() {
  const popover = usePopover();

  const { selectedBill } = useSaleContext();

  const [noteValue, setNoteValue] = useState<any>('');

  useEffect(() => {
    setNoteValue(selectedBill?.note);
  }, [selectedBill]);

  const handleReset = useCallback(() => {
    setNoteValue('');
    popover.onClose();
  }, [setNoteValue, popover]);

  const handleAddNote = useCallback(() => {
    popover.onClose();
    updateBill(selectedBill?.id, {
      note: noteValue,
    });
  }, [setNoteValue, popover, updateBill, selectedBill]);

  return (
    <>
      <IconButtonAnimate onClick={popover.onOpen} disabled={!selectedBill}>
        <Badge variant="dot" color="error" invisible={!noteValue}>
          <Iconify icon="icon-park-solid:people-unknown" />
        </Badge>
      </IconButtonAnimate>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="bottom-right">
        <Stack spacing={1} sx={{ padding: 1, width: 420 }}>
          <FormControl fullWidth>
            <InputLabel>Kỹ thuật viên...</InputLabel>
            <Select
              label="Kỹ thuật viên..."
              value={noteValue}
              onChange={(event) => setNoteValue(event.target.value)}
            >
              {['Thi', 'Ngân', 'Hoàng'].map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button size="small" color="error" onClick={handleReset} disabled={!noteValue}>
              Xoá thông tin
            </Button>

            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleAddNote}
              disabled={!noteValue}
            >
              Xác nhận
            </Button>
          </Stack>
        </Stack>
      </CustomPopover>
    </>
  );
}
