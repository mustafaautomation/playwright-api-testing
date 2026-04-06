import { test, expect } from '@playwright/test';

test.describe('GET /users', () => {
  test('should return paginated user list', async ({ request }) => {
    const response = await request.get('/users?limit=5&skip=0');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.users).toHaveLength(5);
    expect(body.total).toBeGreaterThan(0);
    expect(body.limit).toBe(5);

    // Validate user shape
    const user = body.users[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('image');
  });

  test('should return different users with skip', async ({ request }) => {
    const [r1, r2] = await Promise.all([
      request.get('/users?limit=5&skip=0'),
      request.get('/users?limit=5&skip=5'),
    ]);
    const b1 = await r1.json();
    const b2 = await r2.json();
    const ids1 = b1.users.map((u: { id: number }) => u.id);
    const ids2 = b2.users.map((u: { id: number }) => u.id);
    const overlap = ids1.filter((id: number) => ids2.includes(id));
    expect(overlap).toHaveLength(0);
  });

  test('should validate email format', async ({ request }) => {
    const response = await request.get('/users?limit=10');
    const body = await response.json();

    for (const user of body.users) {
      expect(user.email).toMatch(/@/);
    }
  });

  test('should have correct response headers', async ({ request }) => {
    const response = await request.get('/users');
    expect(response.headers()['content-type']).toContain('application/json');
  });

  test('should sort users by firstName', async ({ request }) => {
    const response = await request.get('/users?sortBy=firstName&order=asc&limit=5');
    expect(response.status()).toBe(200);
    const body = await response.json();
    const names = body.users.map((u: { firstName: string }) => u.firstName);
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('should search users by query', async ({ request }) => {
    const response = await request.get('/users/search?q=John');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.users).toBeDefined();
    expect(body.total).toBeGreaterThanOrEqual(0);
  });
});
