import { useState } from "react";
import { HiCash } from "react-icons/hi";
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
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2">
            <HiCash className="text-blue-500 text-4xl" />
            <h1 className="text-3xl font-bold text-gray-800">
              Expense Tracker
            </h1>
          </div>
          <p className="text-gray-400 text-center mt-1 text-sm">
            Track your spending easily
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Summary Cards */}
        <SummaryCards refresh={refresh} />

        {/* Form + List */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          <div className="w-full lg:w-1/3">
            <ExpenseForm onExpenseAdded={handleRefresh} />
          </div>
          <div className="w-full lg:w-2/3">
            <ExpenseList refresh={refresh} onDelete={handleRefresh} />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6">
          <ExpenseChart refresh={refresh} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;