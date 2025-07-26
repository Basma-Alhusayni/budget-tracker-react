import React, { useState } from "react";
import "./App.css";
import IncomeWraper from "./components/IncomeWraper";
import ExpenseWraper from "./components/ExpenseWraper";
import SavingSection from "./components/SavingSection";

type Entry = {
  id: string;
  source: string;
  amount: number;
  date: string;
};

function App() {
  const [incomes, setIncomes] = useState<Entry[]>([]);
  const [expenses, setExpenses] = useState<Entry[]>([]);
  const [target, setTarget] = useState(0);
  const [saving, setSaving] = useState(0);

  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const balance = totalIncome - totalExpense - saving;

  const progress = target > 0 ? Math.min(100, (saving / target) * 100) : 0;

  const handleDeleteIncome = (id: string) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleTransfer = (amount: number) => {
    if (amount > 0) {
      setSaving((prev) => prev + amount);
    }
  };

  return (
    <div>
      <h1 className="title">Budget Tracker</h1>

      <div className="triple-container">
        <section className="incomes-section">
          <h2>Incomes</h2>
          <IncomeWraper
            incomes={incomes}
            setIncomes={setIncomes}
            onDelete={handleDeleteIncome}
          />
        </section>

        <section className="expenses-section">
          <h2>Expenses</h2>
          <ExpenseWraper
            expenses={expenses}
            setExpenses={setExpenses}
            onDelete={handleDeleteExpense}
          />
        </section>

        <section className="saving-section">
          <h2>Balance & Target</h2>
          <SavingSection
            target={target}
            setTarget={setTarget}
            saving={saving}
            balance={balance}
            progress={progress}
            onTransfer={handleTransfer}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
