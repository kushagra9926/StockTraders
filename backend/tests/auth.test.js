const request = require('supertest');
const app = require('../server');

// ─── AUTH ROUTES ─────────────────────────────────────────────────────────────

describe('POST /api/auth/register', () => {
  test('should register a new user successfully', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
    expect(res.body.user.balance).toBe(10000);
  });

  test('should fail when email is missing', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      password: 'password123'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('should fail with duplicate email', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'First User',
      email: 'duplicate@example.com',
      password: 'password123'
    });
    const res = await request(app).post('/api/auth/register').send({
      name: 'Second User',
      email: 'duplicate@example.com',
      password: 'password456'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/already registered/i);
  });
});

describe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Login User',
      email: 'login@example.com',
      password: 'password123'
    });
  });

  test('should login successfully with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  test('should fail with wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'wrongpassword'
    });
    expect(res.statusCode).toBe(400);
  });

  test('should fail with non-existent email', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nobody@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /api/auth/me', () => {
  test('should return user data with valid token', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      name: 'Me User', email: 'me@example.com', password: 'password123'
    });
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${reg.body.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('me@example.com');
  });

  test('should fail without token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toBe(401);
  });

  test('should fail with invalid token', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer invalidtoken123');
    expect(res.statusCode).toBe(401);
  });
});

// ─── STOCK ROUTES ─────────────────────────────────────────────────────────────

describe('Stock Routes', () => {
  test('GET /api/stocks - should require authentication', async () => {
    const res = await request(app).get('/api/stocks');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/stocks - should return array when authenticated', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      name: 'Stock User', email: 'stocks@example.com', password: 'password123'
    });
    const res = await request(app)
      .get('/api/stocks')
      .set('Authorization', `Bearer ${reg.body.token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /api/stocks/:symbol - should require authentication', async () => {
    const res = await request(app).get('/api/stocks/AAPL');
    expect(res.statusCode).toBe(401);
  });
});

// ─── PORTFOLIO ROUTES ─────────────────────────────────────────────────────────

describe('Portfolio Routes', () => {
  test('GET /api/portfolio - should require authentication', async () => {
    const res = await request(app).get('/api/portfolio');
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/portfolio/buy - should require authentication', async () => {
    const res = await request(app).post('/api/portfolio/buy').send({ symbol: 'AAPL', quantity: 1 });
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/portfolio/sell - should require authentication', async () => {
    const res = await request(app).post('/api/portfolio/sell').send({ symbol: 'AAPL', quantity: 1 });
    expect(res.statusCode).toBe(401);
  });

  test('should return empty portfolio for new user', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      name: 'Port User', email: 'portfolio@example.com', password: 'password123'
    });
    const res = await request(app)
      .get('/api/portfolio')
      .set('Authorization', `Bearer ${reg.body.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.holdings).toHaveLength(0);
  });
});

// ─── TRANSACTION ROUTES ───────────────────────────────────────────────────────

describe('Transaction Routes', () => {
  test('GET /api/transactions - should require authentication', async () => {
    const res = await request(app).get('/api/transactions');
    expect(res.statusCode).toBe(401);
  });

  test('should return empty array for new user', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      name: 'Trans User', email: 'trans@example.com', password: 'password123'
    });
    const res = await request(app)
      .get('/api/transactions')
      .set('Authorization', `Bearer ${reg.body.token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toHaveLength(0);
  });
});

// ─── WATCHLIST ROUTES ─────────────────────────────────────────────────────────

describe('Watchlist Routes', () => {
  test('GET /api/watchlist - should require authentication', async () => {
    const res = await request(app).get('/api/watchlist');
    expect(res.statusCode).toBe(401);
  });

  test('should return empty watchlist for new user', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      name: 'Watch User', email: 'watch@example.com', password: 'password123'
    });
    const res = await request(app)
      .get('/api/watchlist')
      .set('Authorization', `Bearer ${reg.body.token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.stocks).toHaveLength(0);
  });
});

// ─── ADMIN ROUTES ─────────────────────────────────────────────────────────────

describe('Admin Routes', () => {
  test('GET /api/admin/users - should require authentication', async () => {
    const res = await request(app).get('/api/admin/users');
    expect(res.statusCode).toBe(401);
  });

  test('GET /api/admin/users - should deny non-admin users', async () => {
    const reg = await request(app).post('/api/auth/register').send({
      name: 'Normal User', email: 'normal@example.com', password: 'password123'
    });
    const res = await request(app)
      .get('/api/admin/users')
      .set('Authorization', `Bearer ${reg.body.token}`);
    expect(res.statusCode).toBe(403);
  });

  test('GET /api/admin/stats - should require authentication', async () => {
    const res = await request(app).get('/api/admin/stats');
    expect(res.statusCode).toBe(401);
  });
});
