import { useState } from "react";
import IncomeForm from "./IncomeForm";

type IncomeType = {
  source: string;
  amount: number;
  date: string;
};

type Props = {
  incomes: IncomeType[];
  setIncomes: React.Dispatch<React.SetStateAction<IncomeType[]>>;
};

export default function IncomeWraper({ incomes, setIncomes }: Props) {
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
    const newIncome: IncomeType = {
      source,
      amount,
      date: new Date(date).toDateString(),
    };
    setIncomes([...incomes, newIncome]);
    setSource("");
    setAmount(0);
    setDate("");
  };

  return (
    <>
      <IncomeForm
        handleAddSource={handleAddSource}
        handleAddAmount={handleAddAmount}
        handleAddDate={handleAddDate}
        handleSubmit={handleSubmit}
        source={source}
        amount={amount}
        date={date}
      />
      <ul>
        {incomes.map((income, index) => (
          <li key={index}>
            {income.source}: {income.amount}EUR on {income.date}
          </li>
        ))}
      </ul>
    </>
  );
}
