# Playwright API Testing

[![API Tests](https://github.com/mustafaautomation/playwright-api-testing/actions/workflows/ci.yml/badge.svg)](https://github.com/mustafaautomation/playwright-api-testing/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Playwright](https://img.shields.io/badge/Playwright-API_Testing-2EAD33.svg?logo=playwright&logoColor=white)](https://playwright.dev)

REST API testing with Playwright's `APIRequestContext` — no browser needed. Full CRUD validation, auth flows, response time checks, and schema assertions. Same Playwright you know, but for APIs.

---

## Why Playwright for APIs?

| Benefit | How |
|---------|-----|
| **Same framework** | One tool for E2E + API tests |
| **Built-in retries** | `retries: 1` in config |
| **Parallel execution** | `fullyParallel: true` |
| **HTML reports** | Built-in reporter |
| **No extra deps** | `@playwright/test` is all you need |
| **TypeScript native** | Full type safety |

---

## Test Coverage

| Suite | Tests | Endpoints |
|-------|-------|-----------|
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

# HTML report
npx playwright show-report
```

---

## Example Test

```typescript
import { test, expect } from '@playwright/test';

test('should create a new user', async ({ request }) => {
  const response = await request.post('/api/users', {
    data: { name: 'Test User', job: 'QA' },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.name).toBe('Test User');
  expect(body.id).toBeTruthy();
});
```

No browser. No page. Just `request` fixture → HTTP calls → assertions.

---

## Project Structure

```
playwright-api-testing/
├── tests/
│   ├── users/
│   │   ├── list-users.spec.ts      # 4 tests — pagination, email format, headers
│   │   ├── single-user.spec.ts     # 4 tests — CRUD operations
│   │   └── response-time.spec.ts   # 2 tests — SLA validation
│   └── auth/
│       └── auth.spec.ts            # 4 tests — login, register, validation
├── playwright.config.ts             # baseURL, parallel, retries
└── .github/workflows/ci.yml
```

---

## License

MIT

---

Built by [Quvantic](https://quvantic.com)
