/* eslint-disable no-param-reassign */
import { AlertColor } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface AlertState {
  severity: AlertColor;
  message: string;
}
const INITIAL_ALERT_STATE: AlertState = {
  severity: 'warning',
  message: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState: INITIAL_ALERT_STATE,
  reducers: {
    showAlert(state, action) {
      const { severity, message } = action.payload;
      state.severity = severity;
      state.message = message;
    },
    clearAlert(state) {
      state.message = INITIAL_ALERT_STATE.message;
      // state.severity = INITIAL_ALERT_STATE.severity;
    },
  },
});

const { actions, reducer } = alertSlice;
export const { showAlert, clearAlert } = actions;
export default reducer;
