import React, { useEffect, useState } from 'react';
import { HiOutlineUsers } from 'react-icons/hi';
import { FaDotCircle } from 'react-icons/fa';
import { MdOutlineClose, MdOutlineSegment, MdDeleteOutline } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import AddNewRoomModal from './AddNewRoomModal';
import useAuth from '../hooks/useAuth';
import useSocket from '../hooks/useSocket';
import axios from '../api/axios';

const Sidebar = () => {
   const [sidebarHidden, setSidebarHidden] = useState(true);
   const [isAddRoomModalOpen, setAddRoomModalOpen] = useState(false);
   const [rooms, setRooms] = useState([])
   const [currentRoom, setCurrentRoom] = useState('Lobby')
   const { auth } = useAuth()
   const socket = useSocket()

  const toggleSidebar = () => {
   setSidebarHidden((prev) => !prev);
  };

  const openAddRoomModal = () => {
    if(isAddRoomModalOpen)
      return
    if(!auth?.accessToken) {
      alert("Please log in to create a new room.")
      return
    }
    setAddRoomModalOpen(true);
  };

  const closeAddRoomModal = () => {
    setAddRoomModalOpen(false);
  };

  const createRoom = async (roomName) => { 
    socket.emit('create-room', roomName)
  }

  const joinRoom = (roomName) => {
    if(roomName === currentRoom)
      return
    socket.emit('join-room', roomName)
    setCurrentRoom(roomName)
  }

  const deleteRoom = (roomId) => {
    socket.emit('delete-room', roomId)
  }

  useEffect(() => {
    socket.on('create-room-response', (msg) => {
      if(msg.status === 'failed')
        alert(msg.msg)
      else if(msg.status === 'success') {
        joinRoom(msg.room.name)
        setAddRoomModalOpen(false)
      }
    })

  }, [socket])

  useEffect(() => {
    socket.on('new-room-created', (room) => {
      setRooms([...rooms, room])
    })

    socket.on('room-deleted', (room) => {
      setRooms(rooms.filter(r => r._id !== room._id))
    })
  }, [socket, rooms])

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const result = await axios.get('/Rooms')
        setRooms(result.data)
        setCurrentRoom(result.data[0].name)
      } catch(err) {}
    }

    fetchRooms()
  }, [auth])

  return (
   <>
      <span
         className={`${!sidebarHidden ? 'hidden' : 'block'} sm:hidden absolute bg-gray-300 text-black text-4xl top-5 left-4 cursor-pointer rounded-md`}
         onClick={() => toggleSidebar()}
      >
         <MdOutlineSegment className="bi bi-filter-left px-2" />
      </span>
      <div className={`${sidebarHidden ? 'hidden' : 'block'} sm:block absolute w-full h-full z-40 sm:w-64 sm:relative bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-gray-100 to-gray-300 text-gray-800 dark:bg-gray-800 dark:text-white p-4`}>
      <span
         className='block sm:hidden absolute bg-gray-300 text-black text-4xl top-5 right-4 cursor-pointer rounded-md'
         onClick={() => toggleSidebar()}
      >
         <MdOutlineClose className="bi bi-filter-left px-2" />
      </span>
      <div className="mt-8">
        <div className="flex items-center sm:justify-between justify-start mb-4">
          <div className='flex items-center'>
            <HiOutlineUsers className="text-2xl mr-2" />
            <h2 className="text-xl font-semibold">Rooms</h2>
          </div>
          <IoIosAdd className="sm:text-xl text-4xl sm:px-0 px-1 sm:ml-0 ml-3 font-semibold cursor-pointer bg-slate-300 hover:bg-slate-400 sm:rounded-sm rounded-md" onClick={openAddRoomModal} />
        </div>
        <ul>
          {
            rooms.map((room, index) => 
              <li key={index} className="m-2 cursor-pointer">
                <div className='flex flex-row justify-between items-center'>
                <div className="flex items-center" onClick={() => joinRoom(room.name)}>
                  <FaDotCircle className={`text-sm mr-2 ${room.name === currentRoom && 'text-blue-800'}`} />
                  <span>{room.name}</span>
                </div>
                { auth?.id === room.author && <MdDeleteOutline onClick={() => deleteRoom(room._id)} className='text-m mr-2 hover:text-red-600' /> }
                </div>
              </li>
            )
          }
        </ul>
      </div>
    </div>
    {isAddRoomModalOpen && <AddNewRoomModal onClose={closeAddRoomModal} createRoom={createRoom} />}
   </>
  );
};

export default Sidebar;