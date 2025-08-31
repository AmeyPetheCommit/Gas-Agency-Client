// src/admin/pages/AddNotice.js
import React, { useState } from "react";
import axios from "axios";
import '../styles/AdminNotices.css'

export default function AddNotice() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("general");

  const submitNotice = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://gas-agency-server.onrender.com/api/notices",
        { title, message, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Notice created successfully!");
      setTitle("");
      setMessage("");
      setType("general");
    } catch (err) {
      alert("Failed to create notice");
    }
  };

  return (
    <div className="admin_notice">
      <h2>➕ Add New Notice</h2>
      <input
        type="text"
        placeholder="Notice Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Notice Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="general">General</option>
        <option value="urgent">Urgent</option>
        <option value="info">Info</option>
      </select>
      <button onClick={submitNotice}>Post Notice</button>
    </div>
  );
}
