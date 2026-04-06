import { test, expect } from '@playwright/test';

test.describe('GET /users/:id', () => {
  test('should return user by ID', async ({ request }) => {
    const response = await request.get('/users/1');
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.firstName).toBeTruthy();
    expect(body.lastName).toBeTruthy();
    expect(body.email).toContain('@');
    expect(body.image).toMatch(/^https?:\/\//);
  });

  test('should return 404 for non-existent user', async ({ request }) => {
    const response = await request.get('/users/999999');
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body.message).toBeTruthy();
  });

  for (const id of [1, 2, 3, 5, 10]) {
    test(`should return user ${id} with valid structure`, async ({ request }) => {
      const response = await request.get(`/users/${id}`);
      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.id).toBe(id);
      expect(body.firstName).toBeTruthy();
    });
  }
});

test.describe('POST /users/add', () => {
  test('should create a new user', async ({ request }) => {
    const response = await request.post('/users/add', {
      data: { firstName: 'Test', lastName: 'User', age: 30, email: 'test@example.com' },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.firstName).toBe('Test');
    expect(body.id).toBeGreaterThan(0);
  });
});

test.describe('PUT /users/:id', () => {
  test('should update an existing user', async ({ request }) => {
    const response = await request.put('/users/1', {
      data: { lastName: 'Updated' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.lastName).toBe('Updated');
  });
});

test.describe('PATCH /users/:id', () => {
  test('should partially update user', async ({ request }) => {
    const response = await request.patch('/users/1', {
      data: { firstName: 'Patched' },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstName).toBe('Patched');
  });
});

test.describe('DELETE /users/:id', () => {
  test('should delete user and return data', async ({ request }) => {
    const response = await request.delete('/users/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.isDeleted).toBe(true);
    expect(body.deletedOn).toBeTruthy();
  });
});
