import { useState } from "react";
import SummaryCards from "./SummaryCards";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import ExpenseChart from "./ExpenseChart";

function Dashboard() {
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>💰 Expense Tracker</h1>
        <p style={styles.subtitle}>Track your spending easily</p>
      </div>

      {/* Summary Cards */}
      <SummaryCards refresh={refresh} />

      {/* Main Content */}
      <div style={styles.mainContent}>

        {/* Left — Form */}
        <div style={styles.left}>
          <ExpenseForm onExpenseAdded={handleRefresh} />
        </div>

        {/* Right — List */}
        <div style={styles.right}>
          <ExpenseList refresh={refresh} onDelete={handleRefresh} />
        </div>

      </div>

      {/* Chart */}
      <ExpenseChart refresh={refresh} />

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "2rem",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2rem",
    color: "#2d3436",
  },
  subtitle: {
    color: "#636e72",
    marginTop: "0.3rem",
  },
  mainContent: {
    display: "flex",
    gap: "2rem",
    marginTop: "2rem",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 2,
  },
};

export default Dashboard;