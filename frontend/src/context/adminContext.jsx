 import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// import { ReactNode, useContext, useEffect, useState } from "react";
// import { createContext } from "vm";




const AdminContext = createContext(undefined);

export const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminContext must be used within an AuthProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setadmin] = useState(() => {
    
        try {
          const adminData = localStorage.getItem("urladminData")
          return adminData ? JSON.parse(adminData) : null
        } catch (error) {
          console.error("Error parsing adminData from localStorage", error);
          return null;
        }
      });
    const [adminAuthenticated, setadminAuthenticated] = useState(() => {
        try {
            const adminData = localStorage.getItem("urladminData");
            return adminData ? JSON.parse(adminData) : false;
          } catch (error) {
            console.error("Error parsing adminData from localStorage", error);
            return false;
          }
        });
        useEffect(() => {
              if (admin) {
                localStorage.setItem("urladminData", JSON.stringify(admin));
              } else {
                localStorage.removeItem("urladminData");
              }
              setadminAuthenticated(!!admin);
            }, [admin]);
      // useEffect(() => {
      //   localStorage.setItem("urladminData", JSON.stringify(adminAuthenticated));
      // }, [adminAuthenticated]);

  return (
    <AdminContext.Provider
      value={{
        adminAuthenticated,
        setadminAuthenticated,
        admin,
        setadmin
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};


export default AdminProvider;
