//  import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// // import { ReactNode, useContext, useEffect, useState } from "react";
// // import { createContext } from "vm";




// const UserContext = createContext(undefined);

// export const useAuthContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// };

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
    
//         try {
//           const userData = localStorage.getItem("urlUserData")
//           return userData ? JSON.parse(userData) : null
//         } catch (error) {
//           console.error("Error parsing userData from localStorage", error);
//           return null;
//         }
//       });
//     const [userAuthenticated, setUserAuthenticated] = useState(() => {
//         try {
//             const userData = localStorage.getItem("urlUserData");
//             return userData ? JSON.parse(userData) : false;
//           } catch (error) {
//             console.error("Error parsing userData from localStorage", error);
//             return false;
//           }
//         });
//         useEffect(() => {
//               if (user) {
//                 localStorage.setItem("urlUserData", JSON.stringify(user));
//               } else {
//                 localStorage.removeItem("urlUserData");
//               }
//               setUserAuthenticated(!!user);
//             }, [user]);
//       // useEffect(() => {
//       //   localStorage.setItem("urlUserData", JSON.stringify(userAuthenticated));
//       // }, [userAuthenticated]);

//   return (
//     <UserContext.Provider
//       value={{
//         userAuthenticated,
//         setUserAuthenticated,
//         user,
//         setUser
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };


// export default UserProvider;

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("userData");
      setIsAuthenticated(false);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [token]);

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};