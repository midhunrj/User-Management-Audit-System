import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/user/login";
import Signup from "../pages/user/signup";
import Home from "../pages/user/home";
import UserProfile from "../pages/user/profile";
import NotFound404 from "./protected/404";
import UserProtected from "./protected/userProtected";

export const UserRoute = () => {
  return (

    <Routes>
      <Route path="/" element={<Login />} />
      <Route path='/register' element={<Signup/>}/>
            <Route path="/home" element={<UserProtected><Home/></UserProtected>}/>
            <Route path="/profile" element={<UserProtected><UserProfile/></UserProtected>}/>
           
                  <Route path="*" element={<NotFound404 />} />
    </Routes>
  );
};
