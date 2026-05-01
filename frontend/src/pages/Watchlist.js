import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState({ stocks: [] });
  const [stocks, setStocks] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const [wRes, sRes] = await Promise.all([
        axios.get('/api/watchlist'),
        axios.get('/api/stocks')
      ]);
      setWatchlist(wRes.data);
      setStocks(sRes.data);
    };
    fetch();
  }, []);

  const getStockInfo = (sym) => stocks.find(s => s.symbol === sym);

  const handleAdd = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    const stock = getStockInfo(symbol.toUpperCase());
    if (!stock) return setError('Stock not found');
    try {
      const res = await axios.post('/api/watchlist/add', { symbol: stock.symbol, name: stock.name });
      setWatchlist(res.data.watchlist);
      setMessage('Added to watchlist!');
      setSymbol('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  const handleRemove = async (sym) => {
    try {
      const res = await axios.delete(`/api/watchlist/${sym}`);
      setWatchlist(res.data.watchlist);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2 className="page-title">⭐ Watchlist</h2>

      <div className="card mb-4">
        <div className="card-body">
          <form className="row g-2" onSubmit={handleAdd}>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Enter stock symbol (e.g. AAPL)"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">Add to Watchlist</button>
            </div>
          </form>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
          {message && <div className="alert alert-success mt-2">{message}</div>}
        </div>
      </div>

      {watchlist.stocks?.length === 0 ? (
        <div className="card card-body text-center text-muted py-5">
          No stocks in watchlist. Add some above!
        </div>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.stocks.map(w => {
                  const info = getStockInfo(w.symbol);
                  return (
                    <tr key={w.symbol}>
                      <td><strong>{w.symbol}</strong></td>
                      <td>{w.name}</td>
                      <td>{info ? `$${info.price?.toFixed(2)}` : '-'}</td>
                      <td className={info?.change >= 0 ? 'price-up' : 'price-down'}>
                        {info ? `${info.changePercent?.toFixed(2)}%` : '-'}
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleRemove(w.symbol)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
