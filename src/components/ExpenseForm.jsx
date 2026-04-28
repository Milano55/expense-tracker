import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "../supabaseClient";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Minimum 3 characters"),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(1, "Amount must be at least 1"),
  category: z.string().min(1, "Please select a category"),
  date: z.string().min(1, "Date is required"),
});

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Health",
  "Education",
  "Entertainment",
  "Other",
];

const CATEGORY_EMOJI = {
  Food: "🍔",
  Transport: "🚌",
  Shopping: "🛍️",
  Health: "💊",
  Education: "📚",
  Entertainment: "🎮",
  Other: "📦",
};

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
        onExpenseAdded();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-6">
        ➕ Add Expense
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="e.g. Lunch, Bus fare..."
            {...register("title")}
            className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition
              ${errors.title
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-blue-400"
              }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-1">
            Amount (Rs.)
          </label>
          <input
            type="number"
            placeholder="e.g. 500"
            {...register("amount", { valueAsNumber: true })}
            className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition
              ${errors.amount
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-blue-400"
              }`}
          />
          {errors.amount && (
            <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-1">
            Category
          </label>
          <select
            {...register("category")}
            className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition bg-white
              ${errors.category
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-blue-400"
              }`}
          >
            <option value="">-- Select category --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_EMOJI[cat]} {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold text-gray-500 mb-1">
            Date
          </label>
          <input
            type="date"
            {...register("date")}
            className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition
              ${errors.date
                ? "border-red-400 focus:border-red-500"
                : "border-gray-200 focus:border-blue-400"
              }`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full py-3 rounded-lg text-white font-semibold text-sm transition
            ${!isValid || isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
            }`}
        >
          {isSubmitting ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            "Add Expense"
          )}
        </button>

      </form>
    </div>
  );
}

export default ExpenseForm;