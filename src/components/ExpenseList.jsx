import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const CATEGORY_EMOJI = {
  Food: "🍔",
  Transport: "🚌",
  Shopping: "🛍️",
  Health: "💊",
  Education: "📚",
  Entertainment: "🎮",
  Other: "📦",
};

const CATEGORIES = [
  "All",
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

function ExpenseList({ refresh, onDelete }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false });

      if (activeFilter !== "All") {
        query = query.eq("category", activeFilter);
      }

      const { data, error } = await query;

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

  useEffect(() => {
    fetchExpenses();
  }, [refresh, activeFilter]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this expense?");
    if (!confirm) return;

    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting:", error.message);
    } else {
      onDelete();
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      {/* Header */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        📋 Recent Expenses
      </h3>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition
              ${activeFilter === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
          >
            {cat === "All" ? "🗂️ All" : `${CATEGORY_EMOJI[cat]} ${cat}`}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-xs text-gray-400 mb-3">
        {loading
          ? "Loading..."
          : `${expenses.length} expense${expenses.length !== 1 ? "s" : ""} found`}
      </p>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-14 bg-gray-100 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && expenses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🧾</p>
          <p className="text-gray-500 font-semibold">No expenses found!</p>
          <p className="text-gray-400 text-sm mt-1">
            {activeFilter === "All"
              ? "Add your first expense 👈"
              : `No ${activeFilter} expenses yet`}
          </p>
        </div>
      )}

      {/* Expenses List */}
      {!loading && expenses.length > 0 && (
        <div className="flex flex-col divide-y divide-gray-100">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 rounded-lg transition"
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                  {CATEGORY_EMOJI[expense.category] || "📦"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {expense.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {expense.category} • {formatDate(expense.date)}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <p className="font-bold text-red-500 text-sm">
                  Rs. {expense.amount.toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="text-gray-300 hover:text-red-500 transition text-lg"
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

export default ExpenseList;