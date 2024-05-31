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
  title: string;
  invoice: any;
  products: any;
  open: boolean;
  onClose: VoidFunction;
};

export default function PrintInvoice({ title, invoice, products, open, onClose }: InvoicePDFProps) {
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
              <Page wrap={false} size="C8" style={styles.page}>
                <View style={[styles.gridContainer, styles.mb8]}>
                  <View style={{ alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                    <Text style={styles.h5}>SPA SAN SAN</Text>

                    <Text style={[styles.body1, styles.alignCenter]}>
                      A3-21 Đường 1B Khu Nam Long
                    </Text>
                    <Text style={[styles.body1, styles.alignCenter]}>
                      Hưng Thạnh, Q.Cái Răng, TP.Cần Thơ
                    </Text>

                    <Text style={[styles.body1, styles.alignCenter]}>
                      Hotline/Zalo : 0913 984 886
                    </Text>

                    <Text style={styles.h4}>{title}</Text>

                    <Text style={styles.h4}>Hoá đơn số {invoice?.id}</Text>
                    <Text>{`${fDateTime(invoice?.createdAt)}`}</Text>
                  </View>
                </View>

                <View style={[styles.gridContainer]}>
                  <View style={styles.col12}>
                    <Text style={[styles.overline]}>Khách hàng : {invoice?.customer?.name}</Text>
                  </View>
                </View>

                <Text style={[styles.overline]}>Chi tiết đơn hàng</Text>

                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableCell_2}>
                        <Text style={styles.subtitle2}>Tên dịch vụ</Text>
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

                    {invoice?.name && (
                      <>
                        <View style={[styles.tableRow, styles.noBorder]}>
                          <View style={styles.tableCell_5}>
                            <Text style={styles.body1}>Địa chỉ giao hàng : </Text>
                          </View>
                          <View style={[styles.tableCell_5, styles.alignRight]}>
                            <Text style={styles.body1}>{invoice?.address || 'Không'}</Text>
                          </View>
                        </View>
                        <View style={[styles.tableRow, styles.noBorder]}>
                          <View style={styles.tableCell_5}>
                            <Text style={styles.body1}>Điện thoại giao hàng : </Text>
                          </View>
                          <View style={[styles.tableCell_5, styles.alignRight]}>
                            <Text style={styles.body1}>{invoice?.phone || 'Không'}</Text>
                          </View>
                        </View>
                        <View style={[styles.tableRow, styles.noBorder]}>
                          <View style={styles.tableCell_5}>
                            <Text style={styles.body1}>Người nhận hàng : </Text>
                          </View>
                          <View style={[styles.tableCell_5, styles.alignRight]}>
                            <Text style={styles.body1}>{invoice?.name || 'Không'}</Text>
                          </View>
                        </View>
                        <View style={[styles.tableRow, styles.noBorder]}>
                          <View style={styles.tableCell_5}>
                            <Text style={styles.body1}>Phí giao hàng : </Text>
                          </View>
                          <View style={[styles.tableCell_5, styles.alignRight]}>
                            <Text style={styles.body1}>{fCurrency(invoice?.fee) || '0đ'}</Text>
                          </View>
                        </View>
                      </>
                    )}

                    <View style={[styles.tableRow, styles.noBorder]}>
                      <View style={styles.tableCell_5}>
                        <Text style={styles.body1}>Kỹ thuật viên : </Text>
                      </View>
                      <View style={[styles.tableCell_5, styles.alignRight]}>
                        <Text style={styles.body1}>{invoice?.note || 'Không'}</Text>
                      </View>
                    </View>

                    {invoice?.discountPrice > 0 && (
                      <View style={[styles.tableRow, styles.noBorder]}>
                        <View style={styles.tableCell_5}>
                          <Text style={styles.body1}>Giảm giá : </Text>
                        </View>
                        <View style={[styles.tableCell_5, styles.alignRight]}>
                          <Text style={styles.body1}>
                            {fCurrency(invoice?.discountPrice || '0đ')}
                          </Text>
                        </View>
                      </View>
                    )}

                    <View style={[styles.tableRow, styles.noBorder]}>
                      <View style={styles.tableCell_5}>
                        <Text style={styles.h4}>Tổng tiền : </Text>
                      </View>
                      <View style={[styles.tableCell_5, styles.alignRight]}>
                        <Text style={styles.h4}>
                          {fCurrency(totalPrice - Number(invoice?.discountPrice) || '0đ')}
                        </Text>
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
