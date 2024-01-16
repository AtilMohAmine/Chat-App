import express from 'express';
const router = express.Router();
import registerController from '../controllers/registerController.js';

router.post('/', registerController.handleNewUser);

export default router;