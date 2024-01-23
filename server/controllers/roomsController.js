import Room from '../models/Room.js'

const getAllRooms = async (req, res) => {
    const rooms = await Room.find()
    if (!rooms)
        return res.status(204).json({ 'message': 'No rooms found.' })
    res.json(rooms)
}

const createNewRoom = async (io, socket, roomName) => {
    if (!roomName)
        return

    const dublicate = await Room.findOne({name: roomName}).exec()
    if (dublicate) { // Conflict 
        socket.emit('create-room-response', { status: 'failed', msg: 'Room name already exist' });
        return
    }
    try {
        const room = await Room.create({
            name: roomName,
            author: socket.user.id
        })

        socket.emit('create-room-response', { status: 'success', msg: 'Room created successfully', room })
        io.emit('new-room-created', room);
        console.log(`${socket.user.username} created the ${roomName} chat room`)
    } catch(err) {
        console.error(err)
    }
}

const deleteRoom = async (io, socket, roomId) => {
    if (!roomId)
        return
    
    const room = await Room.findOne({_id: roomId}).exec()
    if (!room)
        return
        
    if(room.author.toString() !== socket.user.id)
        return  

    await Room.deleteOne({_id: roomId})
    io.emit('room-deleted', room);
    socket.broadcast.to(room.name).emit('message', { user: 'server', message: `${socket.user.username} has deleted the room ${room.name}` })
    socket.emit('message', { user: 'server', message: `You have deleted the room ${room.name}` })

    const sockets = await io.in(room.name).fetchSockets();
    for (const socket of sockets) {
        socket.leave(room.name)
        socket.user.room = null
    }

    console.log(`${socket.user.username} deleted the ${room.name} chat room`)
}

export default { getAllRooms, createNewRoom, deleteRoom }