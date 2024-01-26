import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js'
import verifyJWT from '../middleware/verifyJWT.js'
import fileUpload from 'express-fileupload';
import fileExtLimiter from '../middleware/fileExtLimiter.js';

router.route('/upload-profile-picture')
    .post(
        verifyJWT,
        fileUpload(),
        fileExtLimiter,
        userController.uploadProfilePicture
    )

export default router