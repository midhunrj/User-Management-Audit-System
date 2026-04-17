 import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// import { ReactNode, useContext, useEffect, useState } from "react";
// import { createContext } from "vm";




const ManagerContext = createContext(undefined);

export const useManagerContext = () => {
  const context = useContext(ManagerContext);
  if (!context) {
    throw new Error("useManagerContext must be used within an AuthProvider");
  }
  return context;
};

export const ManagerProvider = ({ children }) => {
  const [manager, setmanager] = useState(() => {
    
        try {
          const managerData = localStorage.getItem("urlmanagerData")
          return managerData ? JSON.parse(managerData) : null
        } catch (error) {
          console.error("Error parsing managerData from localStorage", error);
          return null;
        }
      });
    const [ManagerAuthenticated, setmanagerAuthenticated] = useState(() => {
        try {
            const managerData = localStorage.getItem("urlmanagerData");
            return managerData ? JSON.parse(managerData) : false;
          } catch (error) {
            console.error("Error parsing managerData from localStorage", error);
            return false;
          }
        });
        useEffect(() => {
              if (manager) {
                localStorage.setItem("urlmanagerData", JSON.stringify(manager));
              } else {
                localStorage.removeItem("urlmanagerData");
              }
              setmanagerAuthenticated(!!manager);
            }, [manager]);
      // useEffect(() => {
      //   localStorage.setItem("urlmanagerData", JSON.stringify(managerAuthenticated));
      // }, [managerAuthenticated]);

  return (
    <ManagerContext.Provider
      value={{
        ManagerAuthenticated,
        setmanagerAuthenticated,
        manager,
        setmanager
      }}
    >
      {children}
    </ManagerContext.Provider>
  );
};


export default ManagerProvider;
