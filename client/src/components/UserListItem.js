import React from 'react'

const UserListItem = ({ user }) => {
  return (
    <li className='flex flex-row items-center bg-slate-200 hover:bg-slate-300 p-1 rounded-md mt-1 cursor-pointer'>
      <img src={user.picture ? user.picture : '/default_profile.png'} className='w-3 h-3 rounded-full'></img>
      <span className='text-xs ml-2 text-slate-800'>{user.username}</span>
    </li>
  )
}

export default UserListItem