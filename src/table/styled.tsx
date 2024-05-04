import { styled } from '@mui/material/styles';
import Badge, { BadgeProps } from '@mui/material/Badge';

// ----------------------------------------------------------------------

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
