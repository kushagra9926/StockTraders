const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// CORS - allow both local and production URLs
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL || 'https://stock-traders.vercel.app',
    process.env.DASHBOARD_URL || 'https://stock-traders-6qzo.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Only log in non-test environments
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/portfolio', require('./routes/portfolio'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/watchlist', require('./routes/watchlist'));
app.use('/api/admin', require('./routes/admin'));

// Health check route (useful for Render)
app.get('/', (req, res) => {
  res.json({ message: 'Stock Trading API is running!', status: 'OK' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Only connect to DB and start server when NOT in test mode
// In test mode, jest.setup.js handles the DB connection
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('MongoDB Connected!');
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = app;
