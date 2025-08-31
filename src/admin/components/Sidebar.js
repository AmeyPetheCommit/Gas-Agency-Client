import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/AdminSidebar.css';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span role="img" aria-label="admin">Hello, </span>
        <h2>Admin</h2>
      </div>
      <nav>
        <ul>
          <li
            className={isActive('/admin/#') ? 'active' : ''}
            onClick={() => navigate('/admin/#')}
          >
            🏠 Dashboard
          </li>

          <li
            className={isActive('/admin/users') ? 'active' : ''}
            onClick={() => navigate('/admin/users')}
          >
            👤 Users
          </li>

          <li
            className={isActive('/admin/bookings') ? 'active' : ''}
            onClick={() => navigate('/admin/bookings')}
          >
            📦 View Bookings
          </li>
          <li
            className={isActive('/admin/appointments') ? 'active' : ''}
            onClick={() => navigate('/admin/appointments')}
          >
            🛠️ Appointments
          </li>
          <li
            className={isActive('/admin/notices') ? 'active' : ''}
            onClick={() => navigate('/admin/notices')}
          >
            ➕ Add Notices
          </li>
          <li
            className={isActive('/admin/all-notices') ? 'active' : ''}
            onClick={() => navigate('/admin/all-notices')}
          >
            📢 All Notices
          </li>
        </ul>
      </nav>
    </aside>
  );
}
