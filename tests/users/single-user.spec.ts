import { test, expect } from '@playwright/test';

test.describe('GET /api/users/:id', () => {
  test('should return user by ID', async ({ request }) => {
    const response = await request.get('/api/users/2');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.id).toBe(2);
    expect(body.data.email).toBeTruthy();
    expect(body.data.first_name).toBeTruthy();
  });

  test('should return 404 for non-existent user', async ({ request }) => {
    const response = await request.get('/api/users/999');
    expect(response.status()).toBe(404);
  });
});

test.describe('POST /api/users', () => {
  test('should create a new user', async ({ request }) => {
    const response = await request.post('/api/users', {
      data: { name: 'Test User', job: 'QA Engineer' },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe('Test User');
    expect(body.job).toBe('QA Engineer');
    expect(body.id).toBeTruthy();
    expect(body.createdAt).toBeTruthy();
  });
});

test.describe('PUT /api/users/:id', () => {
  test('should update an existing user', async ({ request }) => {
    const response = await request.put('/api/users/2', {
      data: { name: 'Updated', job: 'Senior QA' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Updated');
    expect(body.updatedAt).toBeTruthy();
  });
});

test.describe('DELETE /api/users/:id', () => {
  test('should delete user and return 204', async ({ request }) => {
    const response = await request.delete('/api/users/2');
    expect(response.status()).toBe(204);
  });
});
