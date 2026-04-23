import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import schedulerReducer from './schedulerSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    scheduler: schedulerReducer,
  },
});
