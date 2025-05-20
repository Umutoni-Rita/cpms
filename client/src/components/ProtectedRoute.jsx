import { Navigate, Outlet, useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  let isValidToken = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // seconds
      if (decoded.exp > currentTime) {
        isValidToken = true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  if (!isValidToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
