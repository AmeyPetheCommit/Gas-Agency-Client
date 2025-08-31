import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css'; // optional styling

export default function ViewAllBookings() {
    const [bookings, setBookings] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem('token');
  axios.get('https://gas-agency-server.onrender.com/api/admin/bookings', {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then((res) => setBookings(res.data))
  .catch(err => {
    console.error('Failed to fetch bookings', err);
    alert('Failed to load bookings');
  });
}, []);

  const updateStatus = (id, newStatus) => {
    const token = localStorage.getItem('token');
    axios.put(`https://gas-agency-server.onrender.com/api/admin/bookings/${id}`, { status: newStatus }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => {
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
    });
  };
  return (
    <div className="admin-page">
      <h2>📦 All Bookings</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Consumer No.</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index}>
              <td>{b.userId?.name || 'User'}</td>
              <td>{b.consumerNumber}</td>
              <td>{`${b.address.apartment}, ${b.address.building}, ${b.address.street}, ${b.address.city}`}</td>
              <td>{b.phone}</td>
              <td>{b.paymentMode}</td>
              <td>{b.status}</td>
              <td>
                <select onChange={e => updateStatus(b._id, e.target.value)} value={b.status}>
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
