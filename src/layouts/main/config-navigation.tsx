import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Trang chủ',
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: '/',
  },
  {
    title: 'Thi trực tuyến',
    icon: <Iconify icon="solar:atom-bold-duotone" />,
    path: paths.dashboard.exam.root,
  },
  {
    title: 'Tra cứu điểm',
    icon: <Iconify icon="solar:notebook-bold-duotone" />,
    path: paths.dashboard.transcript.root,
  },
];
