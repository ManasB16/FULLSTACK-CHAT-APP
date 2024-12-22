import { Server } from "socket.io";
import htttp from "http";
import express from "express";

const app = express();
const server = htttp.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// This object is being used to store the online users
const connectedUsers = {}; // {userId: socketId}

export function getReceiverSocketId(userId) {
  return connectedUsers[userId];
}

io.on("connection", (socket) => {
  console.log(`A user connected, ${socket.id}`);

  const userId = socket.handshake.query.userId;
  if (userId) connectedUsers[userId] = socket.id;

  io.emit("connectedUsers", Object.keys(connectedUsers));

  socket.on("disconnect", () => {
    console.log(`A user disconnected, ${socket.id}`);
    delete connectedUsers[userId];
    io.emit("connectedUsers", Object.keys(connectedUsers));
  });
});

export { app, server, io };
