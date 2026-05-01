const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
  symbol: { type: String, required: true, uppercase: true },
  name: { type: String },
  quantity: { type: Number, required: true, min: 0 },
  avgBuyPrice: { type: Number, required: true },
  currentPrice: { type: Number, default: 0 }
});

const portfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  holdings: [portfolioItemSchema],
  totalInvested: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
