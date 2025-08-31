import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css'; // Create this CSS file
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers:0,
    totalBookings: 0,
    totalAppointments: 0,
    pendingBookings: 0,
    pendingAppointments: 0,
    totalNotices:0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const fetchStats = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const [usersRes, bookingsRes, appointmentsRes, NoticesRes] = await Promise.all([
          axios.get('https://gas-agency-server.onrender.com/api/admin/users', { headers }),
          axios.get('https://gas-agency-server.onrender.com/api/admin/bookings', { headers }),
          axios.get('https://gas-agency-server.onrender.com/api/admin/appointments', { headers }),
          axios.get('https://gas-agency-server.onrender.com/api/Notices', { headers }),
        ]);

        const totalUsers = usersRes.data.length;
        const totalBookings = bookingsRes.data.length;
        const totalAppointments = appointmentsRes.data.length;
        const pendingBookings = bookingsRes.data.filter(b => b.status === 'Pending').length;
        const pendingAppointments = appointmentsRes.data.filter(a => a.status === 'Pending').length;
        const totalNotices = NoticesRes.data.length;

        setStats({
          totalUsers,
          totalBookings,
          totalAppointments,
          pendingBookings,
          pendingAppointments,
          totalNotices
        });
      } catch (err) {
        console.error(err);
        alert('Failed to load dashboard stats');
      }
    };

    fetchStats();
  }, [navigate]);



  return (
    <div className="dashboard-container">
      

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <h1>📊 Dashboard</h1>
          
        </div>

        <section className="stats-section">
          <div className="stat-card black">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card blue">
            <h3>Total Bookings</h3>
            <p>{stats.totalBookings}</p>
          </div>
          <div className="stat-card green">
            <h3>Total Appointments</h3>
            <p>{stats.totalAppointments}</p>
          </div>
          </section>
          <section className='stats-section'>
            <div className="stat-card black">
            <h3>Total Notices</h3>
            <p>{stats.totalNotices}</p>
          </div>
          <div className="stat-card orange">
            <h3>Pending Bookings</h3>
            <p>{stats.pendingBookings}</p>
          </div>
          <div className="stat-card red">
            <h3>Pending Appointments</h3>
            <p>{stats.pendingAppointments}</p>
          </div>
        </section>

        <section className="quick-links">
          <h2>Quick Links</h2>
          <div className="links-grid">

            <div className="link-card" onClick={() => navigate('/admin/users')}>
              <h3>Manage Users</h3>
              <p>View & Search Users</p>
            </div>
            <div className="link-card" onClick={() => navigate('/admin/bookings')}>
              <h3>Manage Bookings</h3>
              <p>View & update booking statuses</p>
            </div>
            <div className="link-card" onClick={() => navigate('/admin/appointments')}>
              <h3>Manage Appointments</h3>
              <p>View & update appointment statuses</p>
            </div>
            <div className="link-card" onClick={() => navigate('/admin/all-notices')}>
              <h3>Manage Notices</h3>
              <p>View & update Notices</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
