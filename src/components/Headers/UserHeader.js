import { Button, Container, Grid, Typography } from '@mui/material';

const UserHeader = () => {
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: '600px',

          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" maxWidth="xl">
          <Grid container>
            <Grid item lg={7} md={10}>
              <Typography variant="h2" className="text-white">
                Hello Jesse
              </Typography>
              <Typography variant="body1" className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress
              </Typography>
              <Button
                variant="contained"
                color="info"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
