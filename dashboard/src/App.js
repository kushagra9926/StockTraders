import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import DashboardHome from './pages/DashboardHome';
import Users from './pages/Users';
import AllTransactions from './pages/AllTransactions';
import Sidebar from './components/Sidebar';
import './Dashboard.css';

const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));

  const handleLogin = (tok) => {
    localStorage.setItem('adminToken', tok);
    setToken(tok);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route path="/*" element={
          <PrivateRoute token={token}>
            <div className="dashboard-layout">
              <Sidebar onLogout={handleLogout} />
              <div className="dashboard-content">
                <Routes>
                  <Route path="/admin" element={<DashboardHome token={token} />} />
                  <Route path="/admin/users" element={<Users token={token} />} />
                  <Route path="/admin/transactions" element={<AllTransactions token={token} />} />
                  <Route path="/" element={<Navigate to="/admin" />} />
                </Routes>
              </div>
            </div>
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
