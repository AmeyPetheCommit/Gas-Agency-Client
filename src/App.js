import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookingHistory from './pages/BookingHistory';
import Notices from './pages/Notices';
import AppointmentBooking from './pages/AppointmentBooking';
import MyAppointments from './pages/MyAppoinments';
import Booking from './pages/Booking';
import Order from './pages/Order';
import PaymentSuccess from './pages/PaymentSuccess';
import Receipt from './pages/Receipt';

import AdminApp from './admin/AdminApp';

// import AdminDashboard from './pages/admin/AdminDashboard';
// import ViewAllBookings from './pages/admin/Bookings';
// import ViewAllAppointments from './pages/admin/Appointments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<BookingHistory />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/appoinment" element={<AppointmentBooking />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path='/book' element={<Booking/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/payment-success' element={<PaymentSuccess/>}/>
        <Route path="/receipt" element={<Receipt />} />

        <Route path="/admin/*" element={<AdminApp />} />
        {/* <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/bookings" element={<ViewAllBookings/>}/>
        <Route path="/admin/appointments" element={<ViewAllAppointments/>}/> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
