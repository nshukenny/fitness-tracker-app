import { createSlice } from '@reduxjs/toolkit';
import { getUsers } from './thunks';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    allUsers: {
      data: [],
      status: 'idle',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.allUsers = {
          data: [],
          status: 'loading',
        };
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log('action', action);
        state.allUsers = {
          data: action.payload,
          status: 'success',
        };
      })
      .addCase(getUsers.rejected, (state) => {
        state.allUsers.status = 'error';
      });
  },
});

export default usersSlice.reducer;
