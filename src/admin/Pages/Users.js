import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css'

export default function ViewAllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://gas-agency-server.onrender.com/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUsers(res.data))
    .catch(err => {
      alert('Failed to load users');
      console.error(err);
    });
  }, []);

  return (
    <div className="admin-page">
      <h2>👤 All Users</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Consumer No.</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Cylinders Left</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index}>
              <td>{u.name}</td>
              <td>{u.consumerNumber}</td>
              <td>{u.email}</td>
              <td>{u.mobile}</td>
              <td>{u.address.city}</td>
              <td>{u.cylindersLeft}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
