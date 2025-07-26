import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

type ExpenseType = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

type Props = {
  expenses: ExpenseType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[]>>;
  onDelete: (id: string) => void;
};

export default function ExpenseWraper({
  expenses,
  setExpenses,
  onDelete,
}: Props) {
  const handleSubmit = (data: Omit<ExpenseType, "id">) => {
    const newExpense: ExpenseType = {
      ...data,
      id: Date.now().toString(),
      date: new Date(data.date).toDateString(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  return (
    <>
      <ExpenseForm onSubmit={handleSubmit} />
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.source}: {expense.amount}EUR on {expense.date}
            <button className="delete-btn" onClick={() => onDelete(expense.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
