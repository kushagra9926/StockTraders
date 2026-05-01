# Stock Trading Platform - MERN Stack

A full-stack stock trading platform built with MongoDB, Express.js, React, and Node.js.

## Project Structure

```
stock-trading-platform/
├── frontend/       # React app for users (Buy/Sell stocks)
├── backend/        # Node.js + Express REST API
└── dashboard/      # Admin dashboard (React)
```

## Tech Stack

- **Frontend**: React, Bootstrap, Material UI, HTML/CSS/JS
- **Backend**: Node.js, Express.js, JWT Auth
- **Database**: MongoDB (Mongoose)
- **Testing**: Jest
- **Deployment**: AWS (EC2 + S3)

## GitHub Branches

| Branch | Purpose |
|---|---|
| `main` | Production-ready code |
| `dev` | Development branch |
| `feature/frontend` | Frontend features |
| `feature/backend` | Backend features |
| `feature/dashboard` | Dashboard features |
| `hotfix` | Bug fixes |

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/stock-trading-platform.git
cd stock-trading-platform
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```

### 4. Setup Dashboard
```bash
cd dashboard
npm install
npm start
```

## Environment Variables

See `backend/.env.example` for required variables.

## API Endpoints

See `backend/README.md` for full API documentation.

## Deployment (AWS)

- Backend: AWS EC2 (t2.micro)
- Frontend/Dashboard: AWS S3 + CloudFront
- Database: MongoDB Atlas

---
Made by a college student learning MERN stack 📚
