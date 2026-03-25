# Personal Finance Tracking Application - Functional Requirements

## 1) Overview

This application helps users understand spending habits and make smarter financial decisions by tracking income, expenses, budgets, and savings goals.

## 2) User Identification and Access

### 2.1 Account Access
- The system shall provide a simple user identification mechanism using one of the following:
  - Username/password login
  - PIN-based login
- The system shall ensure each user can access only their own financial data.

### 2.2 Session Handling
- The system shall maintain authenticated sessions for logged-in users.
- The system shall allow users to log out securely.

## 3) Income and Expense Management

### 3.1 Manual Data Entry
- The system shall allow users to manually add income records.
- The system shall allow users to manually add expense records.
- Each transaction shall include:
  - Amount
  - Date
  - Type (income or expense)
  - Category
  - Optional note/description

### 3.2 Transaction CRUD Operations
- The system shall support creating transactions.
- The system shall support viewing transaction history.
- The system shall support updating existing transactions.
- The system shall support deleting transactions.

## 4) Categories

### 4.1 Category Management
- The system shall provide default expense categories such as:
  - Food
  - Transport
  - Bills
  - Entertainment
- The system shall allow users to create custom categories.
- The system shall allow users to edit category names.
- The system shall allow users to delete categories (with safeguards if linked to transactions).

### 4.2 Expense Categorization
- The system shall require expenses to be assigned to a category.
- The system shall support filtering transaction lists by category.

## 5) Budgeting, Balance, and Targets

### 5.1 Monthly Income and Budget Setup
- The system shall allow users to define monthly income.
- The system shall allow users to define a total monthly budget.
- The system shall allow users to define optional monthly savings targets.

### 5.2 Summary Metrics
- The system shall display:
  - Total income (selected month)
  - Total expenses (selected month)
  - Remaining balance (income - expenses)
- The system shall show monthly budget utilization as a percentage.

## 6) Goal and Planning Features

These features help users actively improve their financial health.

### 6.1 Savings Goals
- The system shall allow users to create savings goals (example: "Save Rs. 100,000 for a laptop").
- A goal shall include:
  - Goal name
  - Target amount
  - Optional target date
- The system shall track and visually display progress toward each goal.

### 6.2 Budget Planning
- The system shall allow users to set monthly budgets per category.
- The system shall show visual progress bars for each category budget.

### 6.3 Budget Alerts
- The system shall notify users when 80% of a category budget is reached.
- The system shall notify users when category overspending is detected.

## 7) Landing Page Requirements

The landing page shall display the following at a minimum:
- Current total expenses for the month
- Percentage of monthly budget used
- Remaining budget amount
- Expense breakdown by category
- Quick view of active savings goals and progress

## 8) Dashboard and Analytics

### 8.1 Dashboard Visualizations
- The system shall include charts/graphs for:
  - Monthly spending overview
  - Category-wise expense distribution
  - Historical spending trends

### 8.2 Data Filtering
- The system shall allow users to view analytics by:
  - Date range
  - Category
  - Income vs expense

## 9) Mobile Responsiveness

- The application shall be usable on smartphones through a web browser.
- The UI shall be mobile responsive for key screens:
  - Login
  - Transaction entry
  - Landing page
  - Dashboard

## 10) Data Storage and Persistence

- The system shall store user accounts securely in a database.
- The system shall store financial records (income/expenses) in a database.
- The system shall persist categories, budgets, and savings goals in the database.

## 11) Non-Functional Expectations (Basic)

- The application should be simple and intuitive for non-technical users.
- Common operations (add transaction, view summary, edit transaction) should require minimal clicks/taps.
- Data should be loaded within reasonable time for typical personal-use datasets.

## 12) Suggested MVP Scope

For a first release, prioritize:
1. User login/PIN
2. Transaction CRUD (income/expense)
3. Category management
4. Monthly summary (income, expense, balance)
5. Landing page with budget usage
6. Basic dashboard charts
7. Category budgets + 80%/overspend alerts
8. Savings goals with progress tracking
