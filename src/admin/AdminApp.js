import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './Pages/AdminDashboard';
import ViewAllUsers from './Pages/Users';
import ViewAllBookings from './Pages/Bookings';
import ViewAllAppointments from './Pages/Appointments';
import ManageNotices from './Pages/ManageNotices';
import AllNotices from './Pages/AllNotices';

export default function AdminApp() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='/users' element={<ViewAllUsers />} />
        <Route path="bookings" element={<ViewAllBookings />} />
        <Route path="appointments" element={<ViewAllAppointments />} />
        <Route path='notices' element={<ManageNotices/>} />
        <Route path='all-notices' element={<AllNotices/>} />
      </Route>
    </Routes>
  );
}
