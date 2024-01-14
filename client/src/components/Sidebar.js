import React, { useState } from 'react';
import { HiOutlineUsers } from 'react-icons/hi';
import { FaDotCircle } from 'react-icons/fa';
import { MdOutlineClose, MdOutlineSegment } from "react-icons/md";

const Sidebar = () => {
   const [sidebarHidden, setSidebarHidden] = useState(true);

  const toggleSidebar = () => {
   setSidebarHidden((prev) => !prev);
  };

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
        <div className="flex items-center mb-4">
          <HiOutlineUsers className="text-2xl mr-2" />
          <h2 className="text-xl font-semibold">Rooms</h2>
        </div>
        <ul>
          <li className="m-2">
            <div className="flex items-center">
              <FaDotCircle className="text-sm mr-2" />
              <span>Room 1</span>
            </div>
          </li>
          <li className="m-2">
            <div className="flex items-center">
              <FaDotCircle className="text-sm mr-2" />
              <span>Room 2</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
   </>
  );
};

export default Sidebar;