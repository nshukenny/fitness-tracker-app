import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../store/auth/Slice';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar.jsx';
import { isLoggedIn } from '../helpers/auth';
import AdminNavbar from '../components/Navbars/AdminNavbar.jsx';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    dispatch(handleLogout());
    navigate('/');
  };

  return (
    <Box>
      <Sidebar />
      <Box style={{ marginLeft: '220px' }}>
        {' '}
        <AdminNavbar />
        <Stack alignItems="center" gap={4} p={3}>
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontWeight: 'bold',
            }}
            variant="body1"
            textAlign="center"
          >
            <Home />
            HomePage
          </Typography>

          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={handleLogoutClick}
          >
            Logout
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default HomePage;
