import { memo } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { useBoolean } from 'src/hooks/use-boolean';

import { paper } from 'src/theme/css';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { keyboardOption } from '../constants/keyboardOption';

// ----------------------------------------------------------------------

function ShortcutAction() {
  const theme = useTheme();

  const openKeyboard = useBoolean();
  return (
    <>
      <Button
        size="small"
        startIcon={<Iconify icon="mdi:keyboard-settings" />}
        onClick={openKeyboard.onTrue}
      >
        Phím
      </Button>

      <Drawer
        anchor="right"
        open={openKeyboard.value}
        onClose={openKeyboard.onFalse}
        slotProps={{
          backdrop: { invisible: true },
        }}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            ...paper({ theme, bgcolor: theme.palette.background.default }),
            padding: 2,
            width: 520,
          },
        }}
      >
        <Typography variant="h6">Phím tắt</Typography>
        {keyboardOption.map((keyboard, index) => (
          <Stack key={`keyboard ${index}`} spacing={1}>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              {keyboard.label}
            </Typography>

            {keyboard.items.map((shortcut, inx) => (
              <Grid key={`shortcut ${inx}`} container sx={{ typography: 'caption' }}>
                <Grid xs={5}>
                  <Label>{shortcut.keys}</Label>
                </Grid>
                <Grid xs={7}>{shortcut.description}</Grid>
              </Grid>
            ))}
          </Stack>
        ))}
      </Drawer>
    </>
  );
}

export default memo(ShortcutAction);
