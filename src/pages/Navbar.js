import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Gas Agency</div>
      <ul className="navbar-links">
        <li><a href="#dashboard">Dashboard</a></li>
        <li><a href="#services">Our Services</a></li>
        <li><a href="#why-us">Why Us?</a></li>
        <li><a href="#about-us">About Us</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
} 