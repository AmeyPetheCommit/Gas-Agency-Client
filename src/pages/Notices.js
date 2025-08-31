// src/pages/UserNotices.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notice.css";
import Navbar from './Navbar';
import SubNav from './Sub-Nav';

export default function UserNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchNotices = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get("https://gas-agency-server.onrender.com/api/notices", { headers });
        setNotices(res.data);

        // ✅ Mark all notices as viewed
        await axios.put("https://gas-agency-server.onrender.com/api/notices/viewed/all", {}, { headers });

        // ✅ Reset badge count
        localStorage.setItem("noticeSeen", Date.now()); // trick to trigger UI reset
      } catch (err) {
        console.error("Failed to load notices");
      }
    };

    fetchNotices();
  }, []);

  return (
    <div className="notices">
        <Navbar/>
        <SubNav/>
    <div className="user-notices">
      <h2>📢 Latest Notices</h2>
      {notices.length === 0 ? (
        <p>No notices available</p>
      ) : (
        notices.map((n) => (
          <div key={n._id} className="notice-card">
            <h3>
              {n.title}
              <span className={`notice-badge ${n.type}`}>{n.type}</span>
            </h3>
            <p>{n.message}</p>
            <small>
              Posted on: {new Date(n.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
    </div>
  );
}
