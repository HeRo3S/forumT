/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import AuthService from '../../api/auth';
import { ReqUser } from '../../config/interfaces/reqAPI';

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

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async () => {
    const response = await AuthService.refreshAccessToken();
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await AuthService.logout();
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = decodeJWT(action.payload.accessToken);
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state) => {
        state.userInfo = {};
        state.accessToken = '';
        state.isLoggedIn = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = decodeJWT(action.payload.accessToken);
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state) => {
        state.userInfo = {};
        state.accessToken = '';
        state.isLoggedIn = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.userInfo = decodeJWT(action.payload.accessToken);
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.userInfo = {};
        state.accessToken = '';
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = {};
        state.accessToken = '';
        state.isLoggedIn = false;
      })
      .addCase(logout.rejected, (state) => {
        state.userInfo = {};
        state.accessToken = '';
        state.isLoggedIn = false;
      });
  },
});

function decodeJWT(accessToken: string) {
  const userInfo = jwt_decode(accessToken);
  return userInfo as object;
}

export default authSlice.reducer;
