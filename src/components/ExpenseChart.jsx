function ExpenseChart() {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Spending by Category</h3>
      <p style={{ color: "#636e72" }}>Chart coming in Phase 7...</p>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: "10px",
    padding: "1.5rem",
    marginTop: "2rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  title: {
    marginBottom: "1rem",
    color: "#2d3436",
  },
};

export default ExpenseChart;