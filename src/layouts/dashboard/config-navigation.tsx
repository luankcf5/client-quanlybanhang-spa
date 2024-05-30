import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  table: icon('ic_table'),
  product: icon('ic_product'),
  order: icon('ic_order'),
  permission: icon('ic_permission'),
  role: icon('ic_role'),
  log: icon('ic_log'),
  sale: icon('ic_sale'),
  staff: icon('ic_staff'),
  voucher: icon('ic_voucher'),
  customer: icon('ic_customer'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      {
        subheader: 'Chức năng bán hàng',
        roles: ['admin', 'staff'],
        items: [
          {
            title: 'Chức năng bán hàng',
            path: paths.dashboard.sale.root,
            icon: ICONS.sale,
            roles: ['admin', 'staff'],
          },
        ],
      },
      {
        subheader: 'Quản lý hệ thống',
        items: [
          {
            title: 'Quản lý nhân viên',
            path: paths.dashboard.staff.root,
            icon: ICONS.staff,
            roles: ['admin'],
            children: [
              {
                title: 'Danh sách nhân viên',
                path: paths.dashboard.staff.list,
                roles: ['admin'],
              },
            ],
          },
          {
            title: 'Quản lý quyền hạn',
            path: paths.dashboard.role.root,
            icon: ICONS.role,
            roles: ['admin'],
            children: [
              {
                title: 'Danh sách quyền hạn',
                path: paths.dashboard.role.list,
                roles: ['admin'],
              },
            ],
          },
        ],
      },
      {
        subheader: 'Quản lý bán hàng',
        items: [
          {
            title: 'Quản lý phòng bàn',
            path: paths.dashboard.table.root,
            icon: ICONS.table,
            roles: ['admin'],
            children: [
              {
                title: 'Danh sách phòng bàn',
                path: paths.dashboard.table.list,
                roles: ['admin'],
              },
            ],
          },
          {
            title: 'Quản lý sản phẩm',
            path: paths.dashboard.product.root,
            icon: ICONS.product,
            roles: ['admin'],
            children: [
              {
                title: 'Danh mục sản phẩm',
                path: paths.dashboard.product.category,
                roles: ['admin'],
              },
              {
                title: 'Danh sách sản phẩm',
                path: paths.dashboard.product.list,
                roles: ['admin'],
              },
            ],
          },
          {
            title: 'Quản lý giảm giá',
            path: paths.dashboard.voucher.root,
            icon: ICONS.voucher,
            roles: ['admin'],
            children: [
              {
                title: 'Danh sách giảm giá',
                path: paths.dashboard.voucher.list,
                roles: ['admin'],
              },
            ],
          },
          {
            title: 'Quản lý khách hàng',
            path: paths.dashboard.customer.root,
            icon: ICONS.customer,
            roles: ['admin', 'staff'],
            children: [
              {
                title: 'Danh sách khách hàng',
                path: paths.dashboard.customer.list,
                roles: ['admin', 'staff'],
              },
            ],
          },
          {
            title: 'Quản lý đơn hàng',
            path: paths.dashboard.order.root,
            icon: ICONS.order,
            roles: ['admin'],
            children: [
              {
                title: 'Danh sách đơn hàng',
                path: paths.dashboard.order.list,
                roles: ['admin'],
              },
            ],
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
