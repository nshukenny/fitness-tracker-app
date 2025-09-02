import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

function AdminNavbar({ onLogout }) {
  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: '#ffffff',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 'bold', letterSpacing: '.05rem' }}
          >
            Fitness Tracker
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          <Tooltip title="Kenny Herve">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar alt="Kenny Herve" src="/static/images/avatar/2.jpg" />
              <Typography variant="body2" fontWeight="500">
                Kenny Herve
              </Typography>
            </Box>
          </Tooltip>

          <Button
            variant="contained"
            color="error"
            onClick={onLogout}
            sx={{ textTransform: 'none', borderRadius: 2, px: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
AdminNavbar.propTypes = {
  onLogout: PropTypes.func.isRequired,
};
export default AdminNavbar;
