import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function Footer() {
  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        right: 0,
        bottom: 5,
        position: 'fixed',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="subtitle2" component="div">
          © 2024 Bản quyền thuộc về
          <Link href="https://iit.vn" target="_blank">
            {' '}
            công ty cổ phần IIT{' '}
          </Link>
        </Typography>
      </Container>
    </Box>
  );

  return simpleFooter;
}
