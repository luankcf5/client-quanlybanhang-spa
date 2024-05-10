// ----------------------------------------------------------------------

import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

export default function BanHangFooter() {
  const [tabView, setTabView] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabView(newValue);
  };

  return (
    <Box>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        spacing={2}
        alignItems="center"
      >
        <Box sx={{ px: 2 }}>
          <Tabs value={tabView} onChange={handleChange} variant="scrollable">
            <Tab label="Hoá đơn" value="1" icon={<Iconify icon="solar:bill-list-bold" />} />
            <Tab
              label="Phòng / bàn"
              value="2"
              icon={<Iconify icon="material-symbols:meeting-room" />}
            />
          </Tabs>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="subtitle2" fontWeight="bold" sx={{ mr: 1.5 }}>
          Bản quyền công ty cổ phần IIT © 2024
        </Typography>
      </Stack>
    </Box>
  );
}
