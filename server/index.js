import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000", "http://192.168.1.9:3000"]
  }
});

// Middleware
app.use(express.json());

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });

  socket.on('message', msg => {
    console.log(msg)
    io.emit('message', msg);
  });
});
