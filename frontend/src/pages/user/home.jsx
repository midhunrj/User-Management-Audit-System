import React from 'react'
import { useAuthContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {user,logout}=useAuthContext()
  const navigate=useNavigate()
  const onLogout=()=>{
    logout()
   navigate('/',{replace:true})
  }
  return (

    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-600"> User Management System</h1>
          <p className="text-gray-600">Home</p>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name} </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">My Profile</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Role</p>
              <p className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {user?.role}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <p className="text-green-600 font-medium">Active</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <button 
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition mb-3"
            onClick={() => {/* Navigate to Edit Profile */}}
          >
            Edit Profile
          </button>
          <button 
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition"
            onClick={() => {/* Change Password */}}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home