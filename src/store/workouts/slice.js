import { createSlice } from '@reduxjs/toolkit';
import { deleteWorkout, createWorkout, updateWorkout } from './thunks';

const workoutsSlice = createSlice({
  name: 'workouts',
  initialState: {
    allWorkouts: {
      data: [],
      status: 'idle',
    },
    deleteWorkoutStatus: 'idle',
    updateWorkoutStatus: 'idle',
    createWorkoutStatus: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWorkouts.pending, (state) => {
        state.allWorkouts = {
          data: [],
          status: 'loading',
        };
      })
      .addCase(getWorkouts.fulfilled, (state, action) => {
        state.allWorkouts = {
          data: action.payload,
          status: 'success',
        };
      })
      .addCase(getWorkouts.rejected, (state) => {
        state.allWorkouts.status = 'error';
      })
      .addCase(deleteWorkout.pending, (state) => {
        state.deleteWorkoutStatus = 'loading';
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        state.deleteWorkoutStatus = 'success';
        state.allWorkouts.data = state.allWorkouts.data.filter(
          (workout) => workout.id !== action.payload.workoutId
        );
      })
      .addCase(deleteWorkout.rejected, (state) => {
        state.deleteWorkoutStatus = 'error';
      })
      .addCase(updateWorkout.pending, (state) => {
        state.updateWorkoutStatus = 'loading';
      })
      .addCase(updateWorkout.fulfilled, (state) => {
        state.updateWorkoutStatus = 'success';
      })
      .addCase(updateWorkout.rejected, (state) => {
        state.updateWorkoutStatus = 'error';
      })
      .addCase(createWorkout.pending, (state) => {
        state.createWorkoutStatus = 'loading';
      })
      .addCase(createWorkout.fulfilled, (state) => {
        state.createWorkoutStatus = 'success';
      })
      .addCase(createWorkout.rejected, (state) => {
        state.createWorkoutStatus = 'error';
      });
  },
});

export default workoutsSlice.reducer;
