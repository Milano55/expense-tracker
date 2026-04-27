function SummaryCards() {
  return (
    <div style={styles.grid}>

      <div style={{ ...styles.card, borderTop: "3px solid #00b894" }}>
        <p style={styles.label}>Total Budget</p>
        <h2 style={styles.amount}>Rs. 0</h2>
      </div>

      <div style={{ ...styles.card, borderTop: "3px solid #d63031" }}>
        <p style={styles.label}>Total Spent</p>
        <h2 style={styles.amount}>Rs. 0</h2>
      </div>

      <div style={{ ...styles.card, borderTop: "3px solid #0984e3" }}>
        <p style={styles.label}>Remaining</p>
        <h2 style={styles.amount}>Rs. 0</h2>
      </div>

      <div style={{ ...styles.card, borderTop: "3px solid #fdcb6e" }}>
        <p style={styles.label}>Transactions</p>
        <h2 style={styles.amount}>0</h2>
      </div>

    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "1rem",
  },
  card: {
    background: "white",
    borderRadius: "8px",
    padding: "1.5rem",
  },
  label: {
    color: "#636e72",
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
  },
  amount: {
    fontSize: "1.5rem",
    color: "#2d3436",
  },
};

export default SummaryCards;