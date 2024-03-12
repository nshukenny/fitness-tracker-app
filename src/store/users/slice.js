import { createSlice } from '@reduxjs/toolkit';
import { getUsers, deleteUser, updateUser, createUser } from './thunks';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    allUsers: {
      data: [],
      status: 'idle',
    },
    deleteUserStatus: 'idle',
    updateUserStatus: 'idle',
    createUserStatus: 'idle',
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
        state.allUsers = {
          data: action.payload,
          status: 'success',
        };
      })
      .addCase(getUsers.rejected, (state) => {
        state.allUsers.status = 'error';
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleteUserStatus = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUserStatus = 'success';
        state.allUsers.data = state.allUsers.data.filter(
          (user) => user.id !== action.payload.userId
        );
      })
      .addCase(deleteUser.rejected, (state) => {
        state.deleteUserStatus = 'error';
      })
      .addCase(updateUser.pending, (state) => {
        state.updateUserStatus = 'loading';
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.updateUserStatus = 'success';
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateUserStatus = 'error';
      })
      .addCase(createUser.pending, (state) => {
        state.createUserStatus = 'loading';
      })
      .addCase(createUser.fulfilled, (state) => {
        state.createUserStatus = 'success';
      })
      .addCase(createUser.rejected, (state) => {
        state.createUserStatus = 'error';
      });
  },
});

export default usersSlice.reducer;
