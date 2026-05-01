import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, sRes] = await Promise.all([
          axios.get('/api/portfolio'),
          axios.get('/api/stocks')
        ]);
        setPortfolio(pRes.data);
        setStocks(sRes.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const getCurrentPrice = (symbol) => {
    const stock = stocks.find(s => s.symbol === symbol);
    return stock ? stock.price : 0;
  };

  const getPnL = (holding) => {
    const currentPrice = getCurrentPrice(holding.symbol);
    const pnl = (currentPrice - holding.avgBuyPrice) * holding.quantity;
    const pnlPercent = ((currentPrice - holding.avgBuyPrice) / holding.avgBuyPrice) * 100;
    return { pnl, pnlPercent };
  };

  const totalValue = portfolio?.holdings?.reduce((sum, h) => {
    return sum + (getCurrentPrice(h.symbol) * h.quantity);
  }, 0) || 0;

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="container">
      <h2 className="page-title">💼 My Portfolio</h2>

      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="stat-card">
            <p className="text-muted mb-1">Portfolio Value</p>
            <h3 className="text-primary">${totalValue.toFixed(2)}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="stat-card">
            <p className="text-muted mb-1">Total Invested</p>
            <h3>${portfolio?.totalInvested?.toFixed(2) || '0.00'}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="stat-card">
            <p className="text-muted mb-1">Overall P&L</p>
            <h3 className={totalValue - portfolio?.totalInvested >= 0 ? 'text-success' : 'text-danger'}>
              ${(totalValue - portfolio?.totalInvested).toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      {portfolio?.holdings?.length === 0 ? (
        <div className="card card-body text-center py-5">
          <h5 className="text-muted">You have no holdings yet.</h5>
          <a href="/stocks" className="btn btn-primary mt-2">Start Trading</a>
        </div>
      ) : (
        <div className="card">
          <div className="card-body p-0">
            <table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Avg Buy</th>
                  <th>Current</th>
                  <th>Value</th>
                  <th>P&L</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map(h => {
                  const { pnl, pnlPercent } = getPnL(h);
                  const currentPrice = getCurrentPrice(h.symbol);
                  return (
                    <tr key={h.symbol}>
                      <td><strong>{h.symbol}</strong></td>
                      <td>{h.name}</td>
                      <td>{h.quantity}</td>
                      <td>${h.avgBuyPrice?.toFixed(2)}</td>
                      <td>${currentPrice?.toFixed(2)}</td>
                      <td><strong>${(currentPrice * h.quantity).toFixed(2)}</strong></td>
                      <td className={pnl >= 0 ? 'price-up' : 'price-down'}>
                        {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                        <br/>
                        <small>({pnlPercent.toFixed(2)}%)</small>
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

export default Portfolio;
