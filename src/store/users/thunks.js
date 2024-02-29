import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';
import { showToast } from '../../helpers/toast';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/users`);

      return response.data;
    } catch (err) {
      showToast({
        message:
          err.data.message ||
          'Unexpected error occured, please try again later!',
        title: `Fetch users - Error ${err.status}:`,
        type: 'error',
      });

      return rejectWithValue(err.response.data);
    }
  }
);
