import { useEffect } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../store/auth/Slice';
import { useNavigate } from 'react-router-dom';

import { isLoggedIn } from '../helpers/auth';

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
  );
};

export default HomePage;
