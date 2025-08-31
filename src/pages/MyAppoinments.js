import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import SubNav from './Sub-Nav';
import './MyAppointments.css';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';

    axios.get('https://gas-agency-server.onrender.com/api/appointments', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setAppointments(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
      alert('Failed to load appointments');
    });
  }, []);

  return (
    <div className="appointments-page">
      <Navbar />
      <SubNav />
      <div className="appointments-wrapper">
        <h2>📝 My Appointments</h2>
        {loading ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt, index) => (
                <tr key={index}>
                  <td>{new Date(appt.preferredDate).toLocaleDateString()}</td>
                  <td>{appt.timeSlot}</td>
                  <td><span className={`status ${appt.status.toLowerCase()}`}>{appt.status}</span></td>
                  <td>{appt.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
