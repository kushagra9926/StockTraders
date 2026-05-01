import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Stocks = () => {
  const { user, setUser } = useAuth();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [tradeType, setTradeType] = useState('BUY');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchStocks = async () => {
    try {
      const res = await axios.get('/api/stocks');
      setStocks(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStocks();
    const interval = setInterval(fetchStocks, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleTrade = async () => {
    setMessage(''); setError('');
    try {
      const endpoint = tradeType === 'BUY' ? '/api/portfolio/buy' : '/api/portfolio/sell';
      const res = await axios.post(endpoint, { symbol: selectedStock.symbol, quantity: parseInt(quantity) });
      setMessage(res.data.message);
      // Update user balance
      setUser(prev => ({ ...prev, balance: res.data.balance }));
      setSelectedStock(null);
      fetchStocks();
    } catch (err) {
      setError(err.response?.data?.message || 'Trade failed');
    }
  };

  const filtered = stocks.filter(s =>
    s.symbol.includes(search.toUpperCase()) || s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="page-title">📊 Stock Market</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search stocks by symbol or name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <span className="text-muted">Balance: </span>
          <strong className="text-primary">${user?.balance?.toFixed(2)}</strong>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>% Change</th>
                  <th>Volume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(stock => (
                  <tr key={stock.symbol}>
                    <td><strong>{stock.symbol}</strong></td>
                    <td>{stock.name}</td>
                    <td><strong>${stock.price?.toFixed(2)}</strong></td>
                    <td className={stock.change >= 0 ? 'price-up' : 'price-down'}>
                      {stock.change >= 0 ? '+' : ''}{stock.change?.toFixed(2)}
                    </td>
                    <td className={stock.changePercent >= 0 ? 'price-up' : 'price-down'}>
                      {stock.changePercent >= 0 ? '▲' : '▼'} {Math.abs(stock.changePercent)?.toFixed(2)}%
                    </td>
                    <td>{(stock.volume / 1000000).toFixed(1)}M</td>
                    <td>
                      <button
                        className="btn btn-sm btn-success me-1"
                        onClick={() => { setSelectedStock(stock); setTradeType('BUY'); setMessage(''); setError(''); }}
                        data-bs-toggle="modal" data-bs-target="#tradeModal"
                      >Buy</button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => { setSelectedStock(stock); setTradeType('SELL'); setMessage(''); setError(''); }}
                        data-bs-toggle="modal" data-bs-target="#tradeModal"
                      >Sell</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Trade Modal */}
      <div className="modal fade" id="tradeModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {tradeType === 'BUY' ? '🟢 Buy' : '🔴 Sell'} {selectedStock?.symbol}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {selectedStock && (
                <>
                  <p><strong>{selectedStock.name}</strong></p>
                  <p>Current Price: <strong>${selectedStock.price?.toFixed(2)}</strong></p>
                  <p>Your Balance: <strong>${user?.balance?.toFixed(2)}</strong></p>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      min="1"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="alert alert-secondary">
                    <strong>Total: ${(selectedStock.price * quantity).toFixed(2)}</strong>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button
                className={`btn ${tradeType === 'BUY' ? 'btn-success' : 'btn-danger'}`}
                onClick={handleTrade}
                data-bs-dismiss="modal"
              >
                Confirm {tradeType}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
