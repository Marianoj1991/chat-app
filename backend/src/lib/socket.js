import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});
  
export const getReceiverSocketId = (receiverId) => {
  return userSockets.get(receiverId);
}

const userSockets = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSockets.set(userId, socket.id);
    console.log(`User ID ${userId} associated with socket ID ${socket.id}`);
  }

  io.emit('getUsersConnected', [...userSockets.keys()]);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete userSockets[userId];
    io.emit('getUsersConnected', [...userSockets.keys()]);
  } );
});

export { io, server, app };