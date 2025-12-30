import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return user.role === "admin"
    ? children
    : <Navigate to="/profile" replace />;
};

export default AdminRoute;
