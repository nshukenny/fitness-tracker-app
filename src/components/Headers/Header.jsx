import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';

const HeaderContainer = styled(Container)(({ theme }) => ({
  background: theme.palette.primary.main,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[4],
}));

const useStyles = (theme) => ({
  cardTitle: {
    textTransform: 'uppercase',
    marginBottom: theme.spacing(1),
  },
});

const Header = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <HeaderContainer maxWidth="lg">
      <Grid container spacing={4}>
        {/* Card stats */}
        <Grid item lg={6} xl={3}>
          <StyledCard>
            <CardContent>
              <Typography variant="subtitle1" className={classes.cardTitle}>
                Traffic
              </Typography>
              <Typography variant="h2">350,897</Typography>
              <Typography variant="body2" color="textSecondary">
                <span className="text-success mr-2">
                  <i className="fa fa-arrow-up" /> 3.48%
                </span>
                <span>Since last month</span>
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
        {/* Other Grid items */}
      </Grid>
    </HeaderContainer>
  );
};

export default Header;
