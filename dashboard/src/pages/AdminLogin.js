import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Use Render backend URL in production, localhost in development
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.user.role !== 'admin') {
        return setError('Admin access only');
      }
      onLogin(res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <div className="card p-4" style={{ width: '380px' }}>
        <h3 className="text-center mb-4">📈 Admin Login</h3>
        <p className="text-center text-muted">Stock Trader Admin Panel</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-dark w-100">Login as Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
