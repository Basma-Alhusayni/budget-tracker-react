import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

type ExpenseType = {
  source: string;
  amount: number;
  date: string;
};

type Props = {
  expenses: ExpenseType[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseType[]>>;
};

export default function ExpenseWraper({ expenses, setExpenses }: Props) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const handleAddSource = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
  };

  const handleAddAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleAddDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: ExpenseType = {
      source,
      amount,
      date: new Date(date).toDateString(),
    };
    setExpenses([...expenses, newExpense]);
    setSource("");
    setAmount(0);
    setDate("");
  };

  return (
    <>
      <ExpenseForm
        handleAddSource={handleAddSource}
        handleAddAmount={handleAddAmount}
        handleAddDate={handleAddDate}
        handleSubmit={handleSubmit}
        source={source}
        amount={amount}
        date={date}
      />
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.source}: {expense.amount}EUR on {expense.date}
          </li>
        ))}
      </ul>
    </>
  );
}
