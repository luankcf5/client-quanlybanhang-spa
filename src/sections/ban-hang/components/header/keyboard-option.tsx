import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const keyboards = [
  {
    key: 'F2',
    label: 'Thêm hoá đơn mới',
  },
  {
    key: 'F4',
    label: 'Thanh toán hoá đơn',
  },
  {
    key: 'F7',
    label: 'Chế độ xem hoá đơn',
  },
  {
    key: 'F8',
    label: 'Chế độ xem phòng bàn',
  },
  {
    key: 'F11',
    label: 'Toàn màn hình',
  },
  {
    key: 'ESC',
    label: 'Thoát toàn màn hình',
  },
];

export default function KeyboardOption() {
  const popover = usePopover();

  // ----------------------------------------------------------------------

  return (
    <>
      <IconButton size="large" onClick={popover.onOpen}>
        <Iconify color="white" icon="ooui:keyboard" />
      </IconButton>

      <CustomPopover hiddenArrow open={popover.open} onClose={popover.onClose}>
        <Stack>
          {keyboards.map((keyboard, index) => (
            <MenuItem key={index}>
              <Stack direction="row" justifyContent="space-between" width={250}>
                <Typography variant="subtitle2" fontWeight={700}>
                  {keyboard.key} :
                </Typography>

                <Typography variant="subtitle2" color="text.disabled">
                  {keyboard.label}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </CustomPopover>
    </>
  );
}
