import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AllNotices.css";

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get("https://gas-agency-server.onrender.com/api/notices", { headers });
      setNotices(res.data);
    } catch (err) {
      console.error("Failed to fetch notices", err);
      alert("Failed to fetch notices");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const deleteNotice = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`https://gas-agency-server.onrender.com/api/notices/${id}`, { headers });
      alert("Notice deleted successfully");
      setNotices((prev) => prev.filter((n) => n._id !== id)); // update UI
    } catch (err) {
      console.error("Failed to delete notice", err);
      alert("Failed to delete notice");
    }
  };

  return (
    <div className="admin-page">
      <h2>📢 Manage Notices</h2>
      {notices.length === 0 ? (
        <p>No notices available</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Message</th>
              <th>Type</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n._id}>
                <td>{n.title}</td>
                <td className="truncate">{n.message}</td>
                <td>
                  <span className={`notice-badge ${n.type}`}>{n.type}</span>
                </td>
                <td>{new Date(n.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteNotice(n._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
