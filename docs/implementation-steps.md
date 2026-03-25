# Personal Finance Tracker - Steps Followed

## 1. Requirement Doc Created

- Created functional requirements document:
  - `docs/functional-requirements.md`
- Covered core features:
  - income/expense entry
  - categories
  - summary metrics
  - budget planning
  - savings goals
  - alerts
  - dashboard analytics

## 2. Design Guidelines Doc Created

- Created UI design specification:
  - `docs/ui-design-specification.md`
- Included:
  - screen-by-screen UX requirements
  - mobile responsive behavior
  - visual style guidelines
  - accessibility expectations
  - MVP design deliverables

## 3. Created UI Using Stitch

- Generated multiple mobile screens in Stitch for:
  - Login
  - Home
  - Transactions
  - Add/Edit Transaction
  - Budgets
  - Goals
  - Dashboard
  - Settings
- Stitch project reference (MCP resource): `projects/8034199047571595535`
- Stitch screenshot link (project asset preview): [View screenshot asset](https://lh3.googleusercontent.com/aida/ADBb0ugq1QTDvKXcEbEdDRJA-Y1T7_b6NELfFqdpgOQwXkGXkuJSTjJms1Qa-KpIiH415_FlB8er0rA4vm0XzaVj_eZnNQznIeoz94iQbY7-gLl5FRCbyYxZmRo-Jx-fx7pq-q_wtt0FdxEWOAKV1JQPhTQ68_2bIq0Xflg1710U1dn8oDvSTcybEYdwEk50tgAVA0E85tHIU8c7IzuQRIwruh5NtCy7k9RpTBVaoCkP0U-ZMRaKnT4Ky_vQFLw)

## 4. Connected Stitch Through MCP to Cursor

- Verified Stitch MCP connectivity.
- Listed Stitch projects via MCP.
- Generated and iterated screens directly through MCP tools from Cursor.

## 5. Set Up Next.js Project with API

- Created Next.js (App Router + TypeScript) project:
  - `web/`
- Added core API structure with route handlers.

## 6. Implemented Core APIs

- Health:
  - `GET /api/health`
- Transactions CRUD:
  - `GET/POST /api/transactions`
  - `GET/PUT/DELETE /api/transactions/{id}`
- Categories CRUD:
  - `GET/POST /api/categories`
  - `PUT/DELETE /api/categories/{id}`
- Budgets:
  - `GET /api/budgets`
  - `PUT /api/budgets`
- Goals CRUD:
  - `GET/POST /api/goals`
  - `PUT/DELETE /api/goals/{id}`
- Analytics:
  - `GET /api/summary`
  - `GET /api/dashboard`
- Notifications:
  - `GET /api/notifications`
  - `POST /api/notifications` (`mark_all_read`)

## 7. Integrated APIs with UI

- Wired pages to live API data:
  - Home, Dashboard, Budgets, Goals, Add Transaction.
- Added chart visualizations using `recharts`.
- Added notification inbox page and unread badge.

## 8. Implemented Auth Flow (Mock)

- Added login screen with mock credentials.
- Added route-level UI guarding using local session flag.
- Added logout support in Settings.

## 9. Implemented Budget Alerts UX

- Backend logic for:
  - 80% budget warning
  - overspending detection
- Frontend:
  - warning text on Home
  - notification center inbox
  - unread indicator

## 10. Validation and Delivery

- Ran lint checks after changes.
- Resolved lint issues.
- Committed and pushed all changes to GitHub `main`.
