# 💰 Expense Tracker

A full-stack expense tracking web application that allows users to log, categorize, and analyze their spending in real time. The application dynamically calculates totals, highlights highest and lowest spending categories, and provides a clear breakdown of expenses by date and category.

---

## 🚀 Features

- 📅 **Add Expenses**
  - Log expenses with date, category, and price
  - Data persists via a backend API

- 📊 **Real-Time Analytics**
  - Total amount spent updates instantly
  - Automatically identifies:
    - Highest spending category
    - Lowest spending category

- 📈 **Expense Summaries**
  - View total spending grouped by:
    - Date
    - Category
  - Displays number of expenses per date

- ❌ **Remove Expenses**
  - Delete individual expenses
  - Totals and analytics update immediately

- 🔄 **Dynamic UI**
  - Responsive React frontend
  - Clean tabular views for clarity

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- JavaScript
- HTML / CSS

### Backend
- Node.js
- Express.js
- RESTful API architecture

### Database
- PostgreSQL
- Secure connection using environment variables
- Full CRUD operations

---

## 🧪 How It Works

1. User submits an expense from the UI
2. Frontend sends a request to the Express API
3. Expense is stored in PostgreSQL
4. Backend returns updated expense data
5. UI recalculates totals and category analytics in real time

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/victorg224/Expense-T-FullStack.git
cd Expense-T-FullStack


