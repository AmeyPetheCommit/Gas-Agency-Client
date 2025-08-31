import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../animations/loading.json';
import successAnimation from '../animations/success.json';
import './PaymentSuccess.css';

export default function PaymentSuccess() {
  const hasSubmitted = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const submitBooking = async () => {
      if (hasSubmitted.current) return;
      hasSubmitted.current = true;

      const token = localStorage.getItem('token');
      const savedForm = JSON.parse(localStorage.getItem('bookingForm'));

      if (savedForm) {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate delay

        try {
           await axios.post('https://gas-agency-server.onrender.com/api/bookings', savedForm, {
            headers: { Authorization: `Bearer ${token}` },
          });

          localStorage.removeItem('bookingForm');
          setLoading(false);
        } catch (err) {
          setLoading(false);
          alert('Booking save failed after payment.');
          console.error(err);
        }
      }
    };

    submitBooking();
  }, []);

  return (
    <div className="payment-success-wrapper">
      {loading ? (
        <Player
          autoplay
          loop
          src={loadingAnimation}
          style={{ height: '250px', width: '250px' }}
        />
      ) : (
        <div className="success-content">
          <Player
            autoplay
            loop={true}
            src={successAnimation}
            style={{ height: '200px', width: '200px' }}
          />
          <h2> Booking Confirmed!</h2>
          <div className="success-buttons">
            <button onClick={() => window.location.href = '/'}>Home</button>
            <button onClick={() => window.location.href = '/receipt'}>Receipt</button>
          </div>
        </div>
      )}
    </div>
  );
}
