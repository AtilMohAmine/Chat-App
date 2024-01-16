import express from 'express';
const router = express.Router();
import refreshTokenController from '../controllers/refreshTokenController.js';

router.get('/', refreshTokenController.handleRefreshToken);

export default router