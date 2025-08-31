import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import SubNav from './Sub-Nav'
import './AppointmentBooking.css';

export default function AppointmentBooking() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'https://gas-agency-server.onrender.com/api/appointments',
        { date, time, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setDate('');
      setTime('');
      setNote('');
      navigate('/my-appointments');
    } catch (err) {
      alert('Failed to book appointment');
      console.error(err);
    }
  };

  return (
    <div className='appoinment'>
        <Navbar/>
    <SubNav/>
    <div className="appointment-wrapper">
      <h2>🛠️ Book Safety Check Appointment</h2>
      <form className="appointment-form" onSubmit={handleBooking}>
        <div>
          <label>Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Time</label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label>Additional Notes (optional)</label>
          <textarea
            placeholder="E.g. Please bring mask / verify valve / urgent check..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <button type="submit">Confirm Appointment</button>
      </form>
    </div>
    </div>
  );
}

