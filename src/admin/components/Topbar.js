import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminSidebar.css';

export default function Topbar() {

  const navigate = useNavigate();


    const logout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    };
  return (
    <header className="dashboard-ptopbar">
      <h2>Gas Agency Admin Panel</h2>
      <button onClick={logout} className="logout-btn">Logout</button>
    </header>
  );
}