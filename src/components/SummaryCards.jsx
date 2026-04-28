import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function SummaryCards({ refresh }) {
  const [stats, setStats] = useState({
    totalSpent: 0,
    transactions: 0,
    highest: 0,
    topCategory: "N/A",
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("*");

      if (error) {
        console.error("Error fetching stats:", error.message);
      } else {
        const totalSpent = data.reduce(
          (sum, expense) => sum + expense.amount, 0
        );
        const transactions = data.length;
        const highest = data.length > 0
          ? Math.max(...data.map((e) => e.amount))
          : 0;

        const categoryTotals = data.reduce((acc, expense) => {
          acc[expense.category] =
            (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {});

        const topCategory = Object.keys(categoryTotals).length > 0
          ? Object.keys(categoryTotals).reduce((a, b) =>
              categoryTotals[a] > categoryTotals[b] ? a : b
            )
          : "N/A";

        setStats({ totalSpent, transactions, highest, topCategory });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refresh]);

  const cards = [
    {
      label: "Total Spent",
      value: `Rs. ${stats.totalSpent.toLocaleString()}`,
      border: "border-t-red-400",
      icon: "💸",
      iconBg: "bg-red-50",
    },
    {
      label: "Transactions",
      value: stats.transactions,
      border: "border-t-blue-400",
      icon: "🧾",
      iconBg: "bg-blue-50",
    },
    {
      label: "Highest Expense",
      value: `Rs. ${stats.highest.toLocaleString()}`,
      border: "border-t-orange-400",
      icon: "📈",
      iconBg: "bg-orange-50",
    },
    {
      label: "Top Category",
      value: stats.topCategory,
      border: "border-t-green-400",
      icon: "🏆",
      iconBg: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`bg-white rounded-xl shadow-sm p-5 border-t-4 ${card.border}`}
        >
          {/* Icon + Label */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xl p-2 rounded-lg ${card.iconBg}`}>
              {card.icon}
            </span>
            <p className="text-gray-500 text-sm font-semibold">
              {card.label}
            </p>
          </div>

          {/* Value */}
          <h2 className="text-2xl font-bold text-gray-800">
            {loading ? (
              <span className="text-gray-300 animate-pulse">...</span>
            ) : (
              card.value
            )}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;