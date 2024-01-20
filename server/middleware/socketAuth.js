import jwt from 'jsonwebtoken';

const socketAuthMiddleware = (socket, next) => {
    const token = socket.handshake.auth.token;
    const username = socket.handshake.auth.username
  
    if (!token) {
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