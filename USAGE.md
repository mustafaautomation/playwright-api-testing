## Real-World Use Cases

### 1. API Contract Verification
```typescript
test("GET /users returns correct shape", async ({ request }) => {
  const res = await request.get("/api/users");
  const body = await res.json();
  expect(body.data[0]).toHaveProperty("id");
  expect(body.data[0]).toHaveProperty("email");
});
```

### 2. Auth Flow Testing
Test login → get token → use token for protected endpoints — all without opening a browser.
