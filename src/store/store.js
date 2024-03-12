import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/Slice';
import sampleReducer from './samplefeat/slice';
import userReducer from './users/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sampleSlice: sampleReducer,
    userSlice: userReducer,
  },
});
