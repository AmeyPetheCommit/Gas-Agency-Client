import React from 'react';
import { Link } from 'react-router-dom';
import './Sub-Nav.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Navbar() {
  const [noticeCount, setNoticeCount] = useState(0);
  

  useEffect(() => {
  const fetchCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get("https://gas-agency-server.onrender.com/api/notices/unviewed/count", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNoticeCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch notice count");
    }
  };

  fetchCount();

  // ✅ Listen for updates when notices are viewed
  window.addEventListener("storage", fetchCount);

  return () => window.removeEventListener("storage", fetchCount);
}, []);

  return (
    <nav className="subnavbar">
      <ul className="subnavbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/book">Book Cylinder</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/appoinment">Safety Checks</Link></li>
        <li><Link to="/my-appointments">My Appointment</Link></li>
        <li><Link to="/notices">Notices {noticeCount > 0 && (
            <span className="badge">{noticeCount}</span>
          )}</Link></li>
      </ul>
    </nav>
  );
} 