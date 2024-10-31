import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/api';
import { showToast } from '../../helpers/toast';

export const getWorkouts = createAsyncThunk(
  'workouts/getWorkouts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get(`/workouts`);
      return response.data;
    } catch (err) {
      showToast({
        message:
          err.data.message ||
          'Unexpected error occurred, please try again later!',
        title: `Fetch workouts - Error ${err.status}:`,
        type: 'error',
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteWorkout = createAsyncThunk(
  'workouts/deleteWorkout',
  async (workoutId, { rejectWithValue }) => {
    try {
      const response = await API.delete(`/workouts/${workoutId}`);
      return response.data;
    } catch (err) {
      showToast({
        message:
          err.data.message ||
          'Unexpected error occurred, please try again later!',
        title: `Delete workout - Error ${err.status}:`,
        type: 'error',
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateWorkout = createAsyncThunk(
  'workouts/updateWorkout',
  async (workoutData, { rejectWithValue }) => {
    try {
      const { workoutId, updatedData } = workoutData;
      const response = await API.patch(`/workouts/${workoutId}`, updatedData);
      return response.data;
    } catch (err) {
      showToast({
        message:
          err.data.message ||
          'Unexpected error occurred, please try again later!',
        title: `Update workout - Error ${err.status}:`,
        type: 'error',
      });
      return rejectWithValue(err.response.data);
    }
  }
);

export const createWorkout = createAsyncThunk(
  'workouts/createWorkout',
  async (newWorkoutData, { rejectWithValue }) => {
    try {
      const response = await API.post(`/workouts`, newWorkoutData);
      return response.data;
    } catch (err) {
      showToast({
        message:
          err.data.message ||
          'Unexpected error occurred, please try again later!',
        title: `Create workout - Error ${err.status}:`,
        type: 'error',
      });
      return rejectWithValue(err.response.data);
    }
  }
);
