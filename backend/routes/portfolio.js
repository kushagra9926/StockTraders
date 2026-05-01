const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const Stock = require('../models/Stock');
const Transaction = require('../models/Transaction');
const { protect } = require('../middleware/auth');

// @GET /api/portfolio - Get user portfolio
router.get('/', protect, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne({ user: req.user._id });
    if (!portfolio) {
      portfolio = await Portfolio.create({ user: req.user._id, holdings: [] });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/portfolio/buy - Buy a stock
router.post('/buy', protect, async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Symbol and valid quantity required' });
    }

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }

    const total = stock.price * quantity;
    const user = await User.findById(req.user._id);

    if (user.balance < total) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct balance
    user.balance = parseFloat((user.balance - total).toFixed(2));
    await user.save();

    // Update portfolio
    let portfolio = await Portfolio.findOne({ user: req.user._id });
    const existingIndex = portfolio.holdings.findIndex(h => h.symbol === stock.symbol);

    if (existingIndex >= 0) {
      const existing = portfolio.holdings[existingIndex];
      const newQty = existing.quantity + quantity;
      const newAvg = ((existing.avgBuyPrice * existing.quantity) + total) / newQty;
      portfolio.holdings[existingIndex].quantity = newQty;
      portfolio.holdings[existingIndex].avgBuyPrice = parseFloat(newAvg.toFixed(2));
    } else {
      portfolio.holdings.push({
        symbol: stock.symbol,
        name: stock.name,
        quantity,
        avgBuyPrice: stock.price,
        currentPrice: stock.price
      });
    }

    portfolio.totalInvested += total;
    await portfolio.save();

    // Save transaction
    await Transaction.create({
      user: req.user._id,
      symbol: stock.symbol,
      name: stock.name,
      type: 'BUY',
      quantity,
      price: stock.price,
      total
    });

    res.json({ message: `Bought ${quantity} shares of ${symbol}`, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/portfolio/sell - Sell a stock
router.post('/sell', protect, async (req, res) => {
  try {
    const { symbol, quantity } = req.body;

    const stock = await Stock.findOne({ symbol: symbol.toUpperCase() });
    if (!stock) return res.status(404).json({ message: 'Stock not found' });

    let portfolio = await Portfolio.findOne({ user: req.user._id });
    const holdingIndex = portfolio.holdings.findIndex(h => h.symbol === stock.symbol);

    if (holdingIndex < 0 || portfolio.holdings[holdingIndex].quantity < quantity) {
      return res.status(400).json({ message: 'Not enough shares to sell' });
    }

    const total = stock.price * quantity;

    // Update holding
    portfolio.holdings[holdingIndex].quantity -= quantity;
    if (portfolio.holdings[holdingIndex].quantity === 0) {
      portfolio.holdings.splice(holdingIndex, 1);
    }
    await portfolio.save();

    // Credit balance
    const user = await User.findById(req.user._id);
    user.balance = parseFloat((user.balance + total).toFixed(2));
    await user.save();

    // Save transaction
    await Transaction.create({
      user: req.user._id,
      symbol: stock.symbol,
      name: stock.name,
      type: 'SELL',
      quantity,
      price: stock.price,
      total
    });

    res.json({ message: `Sold ${quantity} shares of ${symbol}`, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
