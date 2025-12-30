import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {}
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav style={{ marginBottom: "20px" }}>
      <span>
        {user.fullName} ({user.role})
      </span>

      <Link to="/profile">Profile</Link>

      {user.role === "admin" && (
        <Link to="/admin/users">Admin Dashboard</Link>
      )}

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
