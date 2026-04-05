import { test, expect } from '@playwright/test';

test.describe('GET /api/users', () => {
  test('should return paginated user list', async ({ request }) => {
    const response = await request.get('/api/users?page=1');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.page).toBe(1);
    expect(body.data).toHaveLength(6);
    expect(body.total).toBeGreaterThan(0);

    // Validate user shape
    const user = body.data[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('avatar');
  });

  test('should return second page', async ({ request }) => {
    const response = await request.get('/api/users?page=2');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.page).toBe(2);
    expect(body.data.length).toBeGreaterThan(0);
  });

  test('should validate email format', async ({ request }) => {
    const response = await request.get('/api/users?page=1');
    const body = await response.json();

    for (const user of body.data) {
      expect(user.email).toMatch(/^[^@]+@[^@]+\.[^@]+$/);
    }
  });

  test('should have correct response headers', async ({ request }) => {
    const response = await request.get('/api/users');
    expect(response.headers()['content-type']).toContain('application/json');
  });
});
