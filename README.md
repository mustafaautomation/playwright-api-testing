# Playwright API Testing

[![API Tests](https://github.com/mustafaautomation/playwright-api-testing/actions/workflows/ci.yml/badge.svg)](https://github.com/mustafaautomation/playwright-api-testing/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-API_Testing-2EAD33.svg?logo=playwright&logoColor=white)](https://playwright.dev)

REST API tests for the public [DummyJSON](https://dummyjson.com) API, written with Playwright's `APIRequestContext` — no browser needed. Covers users and products CRUD, login, search/sort/pagination, response-structure checks and response-time checks. The base URL can be overridden with `BASE_URL`.

---

## Why Playwright for APIs?

| Benefit | How |
|---------|-----|
| **Same framework** | One tool for E2E + API tests |
| **Built-in retries** | `retries: 1` in config |
| **Parallel execution** | `fullyParallel: true` |
| **HTML reports** | Built-in reporter |
| **No extra test deps** | `@playwright/test` is the only test dependency |
| **TypeScript native** | Full type safety |

---

## Test Coverage

| Suite | File | Tests | Endpoints |
|-------|------|-------|-----------|
| List Users | `tests/users/list-users.spec.ts` | 6 | GET /users (pagination, sort, headers), GET /users/search |
| Single User | `tests/users/single-user.spec.ts` | 11 | GET/PUT/PATCH/DELETE /users/:id, POST /users/add |
| Products | `tests/products/products.spec.ts` | 9 | GET /products, /products/:id, /products/search, /products/categories; POST /products/add; PUT/DELETE /products/:id |
| Auth | `tests/auth/auth.spec.ts` | 4 | POST /auth/login (valid, wrong password, unknown user, empty body) |
| Response time | `tests/users/response-time.spec.ts` | 5 | Users, products and login respond in < 2s |
| **Total** | | **35** | |

Write requests (add/update/delete) are simulated by DummyJSON and do not change its data.

-------|-------|-----------|
| List Users | 4 | GET /api/users |
| Single User | 4 | GET/POST/PUT/DELETE /api/users/:id |
| Auth | 4 | POST /api/login, /api/register |
| Performance | 2 | Response time < 2s |
| **Total** | **14** | |

---

## Quick Start

```bash
npm install
npx playwright test

# Run specific suite
npx playwright test tests/users/
npx playwright test tests/auth/
npx playwright test tests/products/

# HTML report
npx playwright show-report
```

---

## Example Test

```typescript
import { test, expect } from '@playwright/test';

test('should create a new user', async ({ request }) => {
  const response = await request.post('/users/add', {
    data: { firstName: 'Test', lastName: 'User', age: 30, email: 'test@example.com' },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.firstName).toBe('Test');
  expect(body.id).toBeGreaterThan(0);
});
```

No browser. No page. Just `request` fixture → HTTP calls → assertions.

---

## Project Structure

```
playwright-api-testing/
├── tests/
│   ├── users/
│   │   ├── list-users.spec.ts      # 6 tests — pagination, email format, headers
│   │   ├── single-user.spec.ts     # 11 tests — CRUD operations
│   │   └── response-time.spec.ts   # 5 tests — response time < 2s
│   ├── products/
│   │   └── products.spec.ts        # 9 tests — list, search, categories, CRUD
│   └── auth/
│       └── auth.spec.ts            # 4 tests — login and error cases
├── playwright.config.ts             # baseURL, parallel, retries
└── .github/workflows/ci.yml
```

---

## License

MIT

---

Built by [Quvantic](https://quvantic.com)
