# 💰 Expense Tracker

A full stack expense tracking application built with React and Supabase. Track your daily spending, categorize expenses, and visualize your spending habits.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![Zod](https://img.shields.io/badge/Zod-Validation-orange)

---

## 🚀 Features

- ➕ Add expenses with title, amount, category and date
- 🗑️ Delete expenses
- 📋 View all expenses in real time
- 📊 Spending breakdown by category (chart)
- 💵 Summary cards — total spent, remaining, transactions
- ✅ Form validation with Zod
- ☁️ Data saved to Supabase (PostgreSQL)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React + Vite | Frontend framework |
| react-hook-form | Form management |
| Zod | Schema validation |
| Supabase | Backend & database |
| Recharts | Spending charts |
| CSS-in-JS | Styling |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx       # Main layout
│   ├── SummaryCards.jsx    # Total, spent, remaining cards
│   ├── ExpenseForm.jsx     # Add expense form
│   ├── ExpenseList.jsx     # List + delete expenses
│   └── ExpenseChart.jsx    # Spending by category chart
├── supabaseClient.js       # Supabase connection
├── App.jsx
└── main.jsx
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- A Supabase account

### 1. Clone the repository

```bash
git clone https://github.com/Milano55/expense-tracker.git
cd expense-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Supabase

- Create a new project on [supabase.com](https://supabase.com)
- Create an `expenses` table with these columns:

| Column | Type |
|---|---|
| id | int8 (auto) |
| title | text |
| amount | float4 |
| category | text |
| date | date |
| created_at | timestamptz |

### 4. Setup environment variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_publishable_key
```

### 5. Run the app

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## 📸 Screenshots

> Coming soon

---

## 📚 What I Learned

- React fundamentals — components, props, state
- `useState` and `useEffect` hooks
- Controlled forms with `react-hook-form`
- Schema validation with `Zod`
- Connecting React to Supabase
- CRUD operations with Supabase
- Protecting API keys with `.env`
- Git & GitHub version control

---

## 🔮 Future Improvements

- [ ] User authentication (login/signup)
- [ ] Monthly budget setting
- [ ] Export expenses to CSV
- [ ] Mobile responsive design
- [ ] Dark mode

---

## 👤 Author

**Milano55**
- GitHub: [@Milano55](https://github.com/Milano55)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
