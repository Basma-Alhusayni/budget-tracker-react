import { useState } from "react";
import IncomeForm from "./IncomeForm";

type IncomeType = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

type Props = {
  incomes: IncomeType[];
  setIncomes: React.Dispatch<React.SetStateAction<IncomeType[]>>;
  onDelete: (id: string) => void;
};

export default function IncomeWraper({ incomes, setIncomes, onDelete }: Props) {
  const handleSubmit = (data: Omit<IncomeType, "id">) => {
    const newIncome: IncomeType = {
      ...data,
      id: Date.now().toString(),
      date: new Date(data.date).toDateString(),
    };
    setIncomes((prev) => [...prev, newIncome]);
  };

  return (
    <>
      <IncomeForm onSubmit={handleSubmit} />
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            {income.source}: {income.amount}EUR on {income.date}
            <button className="delete-btn" onClick={() => onDelete(income.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
