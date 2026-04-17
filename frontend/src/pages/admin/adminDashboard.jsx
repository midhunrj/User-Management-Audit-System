import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";


import Chart from "chart.js/auto";
import { Pie, Line, Bar,Scatter,Bubble,Radar, Doughnut } from "react-chartjs-2";
import SidebarMenu from "./sidebarMenu";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
  PointElement,
  ArcElement, 
  RadarController, 
  ScatterController, 
  BubbleController,
    Title,
    Tooltip,
    Legend
  } from "chart.js";

import { adminAuthenticate } from "../../services/adminInterceptor";
import { useAuthContext } from "../../context/userContext";
const Dashboard = () => {

    const {user,logout}=useAuthContext()
    const handleLogout = () => {
    logout();
    navigate("/admin");
  };
  return (
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
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Hello, {user?.name} | Full Control</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-4xl font-bold text-indigo-600">324</h3>
          <p className="text-gray-500">Total Users</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-4xl font-bold text-green-600">289</h3>
          <p className="text-gray-500">Active</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-4xl font-bold text-yellow-600">28</h3>
          <p className="text-gray-500">Managers</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-4xl font-bold text-red-600">7</h3>
          <p className="text-gray-500">Inactive</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700">
              Add New User
            </button>
            <button className="w-full bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900">
              View All Users
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">System Overview</h2>
          <p className="text-gray-600">You have full access to manage all users, roles, and permissions.</p>
        </div>
      </div>
    </div>
  );;
};

export default Dashboard;
