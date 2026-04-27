import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

// Category emoji map
const CATEGORY_EMOJI = {
  Food: "🍔",
  Transport: "🚌",
  Shopping: "🛍️",
  Health: "💊",
  Education: "📚",
  Entertainment: "🎮",
  Other: "📦",
};

function ExpenseList({ refresh, onDelete }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch expenses from Supabase
  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false }); // newest first

      if (error) {
        console.error("Error fetching:", error.message);
      } else {
        setExpenses(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ useEffect — fetch when component loads or refresh changes
  useEffect(() => {
    fetchExpenses();
  }, [refresh]); // 👈 re-fetches every time refresh changes

  // ✅ Delete expense
  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this expense?");
    if (!confirm) return;

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id); // delete where id matches

    if (error) {
      console.error("Error deleting:", error.message);
    } else {
      onDelete(); // tell Dashboard to refresh
    }
  };

  // Format date nicely
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>📋 Recent Expenses</h3>

      {/* Loading state */}
      {loading && (
        <p style={{ color: "#636e72", textAlign: "center" }}>Loading...</p>
      )}

      {/* Empty state */}
      {!loading && expenses.length === 0 && (
        <div style={styles.empty}>
          <p>No expenses yet!</p>
          <p style={{ fontSize: "0.85rem", color: "#b2bec3" }}>
            Add your first expense 👈
          </p>
        </div>
      )}

      {/* Expenses list */}
      {!loading && expenses.length > 0 && (
        <div>
          {expenses.map((expense) => (
            <div key={expense.id} style={styles.item}>

              {/* Left — emoji + details */}
              <div style={styles.itemLeft}>
                <span style={styles.emoji}>
                  {CATEGORY_EMOJI[expense.category] || "📦"}
                </span>
                <div>
                  <p style={styles.itemTitle}>{expense.title}</p>
                  <p style={styles.itemMeta}>
                    {expense.category} • {formatDate(expense.date)}
                  </p>
                </div>
              </div>

              {/* Right — amount + delete */}
              <div style={styles.itemRight}>
                <p style={styles.amount}>Rs. {expense.amount}</p>
                <button
                  onClick={() => handleDelete(expense.id)}
                  style={styles.deleteBtn}
                >
                  🗑️
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    height: "100%",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#2d3436",
    fontSize: "1.1rem",
  },
  empty: {
    textAlign: "center",
    padding: "2rem",
    color: "#636e72",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.85rem 0",
    borderBottom: "1px solid #f0f0f0",
  },
  itemLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  emoji: {
    fontSize: "1.5rem",
  },
  itemTitle: {
    fontWeight: "600",
    color: "#2d3436",
    marginBottom: "0.2rem",
  },
  itemMeta: {
    fontSize: "0.8rem",
    color: "#b2bec3",
  },
  itemRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  amount: {
    fontWeight: "700",
    color: "#d63031",
    fontSize: "1rem",
  },
  deleteBtn: {
    background: "none",
    border: "none",
    fontSize: "1.1rem",
    cursor: "pointer",
    padding: "0.2rem",
  },
};

export default ExpenseList;