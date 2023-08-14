import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import alertSlice from './features/alertSlice';

const reducer = { auth: authSlice, alert: alertSlice };

export const store = configureStore({
  reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
