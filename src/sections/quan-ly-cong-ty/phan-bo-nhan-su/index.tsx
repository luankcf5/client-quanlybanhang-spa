'use client';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';

import { RoleBasedGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

export default function PhanBoNhanSu() {
  return (
    <RoleBasedGuard hasContent roles={['teacher']}>
      <Container maxWidth={false}>
        <Card>Test</Card>
      </Container>
    </RoleBasedGuard>
  );
}
