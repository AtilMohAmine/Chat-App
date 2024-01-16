import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/dbConn.js'
import registerRouter from './routes/register.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Connect to MongoDB
connectDB()

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? ["https://yourwebsite.com"] : ["http://localhost:3000", "http://192.168.1.9:3000"]
  }
});

// Middleware
app.use(express.json());

// Routes
app.use('/register', registerRouter)

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.emit('message', {user: 'server', message:'Welcome to the Chat App!'})

  socket.broadcast.emit('message', {user: 'server', message: `User ${socket.id} connected`})

  socket.on('message', msg => {
    console.log(msg)
    io.emit('message', { 
      ...msg, 
      time: Date.now()
    });
  });

  socket.on('activity', (user) => {
    socket.broadcast.emit('activity', user)
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    socket.broadcast.emit('message', {user: 'server', message:`User ${socket.id} disconnected`});
  });

});
