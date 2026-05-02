# 📈 Stock Trading Platform — MERN Stack

A full-stack virtual stock trading platform built with MongoDB, Express.js, React, and Node.js.
Users get **$10,000 virtual money** to practice buying and selling stocks.

---

## 🚀 Live Demo

| App | URL |
|---|---|
| 🖥️ Frontend (User App) | https://stock-traders.vercel.app |
| 📊 Admin Dashboard | https://stock-traders-6qzo.vercel.app |
| 🔧 Backend API | https://stocktraders-ghrw.onrender.com |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Bootstrap 5, Material UI |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas) |
| Auth | JWT (JSON Web Tokens) |
| Testing | Jest + Supertest |
| Deployment | Render (backend) + Vercel (frontend) |

---

## 📸 Screenshots

### 1. User Login
> Users login with email and password. JWT token is stored securely.

![User Login](Screenshots/User_login.png)

---

### 2. User Registration
> New users register and receive **$10,000 virtual money** to start trading.

![User Register](Screenshots/User_register.png)

---

### 3. Home Dashboard
> Overview of cash balance, portfolio value, total holdings, total trades, top stocks and recent trades.

![User Dashboard](Screenshots/User_dashboard.png)

---

### 4. Stock Market Page
> Lists all 10 available stocks with live simulated price changes. Search by symbol or name. Buy or Sell from the table directly.

![Stock Market](Screenshots/User_stockspage.png)

---

### 5. Buy Stock Modal
> Clicking **Buy** opens a modal showing current price, your balance, quantity input, and total cost.

![Buy Stock](Screenshots/User_buy.png)

---

### 6. Sell Stock Modal
> Clicking **Sell** opens a modal confirming the quantity and total payout before executing.

![Sell Stock](Screenshots/User_sell.png)

---

### 7. Portfolio Page
> Shows all current holdings with quantity, average buy price, current price, total value and P&L per stock.

![Portfolio](Screenshots/User_portfolio.png)

---

### 8. Transaction History
> Complete history of all buy and sell trades with date, symbol, price and total amount.

![Transactions](Screenshots/User_transactions.png)

---

### 9. Watchlist
> Users can save stocks to their watchlist to monitor live prices without buying.

![Watchlist](Screenshots/User_watchlist.png)

---

### 10. Admin Login
> Separate admin login page for the dashboard panel (runs on port 3001).

![Admin Login](Screenshots/Admin_login.png)

---

### 11. Admin Dashboard Overview
> Admin panel showing total users, transactions, and available stocks. Includes a Buy vs Sell bar chart and Top Traded Stocks pie chart with recent transactions table.

![Admin Dashboard](Screenshots/Admin_dashboard.png)

---

### 12. Admin — Manage Users
> Admin can view all users with balance, role, status and join date. Can disable/enable accounts.

![Admin Users](Screenshots/Admin_users_section.png)

---

### 13. Admin — All Transactions
> Admin can view all platform transactions filtered by ALL / BUY / SELL with full user and trade details.

![Admin Transactions](Screenshots/Admin_transaction_section.png)

---

## 📁 Project Structure

```
stock-trading-platform/
├── backend/
│   ├── models/          # User, Stock, Portfolio, Transaction, Watchlist
│   ├── routes/          # auth, stocks, portfolio, transactions, watchlist, admin
│   ├── middleware/      # JWT auth + admin guard
│   ├── tests/           # Jest test suite
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── pages/       # Login, Register, Home, Stocks, Portfolio, Transactions, Watchlist
│       ├── components/  # Navbar
│       └── context/     # AuthContext (JWT)
│
└── dashboard/
    └── src/
        ├── pages/       # AdminLogin, DashboardHome, Users, AllTransactions
        └── components/  # Sidebar
```

---

## ⚙️ Local Setup

```bash
# 1. Backend (Terminal 1)
cd backend
npm install
cp .env.example .env    # fill in MONGO_URI and JWT_SECRET
npm run dev             # runs on http://localhost:5000

# 2. Frontend (Terminal 2)
cd frontend
npm install
npm start               # runs on http://localhost:3000

# 3. Dashboard (Terminal 3)
cd dashboard
npm install
npm start               # runs on http://localhost:3001 (press Y when asked)
```

### .env file

```
PORT=5000
MONGO_URI=mongodb+srv://youruser:yourpass@cluster0.mongodb.net/stocktrading
JWT_SECRET=mysecretkey123
JWT_EXPIRE=7d
NODE_ENV=development
```

---

## 🌿 GitHub Branches

| Branch | Purpose |
|---|---|
| `main` | Production code |
| `dev` | Active development |
| `feature/frontend` | Frontend features |
| `feature/backend` | Backend features |
| `feature/dashboard` | Dashboard features |
| `hotfix` | Bug fixes |

```bash
bash setup-git-branches.sh   # auto-creates all branches
```

---

## ☁️ Deployment

| Service | Platform | Cost |
|---|---|---|
| Backend API | Render (free tier) | $0 |
| Frontend | Vercel (free tier) | $0 |
| Admin Dashboard | Vercel (free tier) | $0 |
| Database | MongoDB Atlas (free tier) | $0 |

See `RENDER_VERCEL_DEPLOYMENT.md` for full deployment steps.

---

## 🧪 Testing

```bash
cd backend
npm test
```

Tests cover: user registration, login, auth protection, portfolio routes.

---

## ✨ Features

- ✅ User registration & login (JWT auth)
- ✅ $10,000 virtual starting balance
- ✅ Browse 10 live stocks with simulated price changes
- ✅ Buy and sell stocks with modal confirmation
- ✅ Portfolio tracking with P&L calculation
- ✅ Full transaction history
- ✅ Watchlist to monitor stocks
- ✅ Admin panel with user management
- ✅ Admin transaction monitoring with BUY/SELL filter
- ✅ Charts showing trade activity (Buy vs Sell, Top Traded Stocks)
- ✅ Responsive design (Bootstrap)
- ✅ Protected routes (frontend + backend)

---
