# Personal Finance Tracker - UI Design Specification

## 1) Purpose

Define a clean, mobile-responsive UI for a personal finance tracking web app that helps users track spending, manage budgets, and achieve savings goals.

## 2) Design Principles

- Keep interactions simple and fast (low effort data entry).
- Prioritize readability of money values and status indicators.
- Surface insights quickly (budget used, category spend, savings progress).
- Use consistent patterns for forms, cards, charts, and alerts.
- Ensure accessibility and mobile-first responsiveness.

## 3) Target Devices and Responsiveness

- Primary: smartphone web browsers (mobile-first).
- Secondary: tablet and desktop screens.
- Layout behavior:
  - Mobile: single-column layout, bottom navigation.
  - Tablet: two-column sections where space allows.
  - Desktop: sidebar + content area with multi-card dashboards.

## 4) Information Architecture

Main navigation items:
- Home (Landing)
- Transactions
- Budgets
- Goals
- Dashboard
- Profile/Settings

## 5) Global UI Elements

### 5.1 Top App Bar
- App name/logo
- Current month selector
- Notification icon (budget alerts)
- User/profile icon

### 5.2 Bottom Navigation (Mobile)
- Home
- Add Transaction (primary action, centered)
- Dashboard
- Budgets
- Goals

### 5.3 Reusable Components
- Metric cards (income, expense, balance)
- Category chips/tags
- Progress bars (budget and goals)
- Transaction list item card
- Modal forms
- Toast/snackbar alerts
- Empty-state cards

## 6) Screen-by-Screen UI Requirements

## 6.1 Login / PIN Screen

Purpose:
- Simple user identification and secure entry.

UI elements:
- Logo/title
- PIN input or email/password form
- Login button
- Optional "Remember me"
- Validation error text

Behavior:
- Show inline validation for missing/invalid fields.
- Redirect to Home on successful login.

## 6.2 Home (Landing Page)

Purpose:
- Provide quick monthly financial status.

Sections:
- Header with current month
- Summary cards:
  - Total Income
  - Total Expenses
  - Remaining Balance
- Budget usage:
  - Percentage used this month
  - Circular or linear progress indicator
- Expense by category snapshot
- Active savings goal progress
- Recent transactions preview (last 5)

Behavior:
- Tap category to open filtered transactions.
- Tap "View all" to open full transaction list.

## 6.3 Add/Edit Transaction Screen

Purpose:
- Fast manual input for income and expense.

Form fields:
- Type toggle (Income / Expense)
- Amount
- Date picker
- Category selector (required for expense)
- Note (optional)

Actions:
- Save
- Cancel
- Delete (edit mode only)

Validation:
- Amount must be positive.
- Category required when type is expense.
- Date cannot be empty.

## 6.4 Transactions Screen

Purpose:
- View, filter, and manage all transaction records.

UI elements:
- Search bar
- Filter row:
  - Date range
  - Category
  - Type (income/expense)
- Transaction list grouped by date
- Swipe actions on mobile:
  - Edit
  - Delete

Behavior:
- Infinite scroll or pagination.
- Confirmation modal before delete.

## 6.5 Budgets Screen

Purpose:
- Plan and monitor monthly budgets by category.

UI elements:
- Monthly budget overview card
- Category budget list:
  - Category name
  - Allocated budget
  - Used amount
  - Remaining amount
  - Progress bar
- "Edit Budget" action

Alert states:
- Normal (<80%) - neutral/green
- Warning (>=80% and <100%) - amber
- Overspent (>=100%) - red

## 6.6 Savings Goals Screen

Purpose:
- Track savings goals and encourage progress.

UI elements:
- Goal cards with:
  - Goal title (e.g., "Laptop Fund")
  - Target amount
  - Saved amount
  - Remaining amount
  - Progress bar
  - Optional target date
- Add Goal button

Behavior:
- Allow editing and deleting goals.
- Highlight goals near completion.

## 6.7 Dashboard Screen

Purpose:
- Visual analytics for spending and trends.

Charts:
- Monthly spending trend (line/bar)
- Category distribution (pie/donut)
- Income vs expense comparison (bar)
- Historical trend by month

Controls:
- Date range selector
- Category filter
- Export action (optional MVP+)

## 6.8 Profile / Settings Screen

UI elements:
- User info
- Currency preference (LKR default)
- Alert preference toggles
- Logout button

## 7) Visual Design Guidelines

### 7.1 Color System (Suggested)
- Primary: Blue (trust, clarity)
- Success: Green (savings positive state)
- Warning: Amber (80% budget warning)
- Danger: Red (overspending)
- Neutral backgrounds: light gray/white

### 7.2 Typography
- Use one clean sans-serif font.
- Hierarchy:
  - H1: page title
  - H2: section title
  - Body: transaction/details
  - Caption: helper and date text

### 7.3 Spacing and Layout
- Use an 8px spacing system.
- Keep touch targets at least 44px height on mobile.
- Use card-based grouping for quick scanning.

### 7.4 Iconography
- Use consistent icon set for:
  - Income/expense
  - Categories
  - Alerts
  - Edit/delete

## 8) Interaction and Feedback Rules

- Show immediate success feedback after create/update actions.
- Use confirmation dialogs for destructive actions (delete).
- Show loading states for charts and list fetching.
- Show empty states with guidance when no data exists.
- Provide clear error messages with corrective action.

## 9) Accessibility Requirements

- Color contrast should meet WCAG AA minimum.
- Do not rely on color alone for warnings/errors.
- Support keyboard navigation on desktop.
- Ensure form inputs have labels and accessible hints.
- Charts should include text summaries for accessibility.

## 10) Suggested MVP UI Deliverables

- Low-fidelity wireframes for all core screens.
- High-fidelity design for:
  - Login
  - Home
  - Add Transaction
  - Transactions
  - Budgets
  - Goals
  - Dashboard
- Clickable prototype for key flows:
  - Add expense
  - Review budget status
  - Track savings goal progress
  - Edit/delete transaction

## 11) UX Acceptance Criteria (UI-Focused)

- Users can add a transaction in under 30 seconds on mobile.
- Users can identify current month spending within 5 seconds of landing.
- Budget warning and overspending states are clearly distinguishable.
- Savings goal progress is visible without navigating away from goals/home context.
- UI remains readable and functional across common mobile screen sizes.
