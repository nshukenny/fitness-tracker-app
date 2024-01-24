import { createAsyncThunk } from '@reduxjs/toolkit';
import TokenGenerator from '../helpers/TokenGenerator';
import {
  setAuthToken,
  setUsername,
  setError,
  clearError,
  logout,
} from './authSlice';

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { dispatch }) => {
    try {
      const { VITE_ADMIN_USERNAME, VITE_ADMIN_PASSWORD } = import.meta.env;

      if (
        username === VITE_ADMIN_USERNAME &&
        password === VITE_ADMIN_PASSWORD
      ) {
        const authToken = TokenGenerator({ length: 5 });
        localStorage.setItem('FITNESS_TRACKER_APP_ADMIN_TOKEN', authToken);
        localStorage.setItem('username', username);

        dispatch(setAuthToken(authToken));
        dispatch(setUsername(username));
        dispatch(clearError());

        return Promise.resolve(authToken);
      } else {
        dispatch(setError('Invalid username or password.'));
        return Promise.resolve(null);
      }
    } catch (error) {
      dispatch(setError('An error occurred while logging in.'));
      return Promise.resolve(null);
    }
  }
);

export const handleLogout = () => (dispatch) => {
  return new Promise((resolve) => {
    localStorage.removeItem('FITNESS_TRACKER_APP_ADMIN_TOKEN');
    dispatch(logout());
    resolve();
  });
};
