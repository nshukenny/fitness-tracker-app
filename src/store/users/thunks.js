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
          'Unexpected error occurred, please try again later!',
        title: `Fetch users - Error ${err.status}:`,
        type: 'error',
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/users/${userId}`);
      return response.data;
    } catch (err) {
      showToast({
        message:
          err.data.message ||
          'Unexpected error occurred, please try again later!',
        title: `Delete user - Error ${err.status}:`,
        type: 'error',
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (userData, { rejectWithValue }) => {
    try {
      const { userId, updatedData } = userData;
      const response = await API.patch(`/users/${userId}`, updatedData);
      return response.data;
    } catch (err) {
      showToast({
        message:
          err.data.message ||
          'Unexpected error occurred, please try again later!',
        title: `Update user - Error ${err.status}:`,
        type: 'error',
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (newUserData, { rejectWithValue }) => {
    try {
      const response = await API.post(`/users`, newUserData);
      return response.data;
    } catch (err) {
      showToast({
        message:
          err.data.message ||
          'Unexpected error occurred, please try again later!',
        title: `Create user - Error ${err.status}:`,
        type: 'error',
      });
      return rejectWithValue(err.response.data);
    }
  }
);
