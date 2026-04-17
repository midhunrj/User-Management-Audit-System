import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/login";
import Dashboard from "../pages/admin/adminDashboard";
import UserList from "../pages/admin/userList";
import ManagerList from "../pages/admin/managerList";
import AdminProtected from "./protected/adminProtected";

;

export const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route
        path="/home"
        element={
          <AdminProtected>
            <Dashboard/>
          </AdminProtected>
        }
      />
      <Route
        path="/users"
        element={
          <AdminProtected>
            <UserList/>
          </AdminProtected>
        }
      />
      <Route
        path="/managers"
        element={
          <AdminProtected>
            <ManagerList />
          </AdminProtected>
        }
      />
      
      <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};
