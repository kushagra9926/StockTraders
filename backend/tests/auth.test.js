// tests/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Auth Routes', () => {
  test('POST /api/auth/register - should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
  });

  test('POST /api/auth/register - should fail without required fields', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User'
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/auth/login - should fail with wrong credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'wrong@example.com',
      password: 'wrongpass'
    });
    expect(res.statusCode).toBe(400);
  });
});

describe('Stock Routes', () => {
  test('GET /api/stocks - should require authentication', async () => {
    const res = await request(app).get('/api/stocks');
    expect(res.statusCode).toBe(401);
  });
});

describe('Portfolio Routes', () => {
  test('GET /api/portfolio - should require authentication', async () => {
    const res = await request(app).get('/api/portfolio');
    expect(res.statusCode).toBe(401);
  });

  test('POST /api/portfolio/buy - should require authentication', async () => {
    const res = await request(app).post('/api/portfolio/buy').send({ symbol: 'AAPL', quantity: 1 });
    expect(res.statusCode).toBe(401);
  });
});
