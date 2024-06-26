import { Font, StyleSheet } from '@react-pdf/renderer';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

const styles = StyleSheet.create({
  col4: { width: '25%' },
  col8: { width: '75%' },
  col6: { width: '50%' },
  col12: { width: '100%' },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb40: { marginBottom: 40 },
  overline: {
    fontSize: 8,
    marginBottom: 8,
    fontWeight: 700,
  },
  h3: { fontSize: 16, fontWeight: 700, textTransform: 'uppercase' },
  h4: { fontSize: 13, fontWeight: 700 },
  h5: { fontSize: 10, fontWeight: 500 },
  body1: { fontSize: 10 },
  subtitle2: { fontSize: 10, fontWeight: 700 },
  alignRight: { textAlign: 'right' },
  alignCenter: { textAlign: 'center' },
  page: {
    paddingRight: 8,
    fontSize: 8,
    lineHeight: 1.6,
    fontWeight: 900,
    fontFamily: 'Roboto',
    backgroundColor: '#FFFFFF',
  },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  table: { display: 'flex', width: 'auto' },
  tableHeader: {},
  tableBody: {},
  tableRow: {
    padding: '8px 0',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#DFE3E8',
  },
  noBorder: { paddingTop: 8, paddingBottom: 0, borderBottomWidth: 0 },
  tableCell_1: { width: '10%' },
  tableCell_2: {
    width: '50%',
    paddingRight: 16,
  },
  tableCell_3: { width: '33%' },
  tableCell_5: { width: '50%' },
});

export default styles;
