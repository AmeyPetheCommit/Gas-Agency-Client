import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', mobile: '' });
  const [error, setError] = useState('');
  const [consumer, setConsumer] = useState(null);
  
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.mobile) return "All fields are required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      const res = await axios.post('https://gas-agency-server.onrender.com/api/auth/register', form);
      setConsumer(res.data.consumerNumber);
      setError('');
      Navigate("/Login");
    } catch {
      setError("Email already registered or server error.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type= "text"
          placeholder="mobile number"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
      </div>

        <button type="submit">Register</button>

        {consumer && (
          <p className="success">
            Registration successful! Your consumer number is <strong>{consumer}</strong>
          </p>
        )}

        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
}
