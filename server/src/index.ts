import { Server } from 'socket.io';
import corsOptions from './config/corsOptions.js';
import httpServer from './httpServer.js';
import SearchService from './services/search.service.js';

const io = new Server(httpServer, {
  cors: corsOptions,
});

io.on('connection', (socket) => {
  console.log('connection established');
  socket.on('search/group', async (keyword) => {
    const groups = await SearchService.SearchGroups(keyword);
    socket.emit('search/group/response', groups);
  });
});
