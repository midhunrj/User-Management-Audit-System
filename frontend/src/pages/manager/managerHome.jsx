import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { BiBell, BiSearch, BiMap } from "react-icons/bi"
import { FaUserCircle } from "react-icons/fa"


import { Link } from "react-router-dom";

import { Bar, Line } from "react-chartjs-2";

// import { io, Socket } from "socket.io-client";

import { managerAuthenticate } from "../../services/managerInterceptor";
import { managerUrl } from "../../utils/config/urlConfig";
import { useAuthContext } from "../../context/userContext";

const ManagerHome = () => {
   const navigate=useNavigate()
   const dispatch=useDispatch()
   const{manager,role}=useAuthContext()
   const [unreadCount,setUnreadCount]=useState(0)
   const[bookings,setBookings]=useState([])
   const[revenues,setRevenues]=useState([])
   const [timePeriod,setTimePeriod]=useState('Monthly')
   const userId=manager?._id
    const handleLogout=()=>{
        logout()
        console.log("ok bye bye i am going see you soon");
        navigate('/manager')
    } 

    return(
       <div className="p-6">
         <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600"> User Management System</h1>
          <p className="text-gray-600">Home</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome back, {user?.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-4xl font-bold text-blue-600">248</h3>
          <p className="text-gray-500 mt-2">Total Users</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-4xl font-bold text-green-600">187</h3>
          <p className="text-gray-500 mt-2">Active Users</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-4xl font-bold text-purple-600">12</h3>
          <p className="text-gray-500 mt-2">Managers</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
        <p className="text-gray-500">You can view and manage non-admin users here.</p>
        {/* Add table or link to User List */}
      </div>
    </div>
  );
};

export default ManagerHome;


{/* <div className="flex justify-center mt-12 pb-8"> */}
          {/* <div className="grid grid-cols-8 gap-4">
            <div className="col-start-2 col-span-2 w-full text-center text-white  text-opacity-80 bg-gradient-to-r mx-8 h-fit border-b-black rounded-md bg-indigo-950" >
              
              <img
                src="/now showing 3.jpg"
                alt="Now Showing Movie 1"
                className="rounded h-80 w-full"
              />

    <div className="flex justify-between items-center px-4 py-2">
        <span className="text-lg font-semibold">Screen 1</span>
        <span className="text-sm cursor-pointer mt-4 hover:text-opacity-100">Edit</span>
      </div>
            </div>
            <div className="col-start-5  w-full col-span-2 text-center text-white  text-opacity-80 bg-gradient-to-r mx-8 h-fit border-x-black rounded-md bg-indigo-950" >
              
              <img
                src="/now showing 2.jpg"
                alt="Now Showing Movie 2"
                className=" rounded h-80 w-full"
              />
              {/* <span className="block">Screen 2</span> */}
              {/* <div className="flex justify-between items-center px-4 py-2">
        <span className="text-lg font-semibold">Screen 2</span>
        <span className="text-sm cursor-pointer mt-4  hover:text-opacity-100">Edit</span>
      </div>
            </div>
          </div>
        </div> */} 
      {/* </div> */}
