import { test, expect } from '@playwright/test';

test.describe('POST /auth/login', () => {
  test('should return token on valid login', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { username: 'emilys', password: 'emilyspass' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.accessToken).toBeTruthy();
    expect(body.refreshToken).toBeTruthy();
    expect(body.username).toBe('emilys');
  });

  test('should return 400 for invalid password', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { username: 'emilys', password: 'wrongpassword' },
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  test('should return 400 for non-existent user', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: { username: 'nonexistent_user_xyz', password: 'test' },
    });

    expect(response.status()).toBe(400);
  });

  test('should return 400 for empty body', async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: {},
    });

    expect(response.status()).toBe(400);
  });
});
