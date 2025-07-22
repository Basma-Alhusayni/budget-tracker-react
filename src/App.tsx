import React, { useState } from "react";
import "./App.css";
import IncomeWraper from "./components/IncomeWraper";
import ExpenseWraper from "./components/ExpenseWraper";

type Entry = {
  source: string;
  amount: number;
  date: string;
};

function App() {
  const [incomes, setIncomes] = useState<Entry[]>([]);
  const [expenses, setExpenses] = useState<Entry[]>([]);

  return (
    <div>
      <h1 className="title">Budget Tracker</h1>

      <div className="container">
        <section className="incomes-section">
          <h2>Incomes</h2>
          <IncomeWraper incomes={incomes} setIncomes={setIncomes} />
        </section>

        <section className="expenses-section">
          <h2>Expenses</h2>
          <ExpenseWraper expenses={expenses} setExpenses={setExpenses} />
        </section>
      </div>
    </div>
  );
}

export default App;
