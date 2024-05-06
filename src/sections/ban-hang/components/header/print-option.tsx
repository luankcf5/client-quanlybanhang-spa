import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const papers = [
  {
    value: 'A4',
    label: 'Khổ giấy A4',
  },
  {
    value: 'C8',
    label: 'Khổ giấy 57mm',
  },
  {
    value: 'C7',
    label: 'Khổ giấy 80mm',
  },
];

export default function PrintOption() {
  const popover = usePopover();

  return (
    <>
      <IconButton size="large" onClick={popover.onOpen}>
        <Tooltip title="Thiết lập máy in">
          <Iconify color="white" icon="mingcute:print-fill" />
        </Tooltip>
      </IconButton>

      <CustomPopover
        hiddenArrow
        open={popover.open}
        onClose={popover.onClose}
        sx={{
          width: 280,
        }}
      >
        <Stack spacing={1} p={1}>
          <Typography variant="subtitle2">Khổ giấy in : </Typography>
          <Select fullWidth size="small">
            {papers.map((item: any) => (
              <MenuItem key={item?.value} value={item?.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </Stack>
      </CustomPopover>
    </>
  );
}
