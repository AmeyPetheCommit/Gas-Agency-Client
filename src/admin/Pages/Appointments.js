import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/appoinment.css'; // optional styling

export default function ViewAllAppointments() {
    const [appoinments, setappointments] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem('token');
  axios.get('https://gas-agency-server.onrender.com/api/admin/appointments', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then((res) => setappointments(res.data))
  .catch(err => {
    console.error('Failed to fetch appointments', err);
    alert('Failed to load appointments');
  });
}, []);

  const updateStatus = (id, newStatus) => {
    const token = localStorage.getItem('token');
    axios.put(`https://gas-agency-server.onrender.com/api/admin/appointments/${id}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setappointments(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
    });
  };
  return (
    <div className="admin-page">
      <h2>🛠️ Safty-Check Appointments</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Consumer No.</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Note</th>
            <th>Status</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {appoinments.map((a, index) => (
            <tr key={index}>
              <td>{a.userId?.name || 'User'}</td>
              <td>{a.consumerNumber}</td>
              <td className="address-cell" title={`${a.address.apartment}, ${a.address.building}, ${a.address.street}, ${a.address.city}`}> 
                {`${a.address.apartment}, ${a.address.building}, ${a.address.street}, ${a.address.city}`}</td>
              <td>{a.phone}</td>
              <td>{new Date(a.preferredDate).toLocaleDateString()}</td>
              <td>{a.timeSlot}</td>
              <td className="note-cell" title={a.note}>{a.note}</td>
              <td>{a.status}</td>
              <td>
              <select onChange={e => updateStatus(a._id, e.target.value)} value={a.status}>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
