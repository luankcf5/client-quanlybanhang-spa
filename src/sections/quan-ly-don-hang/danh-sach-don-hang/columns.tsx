/* eslint-disable no-nested-ternary */
import { sumBy } from 'lodash';

import { GridColDef } from '@mui/x-data-grid';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fDateTime } from 'src/utils/format-time';

import Label from 'src/components/label';

// ----------------------------------------------------------------------

export const baseColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Id',
    filterable: false,
  },
  {
    field: 'nameinvoice',
    headerName: 'Số đơn hàng',
    flex: 1,
    minWidth: 180,
    hideable: false,
    renderCell: (params) => `Đơn hàng số ${params.row.id}`,
  },
  {
    field: 'statusId',
    headerName: 'Trạng thái',
    headerAlign: 'center',
    align: 'center',
    hideable: false,
    filterable: false,
    flex: 1,
    minWidth: 160,
    renderCell: (params) => (
      <Label
        variant="soft"
        color={
          params.row.statusId === 1 ? 'success' : params.row.statusId === 2 ? 'primary' : 'error'
        }
      >
        {params.row.statusId === 1
          ? 'Đang chờ thanh toán'
          : params.row.statusId === 2
            ? 'Đã thanh toán'
            : 'Đã huỷ đơn hàng'}
      </Label>
    ),
  },
  {
    field: 'totalProduct',
    headerName: 'Tổng sản phẩm',
    flex: 1,
    minWidth: 270,
    renderCell: (params) => `Tổng ${params.row.products.length} sản phẩm`,
  },
  {
    field: 'totalPrice',
    headerName: 'Tổng giá trị',
    flex: 1,
    minWidth: 180,
    renderCell: (params) =>
      fCurrency(
        sumBy(
          JSON.parse(params.row.log),
          (prod: any) => prod.amount * (prod.product.price - prod.product.discount)
        )
      ),
  },
  {
    field: 'discountPrice',
    headerName: 'Giảm giá',
    flex: 1,
    minWidth: 180,
    renderCell: (params) => fCurrency(params.row.discountPrice),
  },

  {
    type: 'date',
    field: 'createdAt',
    headerName: 'Thời gian tạo',
    headerAlign: 'center',
    align: 'center',
    filterable: false,
    flex: 1,
    minWidth: 200,
    valueFormatter: (params) => fDate(params.value.createdAt),
    renderCell: (params) => fDateTime(params.row.createdAt),
  },
  {
    type: 'date',
    field: 'updatedAt',
    headerName: 'Cập nhật gần nhất',
    headerAlign: 'center',
    align: 'center',
    filterable: false,
    flex: 1,
    minWidth: 200,
    valueFormatter: (params) => fDate(params.value.updatedAt),
    renderCell: (params) => fDateTime(params.row.updatedAt),
  },
];
