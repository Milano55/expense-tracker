import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { supabase } from "../supabaseClient";

const CATEGORY_COLORS = {
  Food: "#00b894",
  Transport: "#0984e3",
  Shopping: "#6c5ce7",
  Health: "#e17055",
  Education: "#fdcb6e",
  Entertainment: "#fd79a8",
  Other: "#b2bec3",
};

const CATEGORY_EMOJI = {
  Food: "🍔",
  Transport: "🚌",
  Shopping: "🛍️",
  Health: "💊",
  Education: "📚",
  Entertainment: "🎮",
  Other: "📦",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg p-3">
        <p className="font-semibold text-gray-800 text-sm mb-1">
          {CATEGORY_EMOJI[label]} {label}
        </p>
        <p className="text-red-500 font-bold">
          Rs. {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

function ExpenseChart({ refresh }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalSpent, setTotalSpent] = useState(0);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("expenses")
        .select("category, amount");

      if (error) {
        console.error("Error:", error.message);
      } else {
        const grouped = data.reduce((acc, expense) => {
          acc[expense.category] =
            (acc[expense.category] || 0) + expense.amount;
          return acc;
        }, {});

        const formatted = Object.entries(grouped)
          .map(([category, amount]) => ({ category, amount }))
          .sort((a, b) => b.amount - a.amount);

        const total = data.reduce((sum, e) => sum + e.amount, 0);

        setChartData(formatted);
        setTotalSpent(total);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [refresh]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800">
          📊 Spending by Category
        </h3>
        <p className="text-sm text-gray-500">
          Total:{" "}
          <span className="font-bold text-gray-800">
            Rs. {totalSpent.toLocaleString()}
          </span>
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="h-64 bg-gray-100 rounded-lg animate-pulse" />
      )}

      {/* Empty */}
      {!loading && chartData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📊</p>
          <p className="text-gray-500 font-semibold">No data yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Add some expenses to see your chart!
          </p>
        </div>
      )}

      {/* Chart + Legend */}
      {!loading && chartData.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Bar Chart */}
          <div className="w-full lg:w-2/3">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  tickFormatter={(v) => `Rs.${v}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.category}
                      fill={CATEGORY_COLORS[entry.category] || "#b2bec3"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="w-full lg:w-1/3 flex flex-col gap-3 justify-center">
            {chartData.map((entry) => (
              <div
                key={entry.category}
                className="flex items-center gap-3"
              >
                {/* Color dot */}
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: CATEGORY_COLORS[entry.category] || "#b2bec3",
                  }}
                />

                {/* Category name */}
                <span className="text-sm text-gray-600 flex-1">
                  {CATEGORY_EMOJI[entry.category]} {entry.category}
                </span>

                {/* Amount */}
                <span className="text-sm font-semibold text-gray-800">
                  Rs. {entry.amount.toLocaleString()}
                </span>

                {/* Percentage */}
                <span className="text-xs text-gray-400 w-10 text-right">
                  {totalSpent > 0
                    ? `${Math.round((entry.amount / totalSpent) * 100)}%`
                    : "0%"}
                </span>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

export default ExpenseChart;