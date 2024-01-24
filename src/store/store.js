// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice'; // Adjust the path accordingly
import sampleReducer from './sampleFeature/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // Add the authReducer to the root reducer
    sampleSlice: sampleReducer,
  },
});
