import { Box, Stack, Typography, Button } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMyData } from '../store/sampleFeature/selectors';
import { getMyData } from '../store/sampleFeature/slice';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myData = useSelector(selectMyData);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    if (!authToken) {
      navigate('/');
    } else {
      dispatch(getMyData());
    }
  }, [authToken, dispatch, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
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

      <Box>
        {myData.map((item) => (
          <p key={item.id}>{`${item.name} ${item.id}`}</p>
        ))}
      </Box>
      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default HomePage;
