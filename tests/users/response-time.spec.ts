import { test, expect } from '@playwright/test';

test.describe('API Performance', () => {
  test('GET /users should respond within 2 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('/users');
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(2000);
  });

  test('GET /users/:id should respond within 2 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('/users/1');
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(2000);
  });

  test('POST /users/add should respond within 2 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await request.post('/users/add', {
      data: { firstName: 'Perf', lastName: 'Test' },
    });
    const duration = Date.now() - start;

    expect(response.status()).toBe(201);
    expect(duration).toBeLessThan(2000);
  });

  test('GET /products should respond within 2 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('/products?limit=5');
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(2000);
  });

  test('POST /auth/login should respond within 2 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await request.post('/auth/login', {
      data: { username: 'emilys', password: 'emilyspass' },
    });
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(2000);
  });
});
