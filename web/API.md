# API Setup (Starter)

Base URL (local): `http://localhost:3000`

## Mock Login (UI)

There is a client-side mock login screen at `/login`.

- Email: `demo@apexledger.com`
- Password: `123456`

## Health

- `GET /api/health`
  - Returns API status and timestamp.

## Transactions

- `GET /api/transactions`
  - Returns all transactions.

- `POST /api/transactions`
  - Creates a new transaction.
  - Body:
    ```json
    {
      "amount": 2500,
      "type": "expense",
      "category": "food",
      "date": "2026-03-25",
      "note": "Dinner"
    }
    ```

- `GET /api/transactions/{id}`
  - Returns one transaction by id.

- `PUT /api/transactions/{id}`
  - Updates an existing transaction.

- `DELETE /api/transactions/{id}`
  - Deletes an existing transaction.

## Categories

- `GET /api/categories`
  - Returns available categories.
- `POST /api/categories`
  - Creates a category.
- `PUT /api/categories/{id}`
  - Updates a category.
- `DELETE /api/categories/{id}`
  - Deletes a category.

## Budgets

- `GET /api/budgets?month=YYYY-MM`
  - Returns monthly budget, category allocation, usage, and alert states.
- `PUT /api/budgets`
  - Upserts monthly budget data.

## Goals

- `GET /api/goals`
  - Returns savings goals.
- `POST /api/goals`
  - Creates a savings goal.
- `PUT /api/goals/{id}`
  - Updates a savings goal.
- `DELETE /api/goals/{id}`
  - Deletes a savings goal.

## Summary and Dashboard

- `GET /api/summary?month=YYYY-MM`
  - Returns monthly totals, budget usage, category breakdown, recent transactions, and active goal.
- `GET /api/dashboard?month=YYYY-MM`
  - Returns chart-ready monthly trend, category distribution, and income-vs-expense data.

## Notifications

- `GET /api/notifications?month=YYYY-MM&unreadOnly=true|false`
  - Returns alert inbox items derived from budget thresholds and unread count.
- `POST /api/notifications`
  - Body: `{ "action": "mark_all_read", "month": "YYYY-MM" }`

## Run Locally

1. `cd web`
2. `npm run dev`
3. Open `http://localhost:3000`
