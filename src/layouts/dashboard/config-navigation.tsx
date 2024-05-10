import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  store: icon('ic_store'),
  product: icon('ic_product'),
  order: icon('ic_order'),
  permission: icon('ic_permission'),
  role: icon('ic_role'),
  log: icon('ic_log'),
  sale: icon('ic_sale'),
  staff: icon('ic_staff'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      {
        subheader: 'Chức năng bán hàng',
        items: [
          {
            title: 'Chức năng bán hàng',
            path: paths.dashboard.sale.root,
            icon: ICONS.sale,
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
            children: [
              {
                title: 'Danh sách nhân viên',
                path: paths.dashboard.staff.list,
                roles: ['teacher'],
              },
            ],
          },
          {
            title: 'Nhật ký hệ thống',
            path: paths.dashboard.logsystem.root,
            icon: ICONS.log,
            children: [
              {
                title: 'Nhật ký truy cập',
                path: paths.dashboard.logsystem.login,
                roles: ['teacher'],
              },
              {
                title: 'Tra cứu tài khoản',
                path: paths.dashboard.logsystem.search,
                roles: ['teacher'],
              },
            ],
          },
          {
            title: 'Quản lý chức năng',
            path: paths.dashboard.permission.root,
            icon: ICONS.permission,
            children: [
              {
                title: 'Các nhóm chức năng',
                path: paths.dashboard.permission.group,
                roles: ['teacher'],
              },
              {
                title: 'Danh sách chức năng',
                path: paths.dashboard.permission.list,
                roles: ['teacher'],
              },
            ],
          },
          {
            title: 'Quản lý quyền hạn',
            path: paths.dashboard.role.root,
            icon: ICONS.role,
            children: [
              {
                title: 'Danh sách quyền hạn',
                path: paths.dashboard.role.list,
                roles: ['teacher'],
              },
              {
                title: 'Cấp quyền người dùng',
                path: paths.dashboard.role.grant,
                roles: ['teacher'],
              },
            ],
          },
          {
            title: 'Quản lý cửa hàng',
            path: paths.dashboard.store.root,
            icon: ICONS.store,
            children: [
              {
                title: 'Danh sách cửa hàng',
                path: paths.dashboard.store.list,
                roles: ['teacher'],
              },
            ],
          },
        ],
      },
      {
        subheader: 'Quản lý bán hàng',
        items: [
          {
            title: 'Quản lý sản phẩm',
            path: paths.dashboard.product.root,
            icon: ICONS.product,
            children: [
              {
                title: 'Danh mục sản phẩm',
                path: paths.dashboard.product.category,
                roles: ['teacher'],
              },
              {
                title: 'Danh sách sản phẩm',
                path: paths.dashboard.product.list,
                roles: ['teacher'],
              },
            ],
          },
          {
            title: 'Quản lý đơn hàng',
            path: paths.dashboard.order.root,
            icon: ICONS.order,
            children: [
              {
                title: 'Danh sách đơn hàng',
                path: paths.dashboard.order.list,
                roles: ['teacher'],
              },
              {
                title: 'Đơn hàng đã huỷ',
                path: paths.dashboard.order.cancel,
                roles: ['teacher'],
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
