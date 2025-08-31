import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Subnav from './Sub-Nav';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './BookingHistroy.css';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return (window.location.href = '/login');

    axios
      .get('https://gas-agency-server.onrender.com/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert('Failed to load booking history');
      });
  }, []);

  const downloadReceipt = (booking) => {
    const doc = new jsPDF();
    const date = new Date(booking.bookingDate).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    doc.setFontSize(18);
    doc.text('Gas Booking Receipt', 14, 20);
    doc.setFontSize(12);
    doc.text(`Order Date: ${date}`, 14, 30);
    doc.text(`Receipt ID: #${Math.floor(Math.random() * 90000) + 10000}`, 150, 30);

    autoTable(doc, {
      startY: 40,
      head: [['Field', 'Details']],
      body: [
        ['Name', booking.name || 'User'],
        ['Phone', booking.phone],
        ['Consumer Number', booking.consumerNumber],
        ['Address', `${booking.address.apartment}, ${booking.address.building}, ${booking.address.street}, ${booking.address.city}`],
        ['Payment Mode', booking.paymentMode],
        ['Status', booking.status],
      ],
      headStyles: { fillColor: [41, 128, 185] },
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [['Item', 'Price']],
      body: [
        ['Cylinder Price', '₹800.00'],
        ['Delivery Charge', '₹50.00'],
        [{ content: 'Total', styles: { fontStyle: 'bold' } }, '₹850.00'],
      ],
      headStyles: { fillColor: [46, 204, 113] },
    });

    doc.save('Gas_Booking_Receipt.pdf');
  };

  if (loading) return <p>Loading your bookings...</p>;

  return (
    <div>
      <Navbar />
      <Subnav />
      <div className="history-page">
        <h2>Your Booking History</h2>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Address</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Receipt</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i}>
                  <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                  <td>{`${b.address.apartment}, ${b.address.building}, ${b.address.street}, ${b.address.city}`}</td>
                  <td>{b.paymentMode}</td>
                  <td>
                    <span className={`status ${b.status.toLowerCase()}`}>{b.status}</span>
                  </td>
                  <td>
                    <button onClick={() => downloadReceipt(b)}>Receipt</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
