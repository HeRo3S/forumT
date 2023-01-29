/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../api/auth';
import { ReqUser } from '../../utils/interfaces/reqAPI';

const INITIAL_STATE = { userInfo: {}, accessToken: '', isLoggedIn: false };

export const login = createAsyncThunk(
  'auth/login',
  async (reqUser: ReqUser, thunkAPI) => {
    const response = await AuthService.login(reqUser);
    return response;
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (reqUser: ReqUser, thunkAPI) => {
    const response = await AuthService.register(reqUser);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.userInfo = {};
        state.accessToken = '';
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload.userInfo;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.userInfo = {};
        state.accessToken = '';
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
