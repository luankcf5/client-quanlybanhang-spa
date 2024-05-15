import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';

import { _invoice } from 'src/_mock';

import Scrollbar from 'src/components/scrollbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function InvoiceChange() {
  const openListInvoice = usePopover();
  return (
    <>
      <Stack>
        <Button variant="contained" color="secondary" onClick={openListInvoice.onOpen}>
          Hoá đơn mới
        </Button>
      </Stack>

      <CustomPopover
        hiddenArrow
        open={openListInvoice.open}
        onClose={openListInvoice.onClose}
        arrow="top-left"
        sx={{ width: 280 }}
      >
        <Scrollbar sx={{ height: 320 }}>
          {_invoice.map((invoice) => (
            <MenuItem key={invoice.id}>
              <ListItemText primary={invoice.name} secondary={invoice.totalPrice} />
            </MenuItem>
          ))}
        </Scrollbar>
      </CustomPopover>
    </>
  );
}
