import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  FormLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { login } from '../auth/authThunks';
import { selectError, selectAuthToken } from '../auth/authSelectors';
import { clearError } from '../auth/authSlice';
import ToastMessage from './ToastMessage.jsx';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);
  const authToken = useSelector(selectAuthToken);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();

    await dispatch(login({ username, password }));

    if (authToken) {
      navigate('/home');
    } else {
      setToast(
        <ToastMessage type="error" message="Invalid username or password." />
      );
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (error) {
      setToast(<ToastMessage type="error" message={error} />);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={2}
        style={{
          padding: 20,
          background: 'white',
          color: 'black',
          marginTop: '10px',
        }}
      >
        <Typography
          variant="h5"
          style={{ marginBottom: '30px' }}
          gutterBottom
          color={'black'}
        >
          ACCOUNT LOGIN
        </Typography>
        <form onSubmit={handleLogin}>
          <FormLabel style={{ marginBottom: '-10px' }} gutterBottom>
            USERNAME
          </FormLabel>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormLabel style={{ marginBottom: '-10px' }} gutterBottom>
            PASSWORD
          </FormLabel>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            required
            style={{ marginBottom: '50px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Paper>
      {toast}
    </Container>
  );
};

export default LoginPage;
