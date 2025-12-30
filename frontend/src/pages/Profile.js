import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setProfileForm({
        fullName: user.fullName,
        email: user.email,
      });
    }
  }, [user]);

  const handleProfileChange = (e) =>
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setProfileMessage("");

    try {
      const res = await API.put("/auth/profile", profileForm);
      setUser(res.data.data);
      setProfileMessage("Profile updated successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPasswordMessage("");

    if (!passwordForm.oldPassword || !passwordForm.newPassword) {
      setError("Both password fields are required");
      return;
    }

    try {
      await API.put("/auth/change-password", passwordForm);
      setPasswordForm({ oldPassword: "", newPassword: "" });
      setPasswordMessage("Password changed successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    }
  };

  const handleCancel = () => {
    setProfileForm({
      fullName: user.fullName,
      email: user.email,
    });
    setProfileMessage("");
    setError("");
  };

  return (
    <div>
      <h2>User Profile</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Profile Info */}
      <form onSubmit={handleProfileSubmit}>
        <h3>Edit Profile</h3>

        {profileMessage && (
          <p style={{ color: "green" }}>{profileMessage}</p>
        )}

        <input
          name="fullName"
          placeholder="Full Name"
          value={profileForm.fullName}
          onChange={handleProfileChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={profileForm.email}
          onChange={handleProfileChange}
        />

        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>

      <hr />

      {/* Change Password */}
      <form onSubmit={handlePasswordSubmit}>
        <h3>Change Password</h3>

        {passwordMessage && (
          <p style={{ color: "green" }}>{passwordMessage}</p>
        )}

        <input
          name="oldPassword"
          type="password"
          placeholder="Old Password"
          value={passwordForm.oldPassword}
          onChange={handlePasswordChange}
        />

        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={passwordForm.newPassword}
          onChange={handlePasswordChange}
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
