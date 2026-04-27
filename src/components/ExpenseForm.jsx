import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../supabaseClient";

// ✅ Zod Schema
const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Minimum 3 characters"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
  category: z
    .string()
    .min(1, "Please select a category"),
  date: z
    .string()
    .min(1, "Date is required"),
});

// ✅ Categories
const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

function ExpenseForm({ onExpenseAdded }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .insert([{
          title: data.title,
          amount: data.amount,
          category: data.category,
          date: data.date,
        }]);

      if (error) {
        console.error("Error:", error.message);
        alert("Something went wrong ❌");
      } else {
        reset();
        onExpenseAdded(); // 👈 tells Dashboard to refresh list
        alert("Expense added! ✅");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>➕ Add Expense</h3>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Title */}
        <div style={styles.field}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            placeholder="e.g. Lunch, Bus fare..."
            {...register("title")}
            style={{
              ...styles.input,
              borderColor: errors.title ? "red" : "#ddd",
            }}
          />
          {errors.title && (
            <p style={styles.error}>{errors.title.message}</p>
          )}
        </div>

        {/* Amount */}
        <div style={styles.field}>
          <label style={styles.label}>Amount (Rs.)</label>
          <input
            type="number"
            placeholder="e.g. 500"
            {...register("amount", { valueAsNumber: true })}
            style={{
              ...styles.input,
              borderColor: errors.amount ? "red" : "#ddd",
            }}
          />
          {errors.amount && (
            <p style={styles.error}>{errors.amount.message}</p>
          )}
        </div>

        {/* Category */}
        <div style={styles.field}>
          <label style={styles.label}>Category</label>
          <select
            {...register("category")}
            style={{
              ...styles.input,
              borderColor: errors.category ? "red" : "#ddd",
            }}
          >
            <option value="">-- Select category --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p style={styles.error}>{errors.category.message}</p>
          )}
        </div>

        {/* Date */}
        <div style={styles.field}>
          <label style={styles.label}>Date</label>
          <input
            type="date"
            {...register("date")}
            style={{
              ...styles.input,
              borderColor: errors.date ? "red" : "#ddd",
            }}
          />
          {errors.date && (
            <p style={styles.error}>{errors.date.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          style={{
            ...styles.button,
            opacity: !isValid || isSubmitting ? 0.6 : 1,
          }}
        >
          {isSubmitting ? "Saving..." : "Add Expense"}
        </button>

      </form>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: "10px",
    padding: "1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#2d3436",
    fontSize: "1.1rem",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.4rem",
    fontSize: "0.85rem",
    color: "#636e72",
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "0.6rem 0.8rem",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    outline: "none",
  },
  error: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "0.3rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    background: "#0984e3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "0.5rem",
  },
};

export default ExpenseForm;