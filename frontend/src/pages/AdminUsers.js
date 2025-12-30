import { useEffect, useState } from "react";
import API from "../services/api";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    setError("");
    try {
      const res = await API.get(`/admin/users?page=${pageNumber}&limit=10`);
      setUsers(res.data.data.users);
      setTotalPages(res.data.data.pagination.totalPages);
      setPage(pageNumber);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const handleToggleStatus = async (user) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${user.status === "active" ? "deactivate" : "activate"} this user?`
    );

    if (!confirmAction) return;

    try {
      const endpoint =
        user.status === "active"
          ? `/admin/users/${user._id}/deactivate`
          : `/admin/users/${user._id}/activate`;

      await API.patch(endpoint);
      alert("User status updated successfully");
      fetchUsers(page);
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      {!loading && users.length > 0 && (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.fullName}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    onClick={() => handleToggleStatus(user)}
                    style={{
                      background:
                        user.status === "active" ? "#f44336" : "#4CAF50",
                      color: "#fff",
                    }}
                  >
                    {user.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div style={{ marginTop: "10px" }}>
        <button
          disabled={page === 1}
          onClick={() => fetchUsers(page - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchUsers(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
