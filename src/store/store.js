import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import sampleReducer from './sampleFeature/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sampleSlice: sampleReducer,
  },
});
