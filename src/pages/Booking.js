import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Subnav from './Sub-Nav';
import './Booking.css';
import { FaGasPump, FaRegCalendarAlt, FaUserCircle } from 'react-icons/fa';
import gasImage from '../assets/cylinder-book.png';
import { FaTruckFast } from "react-icons/fa6";

export default function Booking() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';

    axios.get('https://gas-agency-server.onrender.com/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        window.location.href = '/login';
      });
  }, []);


  if (loading) return <p>Loading...</p>;

  return (
    <div className="booking-wrapper">
  <Navbar />
  <Subnav />
  <div className="booking-section">
    
    <div className="booking-image-container">
    <img src={gasImage} alt="Gas Buddy" className="gas-character" />
  </div>

    <div className="booking-card">
      <div className="booking-header">
        <FaGasPump size={28} />
        <h2>Book Your Gas Cylinder</h2>
      </div>
      <div className="booking-details">
        <p><FaUserCircle /> <strong>Name:</strong> {user.name}</p>
        <p><strong>Consumer No:</strong> {user.consumerNumber}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><FaRegCalendarAlt /> <strong>Cylinders Left:</strong> {user.cylindersLeft}</p>
        <p><strong>Last Booking:</strong> {user.lastBooking ? new Date(user.lastBooking).toLocaleDateString() : 'No bookings yet'}</p>
      </div>
      <button className="book-action-btn" onClick={() => Navigate('/order')}>
        <span>{user.cylindersLeft > 0 ? 'Book Cylinder Now' : 'No Cylinders Left'}</span>
        
        <div className="truck-icon-wrapper">
          <div className="smoke"></div>
          <FaTruckFast className="truck-icon" />
        </div>
      </button>
    </div>
  </div>
</div>
  );
}
