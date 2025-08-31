// 📁 client/src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Subnav from './Sub-Nav';
import Footer from './Footer';
import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../animations/loading.json';
import './Home.css';
import gasImage from '../assets/cylinder-about.png'

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    axios.get('https://gas-agency-server.onrender.com/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUser(res.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        setLoading(false);
        alert('Failed to load booking history');
        navigate('/login');
      });
  }, [navigate]);


  if (loading) {
      return (
        <div className="loading-wrapper">
          <Player autoplay loop src={loadingAnimation} style={{ height: '250px', width: '250px' }} />
        </div>
      );
    }

  return (
  <div className="home-layout">
    <Navbar />
    <Subnav />

    <section id="dashboard" className="user-panel">
  <h2>Hello, {user.name} 👋</h2>

  <div className="user-grid">
    <div className="info-block">
      <label>Consumer Number</label>
      <p>{user.consumerNumber}</p>
    </div>
    <div className="info-block">
      <label>Mobile Number</label>
      <p>{user.mobile || 'Not provided'}</p>
    </div>
    <div className="info-block">
      <label>Email</label>
      <p>{user.email}</p>
    </div>
    <div className="info-block">
      <label>Cylinders Left</label>
      <p>{user.cylindersLeft}</p>
    </div>
    <div className="info-block">
      <label>Last Booking</label>
      <p>{user.lastBooking ? new Date(user.lastBooking).toLocaleDateString() : 'No bookings yet'}</p>
    </div>
    <div className="info-block">
      <label>Registered On</label>
      <p>{new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  </div>
</section>

<section id="services" className="our-services">
  <h2>Our Services</h2>
  <p className="services-subtitle">Delivering convenience and safety with every cylinder.</p>

  <div className="services-grid">
    <div className="service-card">
      <a href='/book'>
      <span className="icon">🚚</span>
      <h3>Home Delivery</h3>
      <p>Gas cylinders delivered to your doorstep with proper safety protocols.</p></a>
    </div>

    <div className="service-card">
      <a href='/order'>
      <span className="icon">📝</span>
      <h3>Online Booking</h3>
      <p>Book gas cylinders anytime, from anywhere with our online portal.</p></a>
    </div>

    <div className="service-card">
      <a href='/history'>
      <span className="icon">🧾</span>
      <h3>Billing & Receipts</h3>
      <p>Get instant billing confirmation and digital receipts after every booking.</p></a>
    </div>

    <div className="service-card">
      <a href='#contact'> 
      <span className="icon">📞</span>
      <h3>Support & Queries</h3>
      <p>Our customer support is always ready to assist you with any issue.</p></a>
    </div>

    <div className="service-card">
      <span className="icon">📅</span>
      <h3>Scheduled Refills</h3>
      <p>Set reminders or schedule auto-refills to avoid running out of gas.</p>
    </div>

    <div className="service-card">
      <a href='/appoinment'>
      <span className="icon">🧯</span>
      <h3>Safety Checks</h3>
      <p>We perform regular leak inspections to ensure the safety of your home.</p></a>
    </div>
  </div>
</section>



  <section id="why-us" className="why-us">
  <h2>Why Choose Our Gas Agency?</h2>
  <p className="why-subtitle">Reliable, responsive, and customer-first services.</p>

  <div className="why-us-features">
    <div className="feature-box fancy">
      <span className="icon">⚡</span>
      <h3>Superfast Delivery</h3>
      <p>We deliver cylinders within 24 hours, right at your doorstep.</p>
    </div>

    <div className="feature-box fancy">
      <span className="icon">🛡️</span>
      <h3>Certified Agency</h3>
      <p>Government-authorized service trusted by 10,000+ customers.</p>
    </div>

    <div className="feature-box fancy">
      <span className="icon">📲</span>
      <h3>24x7 Booking Access</h3>
      <p>Book cylinders online from any device, anytime.</p>
    </div>

    <div className="feature-box fancy">
      <span className="icon">👨‍🔧</span>
      <h3>Skilled Technicians</h3>
      <p>Trained staff ensure safe installation and doorstep support.</p>
    </div>

    <div className="feature-box fancy">
      <span className="icon">💸</span>
      <h3>Transparent Billing</h3>
      <p>No hidden charges — you pay what you see.</p>
    </div>

    <div className="feature-box fancy">
      <span className="icon">📦</span>
      <h3>Easy Refill</h3>
      <p>Quick rebooking options and auto-reminders available.</p>
    </div>
  </div>
</section>

<section id="about-us" className="about-us">
  <h2>About Us</h2>
  <div className="about-content">
    <div className="about-text">
      <p>
        Established in 2005, our Gas Agency has been a trusted name in fuel delivery services for households and businesses alike.
        We aim to simplify your life by offering safe, reliable, and timely delivery of LPG cylinders at your doorstep.
      </p>
      <p>
        With a dedicated team, a focus on customer satisfaction, and a commitment to safety, we've proudly served over 10,000 happy customers. 
        We continue to improve our systems and services to provide the best experience possible.
      </p>
      <p>
        From fast delivery to 24/7 online booking, we’re redefining how you manage your energy needs.
      </p>
    </div>

    <div className="about-image">
      <img src={gasImage} alt="About Gas Agency" />
    </div>
  </div>
</section>

<section id="contact" className="contact-us">
  <h2>Contact Us</h2>
  <p className="contact-subtitle">We're here to help — reach out to us anytime!</p>

  <div className="contact-grid">
    <div className="contact-info">
      <p><strong>📍 Address:</strong> Gas Agency, Umiya complex, Titwala, Maharashtra, 421605</p>
      <p><strong>📞 Phone:</strong> +91 72085 92529</p>
      <p><strong>📧 Email:</strong> ameypethe23@gmail.com</p>
      <p><strong>⏰ Working Hours:</strong> Mon - Sat, 9AM to 7PM</p>
    </div>

    <form className="contact-form">
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <textarea rows="4" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </div>
</section>

<Footer/>
  </div>
);

}
