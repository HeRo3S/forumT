import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '@prisma/client';
import corsOptions from './config/corsOptions.js';
import httpServer from './httpServer.js';
import SearchService from './services/search.service.js';
import UpdateService from './services/update.service.js';

dotenv.config();

const io = new Server(httpServer, {
  cors: corsOptions,
});

interface AuthenticatedSocket extends Socket {
  // user: Partial<User>;
  [key: string]: any;
}

io.on('connection', (socket: AuthenticatedSocket) => {
  console.log('connection established');
  socket.on('search/group', async (keyword) => {
    const groups = await SearchService.SearchGroups(keyword);
    socket.emit('search/group/response', groups);
  });

  socket.on('update/comment', async (postID, comment) => {
    console.log(socket.handshake.auth);
    const { token } = socket.handshake.auth;
    jwt.verify(
      <string>token,
      <string>process.env.ACCESS_TOKEN,
      async (err, decoded) => {
        if (err) throw new Error(`Authentication Error: ${err}`);
        if (decoded) {
          const user = <User>decoded;
          const { username } = user;
          const updatedComment = await UpdateService.UpdateComments(
            username,
            postID,
            comment
          );
          io.emit('update/comment/response', updatedComment);
        }
      }
    );
  });
});
