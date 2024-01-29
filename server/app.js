import express from 'express';
import registerRouter from './routes/register.js';
import authRouter from './routes/auth.js'
import refreshRouter from './routes/refresh.js'
import logoutRouter from './routes/logout.js'
import roomsRouter from './routes/rooms.js'
import userRouter from './routes/user.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import cookieParser from 'cookie-parser'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

export default app