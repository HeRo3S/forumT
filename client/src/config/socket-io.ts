import { io } from 'socket.io-client';

function createSocket(accessToken?: string, postID?: number) {
  const socket = io(import.meta.env.VITE_APP_SOCKET_URL);
  if (accessToken)
    socket.auth = {
      token: accessToken,
    };
  socket.connect();
  if (postID) socket.emit('join/post', postID);
  return socket;
}

export default createSocket;
