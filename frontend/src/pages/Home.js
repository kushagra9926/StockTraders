import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sRes, pRes, tRes] = await Promise.all([
          axios.get('/api/stocks'),
          axios.get('/api/portfolio'),
          axios.get('/api/transactions')
        ]);
        setStocks(sRes.data.slice(0, 5));
        setPortfolio(pRes.data);
        setTransactions(tRes.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const totalPortfolioValue = portfolio?.holdings?.reduce((sum, h) => {
    const stock = stocks.find(s => s.symbol === h.symbol);
    return sum + (stock ? stock.price * h.quantity : h.avgBuyPrice * h.quantity);
  }, 0) || 0;

  return (
    <div className="container">
      <h2 className="page-title">👋 Welcome back, {user?.name}!</h2>

      {/* Stats Row */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="stat-card">
            <p className="text-muted mb-1">Cash Balance</p>
            <h3>${user?.balance?.toFixed(2)}</h3>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stat-card">
            <p className="text-muted mb-1">Portfolio Value</p>
            <h3>${totalPortfolioValue.toFixed(2)}</h3>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stat-card">
            <p className="text-muted mb-1">Total Holdings</p>
            <h3>{portfolio?.holdings?.length || 0}</h3>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="stat-card">
            <p className="text-muted mb-1">Total Trades</p>
            <h3>{transactions.length}</h3>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Top Stocks */}
        <div className="col-md-7 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>📊 Top Stocks</h5>
            <Link to="/stocks" className="btn btn-sm btn-outline-primary">View All</Link>
          </div>
          <div className="card">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map(stock => (
                    <tr key={stock.symbol}>
                      <td><strong>{stock.symbol}</strong></td>
                      <td>{stock.name}</td>
                      <td>${stock.price?.toFixed(2)}</td>
                      <td className={stock.change >= 0 ? 'price-up' : 'price-down'}>
                        {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.changePercent)?.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="col-md-5 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>🕐 Recent Trades</h5>
            <Link to="/transactions" className="btn btn-sm btn-outline-secondary">View All</Link>
          </div>
          {transactions.length === 0 ? (
            <div className="card card-body text-center text-muted">
              <p>No trades yet.</p>
              <Link to="/stocks" className="btn btn-primary">Start Trading</Link>
            </div>
          ) : (
            <div className="card">
              <ul className="list-group list-group-flush">
                {transactions.map(t => (
                  <li key={t._id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{t.symbol}</strong>
                        <span className={`badge ms-2 ${t.type === 'BUY' ? 'bg-success' : 'bg-danger'}`}>
                          {t.type}
                        </span>
                      </div>
                      <div className="text-end">
                        <div>{t.quantity} shares</div>
                        <small className="text-muted">${t.total?.toFixed(2)}</small>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
