import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/signup", {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
      />

      <button type="submit">Signup</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default Signup;
