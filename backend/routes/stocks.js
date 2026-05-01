const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');
const { protect } = require('../middleware/auth');

// Seed some demo stocks if none exist
const seedStocks = async () => {
  const count = await Stock.countDocuments();
  if (count === 0) {
    await Stock.insertMany([
      { symbol: 'AAPL', name: 'Apple Inc.', price: 182.5, previousClose: 180.0, change: 2.5, changePercent: 1.39, volume: 54000000, marketCap: 2850000000000, sector: 'Technology' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.2, previousClose: 140.0, change: -1.8, changePercent: -1.29, volume: 22000000, marketCap: 1750000000000, sector: 'Technology' },
      { symbol: 'MSFT', name: 'Microsoft Corp.', price: 375.0, previousClose: 370.0, change: 5.0, changePercent: 1.35, volume: 28000000, marketCap: 2780000000000, sector: 'Technology' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.5, previousClose: 175.0, change: 3.5, changePercent: 2.0, volume: 35000000, marketCap: 1840000000000, sector: 'Consumer' },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.0, previousClose: 255.0, change: -7.0, changePercent: -2.75, volume: 100000000, marketCap: 790000000000, sector: 'Automotive' },
      { symbol: 'META', name: 'Meta Platforms', price: 490.0, previousClose: 485.0, change: 5.0, changePercent: 1.03, volume: 18000000, marketCap: 1250000000000, sector: 'Technology' },
      { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.0, previousClose: 860.0, change: 15.0, changePercent: 1.74, volume: 45000000, marketCap: 2150000000000, sector: 'Technology' },
      { symbol: 'NFLX', name: 'Netflix Inc.', price: 625.0, previousClose: 620.0, change: 5.0, changePercent: 0.81, volume: 7000000, marketCap: 273000000000, sector: 'Entertainment' },
      { symbol: 'JPM', name: 'JPMorgan Chase', price: 195.0, previousClose: 192.0, change: 3.0, changePercent: 1.56, volume: 12000000, marketCap: 565000000000, sector: 'Finance' },
      { symbol: 'DIS', name: 'Walt Disney Co.', price: 112.0, previousClose: 110.0, change: 2.0, changePercent: 1.82, volume: 9000000, marketCap: 205000000000, sector: 'Entertainment' }
    ]);
    console.log('Demo stocks seeded!');
  }
};
seedStocks();

// @GET /api/stocks - Get all stocks
router.get('/', protect, async (req, res) => {
  try {
    // Simulate live price fluctuation
    const stocks = await Stock.find();
    stocks.forEach(async (stock) => {
      const fluctuation = (Math.random() - 0.5) * 2; // -1 to +1
      stock.price = parseFloat((stock.price + fluctuation).toFixed(2));
      stock.change = parseFloat((stock.price - stock.previousClose).toFixed(2));
      stock.changePercent = parseFloat(((stock.change / stock.previousClose) * 100).toFixed(2));
      await stock.save();
    });

    const updatedStocks = await Stock.find();
    res.json(updatedStocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/stocks/:symbol - Get single stock
router.get('/:symbol', protect, async (req, res) => {
  try {
    const stock = await Stock.findOne({ symbol: req.params.symbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
