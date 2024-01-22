import Room from '../models/Room.js'

const getAllRooms = async (req, res) => {
    const rooms = await Room.find()
    if (!rooms)
        return res.status(204).json({ 'message': 'No rooms found.' })
    res.json(rooms)
}

const createNewRoom = async (io, socket, roomName) => {
    if (!roomName) {
        return;
    }

    try {
        const room = await Room.create({
            name: roomName,
            author: socket.user.id
        })

        io.emit('new-room-created', room);
        console.log(`${socket.user.username} created the ${roomName} chat room`)
    } catch(err) {
        console.error(err)
    }
}

export default { getAllRooms, createNewRoom }