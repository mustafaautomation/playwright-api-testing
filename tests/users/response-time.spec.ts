import { test, expect } from '@playwright/test';

test.describe('API Performance', () => {
  test('GET /api/users should respond within 2 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await request.get('/api/users');
    const duration = Date.now() - start;

    expect(response.status()).toBe(200);
    expect(duration).toBeLessThan(2000);
  });

  test('POST /api/users should respond within 2 seconds', async ({ request }) => {
    const start = Date.now();
    const response = await request.post('/api/users', {
      data: { name: 'Perf Test', job: 'Tester' },
    });
    const duration = Date.now() - start;

    expect(response.status()).toBe(201);
    expect(duration).toBeLessThan(2000);
  });
});
