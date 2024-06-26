import React, { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import { useSaleContext } from '../../context';
import IconButtonAnimate from './icon-button-animate';

// ----------------------------------------------------------------------

type Props = {
  productId: number;
  note: string;
};

export default function NoteProduct({ productId, note }: Props) {
  const { onAddNote } = useSaleContext();

  const popover = usePopover();

  const [noteValue, setNoteValue] = useState(note);

  const handleAddNote = useCallback(() => {
    onAddNote(productId, noteValue);
    popover.onClose();
  }, [onAddNote, noteValue, popover]);

  const handleReset = useCallback(() => {
    onAddNote(productId, '');
    setNoteValue('');
    popover.onClose();
  }, [onAddNote, setNoteValue, noteValue, popover]);
  return (
    <>
      <IconButtonAnimate color="primary" onClick={popover.onOpen}>
        <Iconify icon="material-symbols:note-alt" />
      </IconButtonAnimate>

      <CustomPopover open={popover.open} onClose={popover.onClose}>
        <Stack spacing={1} sx={{ padding: 1, width: 420 }}>
          <TextField
            multiline
            rows={4}
            placeholder="Ghi chú về sản phẩm này..."
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
              Thêm mới
            </Button>
          </Stack>
        </Stack>
      </CustomPopover>
    </>
  );
}
