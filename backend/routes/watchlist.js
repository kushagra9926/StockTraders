const express = require('express');
const router = express.Router();
const Watchlist = require('../models/Watchlist');
const { protect } = require('../middleware/auth');

// @GET /api/watchlist
router.get('/', protect, async (req, res) => {
  try {
    let watchlist = await Watchlist.findOne({ user: req.user._id });
    if (!watchlist) watchlist = await Watchlist.create({ user: req.user._id, stocks: [] });
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/watchlist/add
router.post('/add', protect, async (req, res) => {
  try {
    const { symbol, name } = req.body;
    let watchlist = await Watchlist.findOne({ user: req.user._id });
    const exists = watchlist.stocks.find(s => s.symbol === symbol.toUpperCase());
    if (exists) return res.status(400).json({ message: 'Already in watchlist' });
    watchlist.stocks.push({ symbol: symbol.toUpperCase(), name });
    await watchlist.save();
    res.json({ message: 'Added to watchlist', watchlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @DELETE /api/watchlist/:symbol
router.delete('/:symbol', protect, async (req, res) => {
  try {
    let watchlist = await Watchlist.findOne({ user: req.user._id });
    watchlist.stocks = watchlist.stocks.filter(s => s.symbol !== req.params.symbol.toUpperCase());
    await watchlist.save();
    res.json({ message: 'Removed from watchlist', watchlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
