import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/Slice';
import sampleReducer from './samplefeat/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sampleSlice: sampleReducer,
  },
});
