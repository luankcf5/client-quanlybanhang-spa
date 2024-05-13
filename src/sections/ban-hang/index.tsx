'use client';

import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { RoleBasedGuard } from 'src/auth/guard';

import { SaleProvider } from './context';
import Invoice from './components/invoice';
import BanHangFooter from './components/footer';
import BanHangHeader from './components/header';
import TableRoom from './components/table-room';
import ProductContainer from './components/product';

// ----------------------------------------------------------------------

export default function BanHang() {
  const [tabView, setTabView] = useState('1');

  return (
    <SaleProvider>
      <RoleBasedGuard hasContent roles={['teacher']}>
        <Card
          sx={{
            borderRadius: 0,
            height: 'calc(100vh - 56px)',
          }}
        >
          <Stack height="100%" justifyContent="space-between">
            <BanHangHeader />
            {tabView === '1' && (
              <Grid container sx={{ p: 1, height: '100%' }}>
                <Grid xs={12} md={6}>
                  <Invoice />
                </Grid>
                <Grid xs={12} md={6}>
                  <ProductContainer />
                </Grid>
              </Grid>
            )}
            {tabView === '2' && <TableRoom />}
            <BanHangFooter tabView={tabView} setTabView={setTabView} />
          </Stack>
        </Card>
      </RoleBasedGuard>
    </SaleProvider>
  );
}
