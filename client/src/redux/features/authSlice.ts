/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../api/auth';
import { ReqUser } from '../../utils/interfaces/reqAPI';

const INITIAL_STATE = { user: {}, isLoggedIn: false };

export const login = createAsyncThunk(
  'auth/login',
  async (reqUser: ReqUser, thunkAPI) => {
    const response = await AuthService.login(reqUser);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    });
  },
});

export default authSlice.reducer;
