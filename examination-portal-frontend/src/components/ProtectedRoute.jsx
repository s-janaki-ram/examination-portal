import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {

  // Get the currently logged-in user
  const { user } = useAuth();

  // If there is no logged-in user, go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check whether the user's role is allowed
  if (allowedRole && user.role !== allowedRole) {
    // Send the user to the correct page for their role
    if (user.role === "MANAGER") {
      return <Navigate to="/manager" replace />;
    }

    return <Navigate to="/candidate" replace />;
  }

  // User is authenticated and has the correct role
  return children;
};

export default ProtectedRoute;