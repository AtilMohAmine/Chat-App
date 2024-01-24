import jwt from 'jsonwebtoken';
import User from '../models/User.js'

const socketAuthMiddleware = async (io, socket, next) => {
    const token = socket.handshake.auth.token;
    const username = socket.handshake.auth.username
  
    if (!token) {
      const dublicate = await User.findOne({username}).exec()
      if(dublicate)
        return next(new Error('Username already exists'));

      const sockets = await io.fetchSockets();
      const isExist = sockets.find(socket => socket.user.username === username)
      if(isExist)
        return next(new Error('Username already exists'));
      
      // Guest user without a token
      socket.user = { username, userType: 'Guest' };
      return next();
    }
  
    // Verify the JWT token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
  
      // Attach the user information to the socket
      socket.user = decoded.UserInfo;
      next();
    });
}

export default socketAuthMiddleware;