'use client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { RoleBasedGuard } from 'src/auth/guard';

import BanHangHeader from './components/header';
import BanHangFooter from './components/footer';

// ----------------------------------------------------------------------

export default function BanHang() {
  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <Card sx={{ height: 'calc(100vh - 56px)', borderRadius: 0 }}>
        <Stack height="100%" justifyContent="space-between">
          <BanHangHeader />
          <BanHangFooter />
        </Stack>
      </Card>
    </RoleBasedGuard>
  );
}
