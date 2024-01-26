import { createSlice } from '@reduxjs/toolkit';
import TokenGenerator from '../../helpers/TokenGenerator';

const initialState = {
  username: localStorage.getItem('username') || '',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.authToken = null;
      state.username = '';
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      const { VITE_ADMIN_USERNAME, VITE_ADMIN_PASSWORD } = import.meta.env;

      if (
        username === VITE_ADMIN_USERNAME &&
        password === VITE_ADMIN_PASSWORD
      ) {
        const authToken = TokenGenerator({ length: 5 });
        localStorage.setItem('FITNESS_TRACKER_APP_ADMIN_TOKEN', authToken);
        localStorage.setItem('username', username);

        state.authToken = authToken;
        state.username = username;
        state.error = null;
      } else {
        state.error = 'Invalid username or password.';
      }
    },
    handleLogout(state) {
      localStorage.removeItem('FITNESS_TRACKER_APP_ADMIN_TOKEN');
      state.authToken = null;
      state.username = null;
    },
  },
});

export const {
  setUsername,
  setError,
  clearError,
  logout,
  login,
  handleLogout,
} = authSlice.actions;
export default authSlice.reducer;
