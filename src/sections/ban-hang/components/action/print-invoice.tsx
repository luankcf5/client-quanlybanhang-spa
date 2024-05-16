import { sumBy } from 'lodash';
import { Page, Text, View, Document, PDFViewer } from '@react-pdf/renderer';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DialogActions from '@mui/material/DialogActions';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import styles from './print-invoice-style';

// ----------------------------------------------------------------------

type InvoicePDFProps = {
  invoice: any;
  products: any;
  open: boolean;
  onClose: VoidFunction;
};

export default function PrintInvoice({ invoice, products, open, onClose }: InvoicePDFProps) {
  const totalPrice = sumBy(
    products,
    (prod: any) => prod.amount * (prod.product.price - prod.product.discount)
  );

  return (
    <Dialog fullScreen open={open}>
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <DialogActions
          sx={{
            zIndex: 9,
            padding: '12px !important',
            boxShadow: (theme) => theme.customShadows.z8,
          }}
        >
          <Tooltip title="Đóng">
            <IconButton color="inherit" onClick={onClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
          </Tooltip>
        </DialogActions>
        <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
          <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
            <Document>
              <Page size="C8" style={styles.page}>
                <View style={[styles.gridContainer, styles.mb8]}>
                  <View style={{ alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                    <Text style={styles.h4}>HOÁ ĐƠN THANH TOÁN</Text>

                    <Text style={styles.h4}>Hoá đơn số {invoice?.id}</Text>
                    <Text>{`Ngày: ${fDateTime(invoice?.createdAt)}`}</Text>
                  </View>
                </View>

                <View style={[styles.gridContainer, styles.mb4]}>
                  <View style={styles.col12}>
                    <Text style={[styles.overline]}>Khách hàng : {invoice?.customer?.name}</Text>
                  </View>
                </View>

                <Text style={[styles.overline, styles.mb4]}>Chi tiết đơn hàng</Text>

                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCell_1}>
                        <Text style={styles.subtitle2}>STT</Text>
                      </View>

                      <View style={styles.tableCell_2}>
                        <Text style={styles.subtitle2}>Tên</Text>
                      </View>

                      <View style={styles.tableCell_3}>
                        <Text style={styles.subtitle2}>SL</Text>
                      </View>

                      <View style={styles.tableCell_3}>
                        <Text style={styles.subtitle2}>Đơn giá</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tableBody}>
                    {products?.map((product: any, index: number) => (
                      <View style={styles.tableRow} key={product.id}>
                        <View style={styles.tableCell_1}>
                          <Text style={styles.body1}>{index + 1}</Text>
                        </View>

                        <View style={styles.tableCell_2}>
                          <Text style={styles.subtitle2}>{product.product.name}</Text>
                        </View>

                        <View style={styles.tableCell_3}>
                          <Text style={styles.body1}>{product.amount}</Text>
                        </View>

                        <View style={styles.tableCell_3}>
                          <Text style={styles.body1}>
                            {fCurrency(product.product.price - product.product.discount)}
                          </Text>
                        </View>
                      </View>
                    ))}

                    <View style={[styles.tableRow, styles.noBorder]}>
                      <View style={styles.tableCell_5}>
                        <Text style={styles.h4}>Tổng tiền : </Text>
                      </View>
                      <View style={[styles.tableCell_5, styles.alignRight]}>
                        <Text style={styles.h4}>{fCurrency(totalPrice || '0đ')}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </Box>
      </Box>
    </Dialog>
  );
}
