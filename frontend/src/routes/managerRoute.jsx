import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";



import ManagerLogin from "../pages/manager/login";
import ManagerSignup from "../pages/manager/signup";
import ManagerProfile from "../pages/manager/profile";
import ManagerProtected from "./protected/managerProtected";
import ManagerHome from "../pages/manager/managerHome";
import { IdentifierProvider } from "../context/IdentifierContext";
import NotFound404 from "./protected/404";

export const ManagerRoute = () => {
  return (
    // <BrowserRouter>
    // <IdentifierProvider>
      <Routes>
        <Route path="/" element={<ManagerLogin />} />
        {/* <Route path="/register" element={<ManagerSignup />} /> */}
        <Route
          path="/profile"
          element={
            <ManagerProtected>
              <ManagerProfile />
            </ManagerProtected>
          }
        />
        <Route
          path="/home"
          element={
            <ManagerProtected>
              <ManagerHome />
            </ManagerProtected>
          }
        />
        
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    // </IdentifierProvider>
  );
};
