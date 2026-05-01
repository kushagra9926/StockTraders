import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllTransactions = ({ token }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Admin gets all recent transactions from stats endpoint
    axios.get('/api/admin/stats').then(res => {
      setTransactions(res.data.recentTransactions || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [token]);

  const filtered = filter === 'ALL' ? transactions : transactions.filter(t => t.type === filter);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  return (
    <div>
      <h2 className="page-header">💳 All Transactions</h2>

      <div className="mb-3">
        <div className="btn-group">
          {['ALL', 'BUY', 'SELL'].map(f => (
            <button
              key={f}
              className={`btn ${filter === f ? 'btn-dark' : 'btn-outline-dark'}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Symbol</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center text-muted py-4">No transactions found.</td></tr>
              ) : filtered.map(t => (
                <tr key={t._id}>
                  <td>{t.user?.name || 'N/A'}</td>
                  <td>{t.user?.email || '-'}</td>
                  <td><strong>{t.symbol}</strong></td>
                  <td>
                    <span className={`badge ${t.type === 'BUY' ? 'bg-success' : 'bg-danger'}`}>{t.type}</span>
                  </td>
                  <td>{t.quantity}</td>
                  <td>${t.price?.toFixed(2)}</td>
                  <td><strong>${t.total?.toFixed(2)}</strong></td>
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

export default AllTransactions;
