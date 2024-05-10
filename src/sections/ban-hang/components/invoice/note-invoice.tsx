import React, { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

export default function NoteInvoice() {
  const popover = usePopover();

  const [noteValue, setNoteValue] = useState('');

  const handleReset = useCallback(() => {
    setNoteValue('');
    popover.onClose();
  }, [setNoteValue, popover]);

  const handleAddNote = useCallback(() => {
    popover.onClose();
  }, [setNoteValue, popover]);

  return (
    <>
      <IconButtonAnimate onClick={popover.onOpen}>
        <Badge variant="dot" color="error" invisible={!noteValue}>
          <Iconify icon="material-symbols:note-alt" />
        </Badge>
      </IconButtonAnimate>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="bottom-right">
        <Stack spacing={1} sx={{ padding: 1, width: 420 }}>
          <TextField
            multiline
            rows={6}
            size="small"
            placeholder="Ghi chú về đơn hàng..."
            value={noteValue}
            onChange={(event) => setNoteValue(event.target.value)}
          />

          <Stack direction="row" justifyContent="end" spacing={1}>
            <Button size="small" color="error" onClick={handleReset} disabled={!noteValue}>
              Xoá ghi chú
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
