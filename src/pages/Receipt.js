// Receipt.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Receipt.css';

export default function Receipt() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const date = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem('latestBooking'));
    if (bookingData) {
      setBooking(bookingData);
    }
    setLoading(false);
  }, []);

  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(' Gas Booking Receipt', 14, 20);

  doc.setFontSize(12);
  doc.text(`Order Date: ${date}`, 14, 30);
  doc.text(`Receipt ID: #${Math.floor(Math.random() * 90000) + 10000}`, 150, 30); // Random ID

  autoTable(doc, {
    startY: 40,
    head: [['Field', 'Details']],
    body: [
      ['Name', booking?.name || ''],
      ['Email', booking?.email || ''],
      ['Phone', booking?.phone || ''],
      ['Consumer Number', booking?.consumerNumber || ''],
      ['Address', `${booking?.apartment}, ${booking?.building}, ${booking?.street}, ${booking?.city}`],
      ['Payment Mode', booking?.paymentMode || ''],
      
    ],
    styles: { halign: 'left' },
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
    styles: { halign: 'left' },
    headStyles: { fillColor: [46, 204, 113] },
  });

  doc.save('Gas_Booking_Receipt.pdf');
};

  return (
    <div className="receipt-wrapper">
      <h2>📄 Booking Receipt</h2>

      {loading ? (
        <p>Loading receipt...</p>
      ) : booking ? (
        <>
          <div className="receipt-card">
            <div className="receipt-header">
              <h3>Gas Agency Pvt Ltd</h3>
              <p>Date: {date}</p>
            </div>
            <div className="receipt-preview">
              <div><strong>Name:</strong> {booking.name}</div>
              <div><strong>Email:</strong> {booking.email}</div>
              <div><strong>Phone:</strong> {booking.phone}</div>
              <div><strong>Consumer Number:</strong> {booking.consumerNumber}</div>
              <div><strong>Address:</strong> {`${booking.apartment}, ${booking.building}, ${booking.street}, ${booking.city}`}</div>
              <div><strong>Payment Mode:</strong> {booking.paymentMode}</div>
              <div><strong>Status:</strong> {booking.status || 'Pending'}</div>
              <div><strong>Cylinder Price:</strong> ₹800.00</div>
              <div><strong>Delivery Charge:</strong> ₹50.00</div>
              <div className="receipt-total"><strong>Total:</strong> ₹850.00</div>
            </div>
            <div className="receipt-actions">
              <button onClick={downloadPDF}>📥 Download PDF</button>
              <button onClick={() => navigate('/')}>🏠 Go Home</button>
            </div>
          </div>
        </>
      ) : (
        <p>❌ No booking data found.</p>
      )}
    </div>
  );
}