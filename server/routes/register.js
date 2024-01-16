import express from 'express';
const registerRouter = express.Router();
import registerController from '../controllers/registerController.js';

registerRouter.post('/', registerController.handleNewUser);

export default registerRouter;