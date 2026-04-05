import { test, expect } from '@playwright/test';

test.describe('POST /api/login', () => {
  test('should return token on valid login', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();
    expect(typeof body.token).toBe('string');
  });

  test('should return 400 without password', async ({ request }) => {
    const response = await request.post('/api/login', {
      data: { email: 'eve.holt@reqres.in' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });
});

test.describe('POST /api/register', () => {
  test('should register with valid credentials', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: { email: 'eve.holt@reqres.in', password: 'pistol' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBeTruthy();
    expect(body.token).toBeTruthy();
  });

  test('should fail registration without password', async ({ request }) => {
    const response = await request.post('/api/register', {
      data: { email: 'eve.holt@reqres.in' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Missing password');
  });
});
