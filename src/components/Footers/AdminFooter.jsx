import { Container, Grid, Link, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fe', padding: '20px 0' }}>
      <Container>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mb: { xs: 1, md: 0 } }}
            >
              © {new Date().getFullYear()}{' '}
              <Link
                href="https://www.creative-tim.com?ref=adr-admin-footer"
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
                sx={{ fontWeight: 'bold' }}
              >
                Creative Tim
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Link
                  href="https://www.creative-tim.com?ref=adr-admin-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="textSecondary"
                >
                  Creative Tim
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="textSecondary"
                >
                  About Us
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="http://blog.creative-tim.com?ref=adr-admin-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="textSecondary"
                >
                  Blog
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="textSecondary"
                >
                  MIT License
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
