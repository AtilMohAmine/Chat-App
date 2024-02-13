import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:3000'
];

export default allowedOrigins;