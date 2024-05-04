'use client';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import { RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function PendingView() {
  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <Container maxWidth={false}>
        <Card sx={{ height: 700, padding: 3 }}>
          Tính năng này đang được phát triển, vui lòng quay lại sau...
        </Card>
      </Container>
    </RoleBasedGuard>
  );
}
