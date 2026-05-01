import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-brand">📈 Admin Panel</div>
      <nav>
        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
          🏠 Dashboard
        </Link>
        <Link to="/admin/users" className={location.pathname === '/admin/users' ? 'active' : ''}>
          👥 Users
        </Link>
        <Link to="/admin/transactions" className={location.pathname === '/admin/transactions' ? 'active' : ''}>
          💳 Transactions
        </Link>
      </nav>
      <div style={{ position: 'absolute', bottom: '20px', width: '240px' }}>
        <button className="logout-btn" onClick={onLogout}>🚪 Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
