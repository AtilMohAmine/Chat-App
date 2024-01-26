import express from 'express';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import connectDB from './config/dbConn.js'
import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js'
import refreshRouter from './routes/refresh.js'
import logoutRouter from './routes/logout.js'
import roomsRouter from './routes/rooms.js'
import userRouter from './routes/user.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import allowedOrigins from './config/allowedOrigins.js';
import allowedFileTypes from './config/allowedFileTypes.js'
import socketAuthMiddleware from './middleware/socketAuth.js';
import roomsController from './controllers/roomsController.js'
import cookieParser from 'cookie-parser'
import { fileTypeFromBuffer } from 'file-type'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Middleware for json
app.use(express.json());

// Middleware for cookies
app.use(cookieParser())

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/register', registerRouter)
app.use('/auth', authRouter)
app.use('/refresh', refreshRouter)
app.use('/logout', logoutRouter)
app.use('/rooms', roomsRouter)
app.use('/user', userRouter)

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Connect to MongoDB
connectDB()

const io = new Server(expressServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" ? allowedOrigins : ["http://localhost:3000", "http://192.168.1.9:3000"]
  },
  maxHttpBufferSize: 1e8 // 100 MB
});

io.use((socket, next) => socketAuthMiddleware(io, socket, next));

io.on('connection', (socket) => {
  console.log(`User ${socket.user.username} connected`);

  socket.emit('message', { user: 'server', message:'Welcome to the Chat App!' })

  socket.broadcast.emit('message', { user: 'server', message: `User ${socket.user.username} connected` })

  socket.on('message', msg => {
    const newMsg = { 
      ...msg,
      user: socket.user.username,
      profilePicture: socket.user.profilePicture,
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
      roomsController.emitAllUsersInRoom(io, socket.user.room)
    }

    socket.join(roomName)
    socket.user.room = roomName

    socket.emit('message', { user: 'server', message: `You have joined the ${roomName} chat room` })
    socket.broadcast.to(roomName).emit('message', { user: 'server', message: `${socket.user.username} has joined the room` })
    
    roomsController.emitAllUsersInRoom(io, roomName)
    console.log(`${socket.user.username} joined to ${roomName}`)
  })

  socket.on('create-room', (roomName) => {
    roomsController.createNewRoom(io, socket, roomName)
  })

  socket.on('delete-room', (roomId) => {
    roomsController.deleteRoom(io, socket, roomId)
  })

  socket.on('upload', async ({ fileName, data }) => {
    const fileType = await fileTypeFromBuffer(data)
    if (!allowedFileTypes.messages.includes(fileType?.mime)) {
      return socket.emit('upload-error', { message: 'File type not allowed.' });
    }
    const fileSize = Buffer.byteLength(data)
    const isImage = fileType?.mime.startsWith('image')
    const newFile = { 
      fileName: fileName,
      buffer: isImage ? data.toString('base64') : data,
      type: fileType,
      size: fileSize,
      isImage,
      user: socket.user.username,
      profilePicture: socket.user.profilePicture,
      time: Date.now()
    }
  
    const room = socket.user?.room
    if(room)
      io.to(room).emit('message', newFile)

    console.log(`${socket.user.username} / ${room}: sending a ${fileName} file`)
  })

  socket.on('disconnect', () => {
    const room = socket.user?.room
    if(room) {
      io.to(room).emit('message', { user: 'server', message: `${socket.user.username} has left the room` })
      roomsController.emitAllUsersInRoom(io, room)
    }
    
    socket.broadcast.emit('message', { user: 'server', message:`User ${socket.user.username} disconnected` });
    console.log(`User ${socket.user.username} disconnected`);
  });

});
