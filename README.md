# 📈 Stock Trading Platform — MERN Stack

A full-stack virtual stock trading platform built with MongoDB, Express.js, React, and Node.js.
Users get **$10,000 virtual money** to practice buying and selling stocks.

---

## 🚀 Live Demo

| App | URL |
|---|---|
| 🖥️ Frontend (User App) | https://stock-trading-frontend.vercel.app |
| 📊 Admin Dashboard | https://stock-trading-dashboard.vercel.app |
| 🔧 Backend API | https://stock-trading-backend.onrender.com |

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

### 1. Login Page
> Users login with email and password. JWT token is stored in localStorage.

```
┌─────────────────────────────────────────────────┐
│  ● ● ●   localhost:3000/login                   │
├─────────────────────────────────────────────────┤
│                                                  │
│              📈 StockTrader                      │
│           Login to your account                  │
│                                                  │
│   Email    [________________________]            │
│   Password [________________________]            │
│                                                  │
│            [       Login       ]                 │
│                                                  │
│      Don't have an account? Register here        │
└─────────────────────────────────────────────────┘
```

---

### 2. Register Page
> New users register and receive $10,000 virtual money to start trading.

```
┌─────────────────────────────────────────────────┐
│  ● ● ●   localhost:3000/register                │
├─────────────────────────────────────────────────┤
│              📈 StockTrader                      │
│             Create Account                       │
│  🎁 Start with $10,000 virtual money!           │
│                                                  │
│   Name     [________________________]            │
│   Email    [________________________]            │
│   Password [________________________]            │
│                                                  │
│          [     Create Account     ]              │
└─────────────────────────────────────────────────┘
```

---

### 3. Home Dashboard
> Overview of balance, portfolio value, holdings count, trade count, top stocks and recent trades.

```
┌─────────────────────────────────────────────────────────────┐
│  ● ● ●   localhost:3000/                                    │
├─────────────────────────────────────────────────────────────┤
│ 📈 StockTrader  Home  Stocks  Portfolio  Watchlist   💰$8,452│
├─────────────────────────────────────────────────────────────┤
│  👋 Welcome back, Kushagra!                                  │
│                                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │Cash Bal. │ │Portfolio │ │Holdings  │ │Trades    │       │
│  │ $8,452   │ │ $3,210   │ │    4     │ │   12     │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
│                                                              │
│  📊 Top Stocks          🕐 Recent Trades                     │
│  AAPL  $182.50  ▲1.39%  AAPL  BUY   5 shares  $912.50      │
│  NVDA  $875.00  ▲1.74%  TSLA  SELL  2 shares  $496.00      │
│  TSLA  $248.00  ▼2.75%  NVDA  BUY   1 share   $875.00      │
└─────────────────────────────────────────────────────────────┘
```

---

### 4. Stock Market Page
> Lists all available stocks with live price simulation. Search by symbol or name.

```
┌─────────────────────────────────────────────────────────────────┐
│  ● ● ●   localhost:3000/stocks                                  │
├─────────────────────────────────────────────────────────────────┤
│ 📈 StockTrader  Home  [Stocks]  Portfolio     💰 $8,452.30      │
├─────────────────────────────────────────────────────────────────┤
│  📊 Stock Market                                                 │
│  [🔍 Search stocks by symbol or name...]  Balance: $8,452.30   │
│                                                                  │
│  Symbol  Name              Price    Change   %Change  Actions  │
│  ─────────────────────────────────────────────────────────────  │
│  AAPL    Apple Inc.        $182.50  +2.50   ▲ 1.39%  Buy Sell │
│  NVDA    NVIDIA Corp.      $875.00  +15.00  ▲ 1.74%  Buy Sell │
│  TSLA    Tesla Inc.        $248.00  -7.00   ▼ 2.75%  Buy Sell │
│  MSFT    Microsoft Corp.   $375.00  +5.00   ▲ 1.35%  Buy Sell │
│  GOOGL   Alphabet Inc.     $138.20  -1.80   ▼ 1.29%  Buy Sell │
│  META    Meta Platforms    $490.00  +5.00   ▲ 1.03%  Buy Sell │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5. Buy / Sell Modal
> Clicking Buy or Sell opens a modal showing price, balance, quantity input and total cost.

```
┌─────────────────────────────────────┐
│   🟢 Buy AAPL                   ✕  │
├─────────────────────────────────────┤
│   Apple Inc.                        │
│   Current Price:   $182.50          │
│   Your Balance:    $8,452.30        │
│                                     │
│   Quantity:  [ 5 ]                  │
│                                     │
│   ┌─────────────────────────────┐   │
│   │  Total: $912.50             │   │
│   └─────────────────────────────┘   │
│                                     │
│       [Cancel]   [Confirm BUY]      │
└─────────────────────────────────────┘
```

---

### 6. Portfolio Page
> Shows all current holdings with quantity, average buy price, current price, total value and P&L.

```
┌─────────────────────────────────────────────────────────────────────┐
│  ● ● ●   localhost:3000/portfolio                                   │
├─────────────────────────────────────────────────────────────────────┤
│  💼 My Portfolio                                                     │
│                                                                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                │
│  │Portfolio Val.│ │Total Invested│ │Overall P&L   │                │
│  │   $3,210     │ │   $2,980     │ │   +$230 ✅   │                │
│  └──────────────┘ └──────────────┘ └──────────────┘                │
│                                                                      │
│  Symbol  Name            Qty  Avg Buy   Current    Value    P&L    │
│  ──────────────────────────────────────────────────────────────────  │
│  AAPL    Apple Inc.       5   $179.00   $182.50   $912.50  +$17.50 │
│  NVDA    NVIDIA Corp.     1   $860.00   $875.00   $875.00  +$15.00 │
│  META    Meta Platforms   2   $495.00   $490.00   $980.00  -$10.00 │
│  JPM     JPMorgan Chase   3   $192.00   $195.00   $585.00   +$9.00 │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 7. Transaction History
> Complete history of all buy and sell trades with date, price and total amount.

```
┌──────────────────────────────────────────────────────────────────┐
│  ● ● ●   localhost:3000/transactions                             │
├──────────────────────────────────────────────────────────────────┤
│  📋 Transaction History                                           │
│                                                                   │
│  Date        Symbol  Name           Type   Qty  Price    Total  │
│  ─────────────────────────────────────────────────────────────  │
│  01/05/2026  NVDA    NVIDIA Corp.   BUY     1   $875.00  $875   │
│  30/04/2026  TSLA    Tesla Inc.     SELL    2   $255.00  $510   │
│  29/04/2026  AAPL    Apple Inc.     BUY     5   $179.00  $895   │
│  28/04/2026  META    Meta Platforms BUY     2   $495.00  $990   │
│  27/04/2026  JPM     JPMorgan Chase BUY     3   $192.00  $576   │
└──────────────────────────────────────────────────────────────────┘
```

---

### 8. Watchlist
> Users can save stocks to their watchlist to monitor prices without buying.

```
┌──────────────────────────────────────────────────┐
│  ● ● ●   localhost:3000/watchlist                │
├──────────────────────────────────────────────────┤
│  ⭐ Watchlist                                     │
│                                                   │
│  [Enter stock symbol...]  [Add to Watchlist]     │
│                                                   │
│  Symbol  Name              Price    Change       │
│  ──────────────────────────────────────────────  │
│  AMZN    Amazon.com Inc.   $178.50  ▲ 2.00%     │
│  NFLX    Netflix Inc.      $625.00  ▲ 0.81%     │
│  DIS     Walt Disney Co.   $112.00  ▲ 1.82%     │
└──────────────────────────────────────────────────┘
```

---

### 9. Admin Dashboard (port 3001)
> Admin panel showing total users, transactions, stocks. Bar chart for buy vs sell activity.

```
┌────────────────────────────────────────────────────┐
│  ● ● ●   localhost:3001/admin                      │
├───────────────┬────────────────────────────────────┤
│ 📈 Admin Panel│  🏠 Dashboard Overview             │
│               │                                    │
│ [🏠 Dashboard]│  ┌──────┐  ┌──────┐  ┌──────┐    │
│ [👥 Users    ]│  │Users │  │Trans.│  │Stocks│    │
│ [💳 Trans.   ]│  │  24  │  │ 186  │  │  10  │    │
│               │  └──────┘  └──────┘  └──────┘    │
│               │                                    │
│               │  Buy vs Sell   Top Traded Stocks  │
│               │  ████ BUY(7)   ██ AAPL (4)        │
│               │  ██   SELL(3)  ██ NVDA (3)        │
└───────────────┴────────────────────────────────────┘
```

---

### 10. Admin Users Management
> Admin can view all users, enable/disable accounts, and delete non-admin users.

```
┌────────────────────────────────────────────────────────────┐
│  ● ● ●   localhost:3001/admin/users                        │
├───────────────┬────────────────────────────────────────────┤
│ 📈 Admin Panel│  👥 Manage Users                           │
│               │  [🔍 Search by name or email...]           │
│ [🏠 Dashboard]│                                            │
│ [👥 Users  ◄ ]│  # Name      Email      Balance  Status   │
│ [💳 Trans.   ]│  ─────────────────────────────────────────│
│               │  1 Kushagra  k@mail.com  $8,452   Active  │
│               │  2 Rahul     r@mail.com  $6,200   Active  │
│               │  3 Priya     p@mail.com  $3,100  Inactive │
└───────────────┴────────────────────────────────────────────┘
```

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
- ✅ Charts showing trade activity
- ✅ Responsive design (Bootstrap)
- ✅ Protected routes (frontend + backend)

---

Made with ❤️ as a college MERN stack project
