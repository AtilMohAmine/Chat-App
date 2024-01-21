import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/dbConn.js'
import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js'
import refreshRouter from './routes/refresh.js'
import logoutRouter from './routes/logout.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import allowedOrigins from './config/allowedOrigins.js';
import socketAuthMiddleware from './middleware/socketAuth.js';
import cookieParser from 'cookie-parser'

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser())

// Routes
app.use('/register', registerRouter)
app.use('/auth', authRouter)
app.use('/refresh', refreshRouter)
app.use('/logout', logoutRouter)

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Connect to MongoDB
connectDB()

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? allowedOrigins : ["http://localhost:3000", "http://192.168.1.9:3000"]
  }
});

io.use(socketAuthMiddleware);

io.on('connection', (socket) => {
  console.log(`User ${socket.user.username} connected`);

  socket.emit('message', { user: 'server', message:'Welcome to the Chat App!' })

  socket.broadcast.emit('message', { user: 'server', message: `User ${socket.user.username} connected` })

  socket.on('message', msg => {
    const newMsg = { 
      ...msg,
      user: socket.user.username,
      time: Date.now()
    }

    const room = socket.user?.room
    if(room)
      io.to(room).emit('message', newMsg)

    console.log(`${socket.user.username} / ${room}: ${msg.message}`)
  });

  socket.on('activity', () => {
    const room = socket.user?.room
    if(room)
      socket.broadcast.to(room).emit('activity', socket.user.username)

  });

  socket.on('join-room', (roomName) => {
    if(socket.user?.room) {
      socket.leave(socket.user.room);
      io.to(socket.user.room).emit('message', { user: 'server', message: `${socket.user.username} has left the room` })
    }

    socket.join(roomName)
    socket.user.room = roomName

    socket.emit('message', { user: 'server', message: `You have joined the ${roomName} chat room` })
    socket.broadcast.to(roomName).emit('message', { user: 'server', message: `${socket.user.username} has joined the room` })
    
    console.log(`${socket.user.username} joined to ${roomName}`)
  })

  socket.on('create-room', (roomName) => {
    console.log(`${socket.user.username} created the ${roomName} chat room`)
    io.emit('create-room', roomName)
  })

  socket.on('disconnect', () => {
    const room = socket.user?.room
    if(room)
      io.to(room).emit('message', { user: 'server', message: `${socket.user.username} has left the room` })
    
    socket.broadcast.emit('message', { user: 'server', message:`User ${socket.user.username} disconnected` });
    console.log(`User ${socket.user.username} disconnected`);
  });

});
