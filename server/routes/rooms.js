import express from 'express'
const router = express.Router()
import roomsController from '../controllers/roomsController.js'

router.route('/')
    .get(roomsController.getAllRooms)

export default router