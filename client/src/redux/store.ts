import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';

const reducer = { auth: authSlice };

export const store = configureStore({
  reducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
