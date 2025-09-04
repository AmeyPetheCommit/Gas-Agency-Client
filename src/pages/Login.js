import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!form.email || !form.password) return "All fields are required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Invalid email format.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const validationError = validate();
  if (validationError) return setError(validationError);

  try {
    const res = await axios.post('https://gas-agency-server.onrender.com/api/auth/login', form);
    localStorage.setItem('token', res.data.token);

    alert('Login successful!');
    if (res.data.isAdmin) {
      navigate('/admin');
      localStorage.setItem('isAdmin', res.data.isAdmin);
    } else {
      navigate('/');
    }

  } catch {
    setError('Invalid credentials or server error.');
  }
};


  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}

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

        <button type="submit">Login</button>
        <p>Don't have an account? <Link to={"/register"}>create one </Link> </p>
      </form>
    </div>
  );
}
