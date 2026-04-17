import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/userContext";

const ManagerProtected = ({ children }) => {
  const { user, token } = useAuthContext();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== "Manager") {
    return <Navigate to="/" replace />;
  }

  if (user.status === "inactive") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ManagerProtected;