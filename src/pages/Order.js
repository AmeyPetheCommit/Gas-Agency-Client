// Order.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Order.css';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function BookingForm() {
  const [form, setForm] = useState({
    apartment: '',
    building: '',
    street: '',
    city: '',
    phone: '',
    paymentMode: 'COD',
    email: '',
    name: '',
    consumerNumber: '',
    cylinderPrice: 800,
    deliveryCharge: 50,
    totalAmount: 850,
  });

  useEffect(() => {
    localStorage.removeItem('bookingSubmitted');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://gas-agency-server.onrender.com/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      const user = res.data;
      setForm((prevForm) => ({
        ...prevForm,
        apartment: user.address?.apartment || '',
        building: user.address?.building || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        phone: user.mobile || '',
        email: user.email || '',
        name: user.name || '',
        consumerNumber: user.consumerNumber || '',
      }));
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('bookingForm', JSON.stringify(form));
    localStorage.setItem('latestBooking', JSON.stringify(form));

    if (form.paymentMode === 'Paytm') {
      handlePaytmPayment();
    } else {
      window.location.href = '/payment-success';
    }
  };

  const handlePaytmPayment = async () => {
    const stripe = await stripePromise;
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post('https://gas-agency-server.onrender.com/api/payment/create-checkout-session', {
        name: form.name,
        email: form.email,
        price: form.totalAmount,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await stripe.redirectToCheckout({ sessionId: res.data.id });
    } catch (err) {
      alert('Stripe payment failed');
      console.error(err);
    }
  };

  return (
    <div className="booking-form-wrapper">
      <h2>Complete Your Booking</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>Consumer Number</label>
        <input type="text" required value={form.consumerNumber} onChange={(e) => setForm({ ...form, consumerNumber: e.target.value })} />

        <label>Apartment / Flat No</label>
        <input type="text" required value={form.apartment} onChange={(e) => setForm({ ...form, apartment: e.target.value })} />

        <label>Building / Society</label>
        <input type="text" required value={form.building} onChange={(e) => setForm({ ...form, building: e.target.value })} />

        <label>Street / Area</label>
        <input type="text" required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} />

        <label>City</label>
        <input type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />

        <label>Phone Number</label>
        <input type="text" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

        <label>Payment Mode</label>
        <select value={form.paymentMode} onChange={(e) => setForm({ ...form, paymentMode: e.target.value })}>
          <option value="COD">Cash on Delivery</option>
          <option value="Paytm">Paytm</option>
        </select>

        <p><strong>Total Amount:</strong> ₹{form.cylinderPrice} (Cylinder) + ₹{form.deliveryCharge} (Delivery) = ₹{form.totalAmount}</p>

        <button className='submit-btn' type="submit">Place Booking</button>
      </form>
    </div>
  );
}
