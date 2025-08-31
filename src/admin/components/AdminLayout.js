import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import '../styles/adminLayout.css';

export default function AdminLayout() {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">

          <Outlet />
        </div>
      </div>
    </div>
  );
}
