import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/userContext";

const UserProtected = ({ children }) => {
  const { user, token,isAuthenticated } = useAuthContext();

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "User") {
    return <Navigate to="/" replace />;
  }

  if (user.status === "inactive") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UserProtected;