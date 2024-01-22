import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, IconButton, InputAdornment, ThemeProvider } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ToastMessage from './ToastMessage';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
  
    const VITE_ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
    const VITE_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
  
    if (username === VITE_ADMIN_USERNAME && password === VITE_ADMIN_PASSWORD) {
      localStorage.setItem('authToken', 'your_token_here');
      localStorage.setItem('username', username);
  
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

  return (
    
    <Container maxWidth='sm'>
      <Paper
        elevation={2}
        style={{
          padding: 20,
          background: 'white',
          color: 'black',
          marginTop: '10px',
        }}
      >
        <Typography variant="h5" style={{ marginBottom: '30px' }} gutterBottom color={'black'}>
          ACCOUNT LOGIN
        </Typography>
        <form onSubmit={handleLogin}>
          <Typography variant="body1" style={{ marginBottom: '-10px' }} gutterBottom>
            USERNAME
          </Typography>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Typography variant="body1" style={{ marginBottom: '-10px' }} gutterBottom>
            PASSWORD
          </Typography>
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
