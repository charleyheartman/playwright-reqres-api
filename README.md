# playwright-reqres-api

API test automation project built with **Playwright** and **TypeScript**, covering REST API endpoints of [reqres.in](https://reqres.in).

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Test framework & API request context |
| TypeScript | Type-safe test code |
| dotenvx | Environment variable management |
| GitHub Actions | CI/CD (coming soon) |

---

## 📁 Project Structure

```
playwright-reqres-api/
├── tests/
│   ├── api/
│   │   ├── UsersApi.ts        # API class for /api/users
│   │   ├── UnknownApi.ts      # API class for /api/unknown
│   │   ├── users.spec.ts      # Tests for /api/users
│   │   └── unknown.spec.ts    # Tests for /api/unknown
│   └── fixtures.ts            # Custom Playwright fixtures
├── .env                       # Environment variables (not committed)
├── playwright.config.ts       # Playwright configuration
└── package.json
```

---

## ⚙️ Setup

### 1. Clone the repository

```bash
git clone https://github.com/charleyheartman/playwright-reqres-api.git
cd playwright-reqres-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
cp .env.example .env
```

Add your API key (if required):

```
API_KEY=your_api_key_here
```

---

## 🚀 Running Tests

Run all tests:

```bash
npx playwright test
```

Run only API tests:

```bash
npx playwright test tests/api/
```

Run a specific spec file:

```bash
npx playwright test tests/api/users.spec.ts
```

Run with list reporter (verbose output):

```bash
npx playwright test --reporter=list
```

Open HTML report after test run:

```bash
npx playwright show-report
```

---

## ✅ Test Coverage

### `/api/users`

| Method | Scenario | Expected |
|--------|----------|----------|
| GET | Returns user list with status 200 | `200 OK` |
| GET | Each user has id, email, first_name, last_name | `200 OK` |
| GET | Returns list of users (pagination check) | `200 OK` |

### `/api/users/:id`

| Method | Scenario | Expected |
|--------|----------|----------|
| GET | Returns correct data for user with id 2 | `200 OK` |
| GET | Returns 404 for non-existing user | `404 Not Found` |

### `/api/users` (POST)

| Method | Scenario | Expected |
|--------|----------|----------|
| POST | Creates a new user with correct fields | `201 Created` |

### `/api/users/:id` (DELETE)

| Method | Scenario | Expected |
|--------|----------|----------|
| DELETE | Deletes a user, returns no content | `204 No Content` |

### `/api/unknown`

| Method | Scenario | Expected |
|--------|----------|----------|
| GET | Returns resource list with correct pagination fields | `200 OK` |

---

## 🧱 Architecture

### API Classes (Page Object Model for API)

Each API resource has its own class with typed methods:

```typescript
export class UsersApi {
    constructor(private request: APIRequestContext) {}

    async getUsers(page: number): Promise<APIResponse> {
        return this.request.get(`/api/users?page=${page}`);
    }

    async getUserById(id: number): Promise<APIResponse> {
        return this.request.get(`/api/users/${id}`);
    }

    async createUser(name: string, job: string, age: number): Promise<APIResponse> {
        return this.request.post(`/api/users`, { data: { name, job, age } });
    }

    async deleteUser(id: number): Promise<APIResponse> {
        return this.request.delete(`/api/users/${id}`);
    }
}
```

### Custom Fixtures

API classes are injected via Playwright's `base.extend<Fixtures>()`, enabling clean test signatures:

```typescript
test('creates a user', async ({ usersApi }) => {
    const response = await usersApi.createUser('morpheus', 'leader', 30);
    expect(response.status()).toBe(201);
});
```

---

## 👤 Author

**Sten Nick** — QA Engineer  
[GitHub](https://github.com/charleyheartman) · [LinkedIn](https://www.linkedin.com/in/nikolay-stenkin/)
