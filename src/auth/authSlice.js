import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: localStorage.getItem('FITNESS_TRACKER_APP_ADMIN_TOKEN') || null,
    username: localStorage.getItem('username') || '',
    error: null,
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
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
  },
});

export const { setAuthToken, setUsername, setError, clearError, logout } =
  authSlice.actions;
export default authSlice.reducer;
