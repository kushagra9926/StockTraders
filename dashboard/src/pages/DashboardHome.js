import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const DashboardHome = ({ token }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get('/api/admin/stats').then(res => {
      setStats(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [token]);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  // Prepare chart data from recent transactions
  const buyVsSell = [
    { name: 'BUY', count: stats?.recentTransactions?.filter(t => t.type === 'BUY').length || 0 },
    { name: 'SELL', count: stats?.recentTransactions?.filter(t => t.type === 'SELL').length || 0 }
  ];

  const symbolCounts = {};
  stats?.recentTransactions?.forEach(t => {
    symbolCounts[t.symbol] = (symbolCounts[t.symbol] || 0) + 1;
  });
  const pieData = Object.entries(symbolCounts).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <h2 className="page-header">🏠 Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="stat-card">
            <div className="icon">👥</div>
            <p className="text-muted mb-0">Total Users</p>
            <h2>{stats?.totalUsers || 0}</h2>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="stat-card">
            <div className="icon">💳</div>
            <p className="text-muted mb-0">Total Transactions</p>
            <h2>{stats?.totalTransactions || 0}</h2>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="stat-card">
            <div className="icon">📊</div>
            <p className="text-muted mb-0">Stocks Available</p>
            <h2>{stats?.totalStocks || 0}</h2>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h6 className="mb-3">Buy vs Sell (Recent)</h6>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={buyVsSell}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1a1a2e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h6 className="mb-3">Top Traded Stocks</h6>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <div className="card-header"><strong>Recent Transactions</strong></div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recentTransactions?.map(t => (
                <tr key={t._id}>
                  <td>{t.user?.name || 'N/A'}</td>
                  <td><strong>{t.symbol}</strong></td>
                  <td>
                    <span className={`badge ${t.type === 'BUY' ? 'bg-success' : 'bg-danger'}`}>{t.type}</span>
                  </td>
                  <td>{t.quantity}</td>
                  <td>${t.total?.toFixed(2)}</td>
                  <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
