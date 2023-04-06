import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { io } from 'socket.io-client';

let store: ToolkitStore;
export function injectStoreToSocket(_store: ToolkitStore) {
  store = _store;
}

function loadTokenToAuthHeader() {
  const { accessToken } = store.getState().auth;
  const auth = {
    token: accessToken,
  };
  return auth;
}

const socket = io('ws://localhost:5000');

export default socket;
