import { createSlice } from '@reduxjs/toolkit';
import TokenGenerator from '../../helpers/TokenGenerator';
import { showToast } from '../../helpers/toast';

const initialState = {
  username: localStorage.getItem('username') || '',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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

        state.username = username;

        // Redirect to homepage
        window.location.href = '/dashboard/home';
      } else {
        showToast({
          message: 'Invalid username or password.',
          title: `Login - Error:`,
          type: 'error',
        });
      }
    },
    handleLogout(state) {
      localStorage.removeItem('FITNESS_TRACKER_APP_ADMIN_TOKEN');
      state.username = null;

      // Redirect to login
      window.location.href = '/';
    },
  },
});

export const { setUsername, logout, login, handleLogout } = authSlice.actions;
export default authSlice.reducer;
