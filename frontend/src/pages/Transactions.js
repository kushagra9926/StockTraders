import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/transactions').then(res => {
      setTransactions(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container">
      <h2 className="page-title">📋 Transaction History</h2>
      {transactions.length === 0 ? (
        <div className="card card-body text-center text-muted py-5">No transactions yet.</div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t._id}>
                    <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td><strong>{t.symbol}</strong></td>
                    <td>{t.name}</td>
                    <td>
                      <span className={`badge ${t.type === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                        {t.type}
                      </span>
                    </td>
                    <td>{t.quantity}</td>
                    <td>${t.price?.toFixed(2)}</td>
                    <td><strong>${t.total?.toFixed(2)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
