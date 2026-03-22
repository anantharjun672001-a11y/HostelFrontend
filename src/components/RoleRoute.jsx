import { Navigate } from "react-router-dom";

const RoleRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  
  if (!user.role || !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;