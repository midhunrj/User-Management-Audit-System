
// import React,{useState,useEffect, ReactNode} from 'react'
// import { useDispatch,useSelector } from 'react-redux'
// import { Navigate, useNavigate } from 'react-router'
// import { useAuthContext } from '../../context/userContext'
// const AdminProtected = ({children}) => {
//     const navigate=useNavigate()
//     const {admin,token}=useAuthContext()
//     useEffect(()=>{
//      if(!token)
//      {
//         navigate('/admin',{replace:true})
//      }
     
//     },[])
//   if(token&&admin)
//   {
//     return children
//   }
// }

// export default AdminProtected
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/userContext";

const AdminProtected = ({ children }) => {
  const { user, token } = useAuthContext();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  if (user.status === "inactive") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtected;