import { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { login } from '../store/auth/slice.js';

const LoginPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    console.log('hello');
    dispatch(login({ username, password }));
  };

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
          color={'black'}
        >
          ACCOUNT LOGIN
        </Typography>
        <form onSubmit={handleLogin}>
          <FormLabel style={{ marginBottom: '-10px' }}>USERNAME</FormLabel>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FormLabel style={{ marginBottom: '-10px' }}>PASSWORD</FormLabel>
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
                    onClick={() => setShowPassword(!showPassword)}
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
    </Container>
  );
};

export default LoginPage;
