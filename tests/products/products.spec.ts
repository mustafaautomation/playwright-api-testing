import { test, expect } from '@playwright/test';

test.describe('GET /products', () => {
  test('should return paginated product list', async ({ request }) => {
    const response = await request.get('/products?limit=5');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.products).toHaveLength(5);
    expect(body.total).toBeGreaterThan(0);
  });

  test('should return product with full structure', async ({ request }) => {
    const response = await request.get('/products/1');

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
    expect(body.price).toBeGreaterThan(0);
    expect(body.category).toBeTruthy();
    expect(body.images).toBeInstanceOf(Array);
    expect(body.rating).toBeDefined();
  });

  test('should return 404 for non-existent product', async ({ request }) => {
    const response = await request.get('/products/999999');
    expect(response.status()).toBe(404);
  });

  test('should search products', async ({ request }) => {
    const response = await request.get('/products/search?q=phone');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.products).toBeDefined();
  });

  test('should list product categories', async ({ request }) => {
    const response = await request.get('/products/categories');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBeGreaterThan(0);
  });

  test('should sort products by price ascending', async ({ request }) => {
    const response = await request.get('/products?sortBy=price&order=asc&limit=10');
    expect(response.status()).toBe(200);
    const body = await response.json();
    const prices = body.products.map((p: { price: number }) => p.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });
});

test.describe('CRUD /products', () => {
  test('should add a new product', async ({ request }) => {
    const response = await request.post('/products/add', {
      data: { title: 'Test Product', price: 29.99, category: 'test' },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.id).toBeGreaterThan(0);
    expect(body.title).toBe('Test Product');
  });

  test('should update a product', async ({ request }) => {
    const response = await request.put('/products/1', {
      data: { title: 'Updated Product' },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.title).toBe('Updated Product');
  });

  test('should delete a product', async ({ request }) => {
    const response = await request.delete('/products/1');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.isDeleted).toBe(true);
  });
});
