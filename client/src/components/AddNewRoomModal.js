import React, { useState } from 'react'
import { MdCreate } from "react-icons/md";

const AddNewRoomModal = ({ onClose, createRoom }) => {
    const [roomName, setRoomName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!roomName)
            return
        createRoom(roomName)
    }

  return (
    <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <MdCreate />
              </div>
              <div className="mt-3 text-center sm:ml-6 sm:mt-0 sm:text-left">
                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Create a New Room</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Enter a unique room name for your new room below.</p>
                </div>
                <form onSubmit={handleSubmit}>
                <div className='mt-4'>
                  <input 
                      id="roomname"
                      type="text" 
                      onChange={(e) => setRoomName(e.target.value)}
                      value={roomName}
                      required 
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="Room Name" 
                  />
                </div>
                  <div className="mt-4">
                      <button type="submit" disabled={!roomName ? true : false} className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                          Add Room
                      </button>
                  </div>

                  <div className="mt-1">
                      <button onClick={onClose} className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-gray-900 capitalize transition-colors duration-300 transform bg-white rounded-lg hover:bg-gray-50 focus:outline-none ring-1 ring-inset ring-gray-300 focus:ring-opacity-50">
                          Cancel
                      </button>
                  </div>
                </form>
                
              </div>
                 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AddNewRoomModal