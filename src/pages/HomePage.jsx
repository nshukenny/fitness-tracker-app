import { useEffect } from 'react';
import { Stack, Typography, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogout } from '../auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { selectAuthToken } from '../auth/authSelectors';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = useSelector(selectAuthToken);

  useEffect(() => {
    if (!authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  const handleLogoutClick = async () => {
    await dispatch(handleLogout());
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
